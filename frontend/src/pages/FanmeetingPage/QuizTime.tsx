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

interface QuizTimeProps {
  token: string | null;
  mySessionId: string | null;
  currentSequence: number;
  timetables: Timetable[];
  isCreator: boolean | undefined;
  session: Session | undefined; // 세션을 props로 전달받습니다.
}

interface Quiz {
  problem: string;
  answer: boolean;
  totalQuizCount: number;
  detail: string;
}

const QuizTime: React.FC<QuizTimeProps> = ({
  token,
  mySessionId,
  currentSequence,
  isCreator,
  timetables,
  session,
}) => {
  const [isQuizTime, setIsQuizTime] = useState(false);
  const [quizSequence, setQuizSequence] = useState(0);
  const [lastQuizSequence, setLastQuizSequence] = useState<number | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [showAnswerButtons, setShowAnswerButtons] = useState<boolean>(false);
  const [showAnswerRevealButton, setShowAnswerRevealButton] =
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
    }
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
      }
    }
  };

  const revealAnswer = () => {
    if (isCreator && session && currentQuiz) {
      session.signal({
        type: "revealAnswer",
        data: JSON.stringify({ correctAnswer: currentQuiz.answer }),
      });
      setShowAnswerRevealButton(false);
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
          const { correctAnswer } = data;
          if (userAnswer !== null) {
            const result =
              userAnswer === correctAnswer ? "맞았습니다!" : "틀렸습니다.";
            alert(result);
          }
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

      session.on("signal:startTimer", handleStartTimerSignal);
      session.on("signal:revealAnswer", handleRevealAnswerSignal);
      session.on("signal:nextQuiz", handleNextQuizSignal);
      session.on("signal:resetAnswer", handleResetAnswerSignal);

      return () => {
        session.off("signal:startTimer", handleStartTimerSignal);
        session.off("signal:revealAnswer", handleRevealAnswerSignal);
        session.off("signal:nextQuiz", handleNextQuizSignal);
        session.off("signal:resetAnswer", handleResetAnswerSignal);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, userAnswer]); // userAnswer가 변경될 때만 실행되도록 의존성 배열 설정

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
    }
  };

  return isQuizTime ? (
    <div>
      <p>O/X 퀴즈 시간입니다</p>
      {isCreator && (
        <div>
          <button type="button" onClick={nextQuestion}>
            다음 문제
          </button>
          {showAnswerRevealButton && (
            <button type="button" onClick={revealAnswer}>
              정답 공개
            </button>
          )}
        </div>
      )}
      {currentQuiz && (
        <div>
          <p>{quizSequence}번째 문제</p>
          {quizSequence === lastQuizSequence && <p>마지막 문제입니다!</p>}
          <p>문제 : {currentQuiz.problem}</p>
          {timer !== null && <p>남은 시간: {timer}초</p>}
          {showAnswerButtons && (
            <div>
              <button type="button" onClick={() => handleAnswer(true)}>
                O
              </button>
              <button type="button" onClick={() => handleAnswer(false)}>
                X
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  ) : null;
};

export default QuizTime;
