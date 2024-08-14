/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Session } from "openvidu-browser";
import client from "../../client";

interface Timetable {
  categoryName: string;
  sequence: number;
  detail: string;
}

interface Quiz {
  problem: string;
  answer: boolean;
  totalQuizCount: number;
  detail: string;
}

interface Rank {
  fanId: number;
  score: number;
}

interface QuizTimeProps {
  token: string | null;
  mySessionId: string | null;
  currentSequence: number;
  timetables: Timetable[];
  isCreator: boolean | undefined;
  session: Session | undefined; // 세션을 props로 전달받습니다.
  handleFetchQuiz: (quiz: Quiz | null) => void;
  handleReveal: (bool: boolean) => void;
  handleRank: (rank: Rank[]) => void;
}

const QuizTime: React.FC<QuizTimeProps> = ({
  token,
  mySessionId,
  currentSequence,
  isCreator,
  timetables,
  session,
  handleFetchQuiz,
  handleReveal,
  handleRank,
}) => {
  const [isQuizTime, setIsQuizTime] = useState(false);
  const [quizSequence, setQuizSequence] = useState(0);
  const [lastQuizSequence, setLastQuizSequence] = useState<number | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [showAnswerButtons, setShowAnswerButtons] = useState<boolean>(false);
  const [showAnswerRevealButton, setShowAnswerRevealButton] =
    useState<boolean>(false);
  const [showRankingRevealButton, setShowRankingRevealButton] =
    useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const quizStartApi = async () => {
      if (!token || !mySessionId) {
        return;
      }
      try {
        await client(token).post(`api/sessions/quiz/${mySessionId}`);
      } catch (error) {
        console.error("Quiz start API error:", error);
      }
    };

    if (timetables[currentSequence - 1]?.categoryName === "O/X게임") {
      setIsQuizTime(true);
      quizStartApi();
    } else {
      setIsQuizTime(false);
      setQuizSequence(0);
      setLastQuizSequence(null);
      setCurrentQuiz(null);
      handleFetchQuiz(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, mySessionId, currentSequence, timetables]);

  const startTimer = () => {
    setShowAnswerButtons(true);
    setTimer(15);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer !== null && prevTimer > 0) {
          return prevTimer - 1;
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setShowAnswerButtons(false);
        if (isCreator) {
          setShowAnswerRevealButton(true);
        }
        return null;
      });
    }, 1000);
  };

  const fetchAQuiz = async (seq: number) => {
    if (!token || (lastQuizSequence && lastQuizSequence < seq)) {
      return;
    }
    try {
      const response = await client(token).get(
        `/api/sessions/quiz/${mySessionId}/${seq}`,
      );
      setCurrentQuiz(response.data);
      handleFetchQuiz(response.data);
      setLastQuizSequence(response.data.totalQuizCount);
    } catch (error) {
      console.error("Fetch quiz error:", error);
    }
  };

  const nextQuestion = () => {
    const nextseq = quizSequence + 1;
    if (
      !lastQuizSequence ||
      (lastQuizSequence && lastQuizSequence >= nextseq)
    ) {
      setQuizSequence(nextseq);
      fetchAQuiz(nextseq);
      setUserAnswer(null);
      handleReveal(false); // 로컬 상태 업데이트
      if (isCreator && session) {
        session.signal({
          type: "nextQuiz",
          data: JSON.stringify({ sequence: nextseq }),
        });
        session.signal({
          type: "startTimer",
          data: JSON.stringify({}),
        });
        session.signal({
          type: "resetAnswer",
          data: JSON.stringify({
            userId: session.connection.connectionId,
            data: JSON.stringify({}),
          }),
        });
        session.signal({
          type: "revealAnswer",
          data: JSON.stringify({ isReveal: false }),
        });
      }
    }
  };

  const revealAnswer = () => {
    if (isCreator && session && currentQuiz) {
      session.signal({
        type: "revealAnswer",
        data: JSON.stringify({
          isReveal: true,
        }),
      });
      setShowAnswerRevealButton(false);
      if (quizSequence === lastQuizSequence) {
        setShowRankingRevealButton(true);
      } else {
        setShowRankingRevealButton(false);
      }
    }
  };

  const fetchRank = async () => {
    if (session && token && mySessionId) {
      try {
        const response = await client(token).get(
          `api/sessions/quiz/result/${mySessionId}`,
        );
        console.log(response.data);
        handleRank(response.data);
      } catch (error) {
        console.error("Fetch rank error:", error);
      }
    }
  };

  const revealRanking = async () => {
    if (isCreator && session) {
      await fetchRank();
      session.signal({
        type: "revealRanking",
        data: JSON.stringify({}),
      });
      fetchRank();
    }
  };

  useEffect(() => {
    if (session) {
      const handleStartTimerSignal = (event: any) => {
        if (event.data) {
          startTimer();
        }
      };

      const handleRevealAnswerSignal = (event: any) => {
        if (event.data) {
          const data = JSON.parse(event.data);
          const { isReveal } = data;
          handleReveal(isReveal);
        }
      };

      const handleNextQuizSignal = (event: any) => {
        if (event.data) {
          const data = JSON.parse(event.data);
          setQuizSequence(data.sequence);
          fetchAQuiz(data.sequence);
        }
      };

      const handleResetAnswerSignal = () => {
        setUserAnswer(null);
      };

      const handleResetRevealSignal = (event: any) => {
        if (event.data) {
          const data = JSON.parse(event.data);
          handleReveal(data.isReveal);
        }
      };

      const handleRevealRankingSignal = (event: any) => {
        if (event.data) {
          fetchRank(); // 순위 데이터를 가져옴
        }
      };

      session.on("signal:startTimer", handleStartTimerSignal);
      session.on("signal:revealAnswer", handleRevealAnswerSignal);
      session.on("signal:nextQuiz", handleNextQuizSignal);
      session.on("signal:resetAnswer", handleResetAnswerSignal);
      session.on("signal:resetReveal", handleResetRevealSignal);
      session.on("signal:revealRanking", handleRevealRankingSignal);

      return () => {
        session.off("signal:startTimer", handleStartTimerSignal);
        session.off("signal:revealAnswer", handleRevealAnswerSignal);
        session.off("signal:nextQuiz", handleNextQuizSignal);
        session.off("signal:resetAnswer", handleResetAnswerSignal);
        session.off("signal:resetReveal", handleResetRevealSignal);
        session.off("signal:revealRanking", handleRevealRankingSignal);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const sendAnswer = async () => {
    if (!token || !mySessionId || !currentQuiz) {
      return;
    }
    try {
      const isUserCorrect = userAnswer === currentQuiz?.answer;
      const isCorrectAnswer = isUserCorrect ? 1 : 0;
      await client(token).post(
        `/api/sessions/quiz/answer/${mySessionId}/${quizSequence}`,
        { isCorrect: isCorrectAnswer },
      );
    } catch (error) {
      console.error("Send answer error:", error);
    }
  };

  const handleAnswer = (answer: boolean) => {
    setUserAnswer(answer);
    setShowAnswerButtons(false);
    if (session) {
      session.signal({
        type: "userAnswer",
        data: JSON.stringify({
          userId: session.connection.connectionId,
          answer,
        }),
      });
      sendAnswer();
    }
  };

  return isQuizTime ? (
    <div className="flex flex-col justify-center items-center my-4">
      {currentQuiz && (
        <div className="flex flex-col justify-center items-center mb-4">
          <p className="text-small font-semibold">{quizSequence}번 문제</p>
          {quizSequence === lastQuizSequence && (
            <p className="bg-vivid-gradient text-white font-bold px-3 rounded-full">
              마지막 문제입니다!
            </p>
          )}
          <p className="font-semibold m-2">{currentQuiz.problem}</p>
          {timer !== null && (
            <p className="bg-meetingroom-100 px-4 py-2 rounded-full">
              남은 시간 : {timer}초
            </p>
          )}
          {showAnswerButtons && (
            <div className="flex gap-6 mt-4">
              <button
                type="button"
                onClick={() => handleAnswer(true)}
                className="text-[64px] font-bold text-meetingroom-800 w-[80px] shadow-lg rounded-xl hover:bg-meetingroom-100"
              >
                O
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(false)}
                className="text-[64px] font-bold text-meetingroom-800 w-[80px] shadow-lg rounded-xl hover:bg-meetingroom-100"
              >
                X
              </button>
            </div>
          )}
        </div>
      )}
      {isCreator && (
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={nextQuestion}
            className="meetingroom-btn-outline-md"
          >
            {quizSequence === 0 ? "문제 시작" : "다음 문제"}
          </button>
          {showAnswerRevealButton && (
            <button
              type="button"
              onClick={revealAnswer}
              className="meetingroom-btn-outline-md"
            >
              정답 공개
            </button>
          )}
          {showRankingRevealButton && (
            <button
              type="button"
              onClick={revealRanking}
              className="meetingroom-btn-md"
            >
              순위 공개
            </button>
          )}
        </div>
      )}
    </div>
  ) : null;
};

export default QuizTime;
