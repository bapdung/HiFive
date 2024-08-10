import { useEffect, useState } from "react";
import { Session } from "openvidu-browser";
import client from "../../client";

interface Timetable {
  categoryName: string;
  sequence: number;
  detail: string;
}

interface QuestionProps {
  token: string | null;
  mySessionId: string | null;
  currentSequence: number;
  isCreator: boolean | undefined;
  timetables: Timetable[];
  session: Session | undefined;
}

interface Question {
  questionId: number;
  nickname: string;
  content: string;
  totalQuestionCount: number;
}

// eslint-disable-next-line arrow-body-style
const QuestionTime: React.FC<QuestionProps> = ({
  token,
  mySessionId,
  currentSequence,
  isCreator,
  timetables,
  session,
}) => {
  const [isQuestionTime, setIsQuestionTime] = useState(false);
  const [questionSequence, setQuestionSequence] = useState(0);
  const [lastQuestionSequence, setLastQuestionSequence] = useState<
    number | null
  >(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const questionStartApi = async () => {
      if (!token || !mySessionId) {
        return;
      }
      try {
        await client(token).post(`api/sessions/question/${mySessionId}`);
        // console.log("성공적으로 전송!! Q&A 시작!");
      } catch (error) {
        console.error(error);
      }
    };

    if (timetables[currentSequence - 1]?.categoryName === "Q&A") {
      setIsQuestionTime(true);
      questionStartApi();
    } else {
      setIsQuestionTime(false);
      setQuestionSequence(0);
      setLastQuestionSequence(null);
      setCurrentQuestion(null);
    }
  }, [token, mySessionId, currentSequence, timetables]);

  const fetchAQuestion = async (seq: number) => {
    if (!token || (lastQuestionSequence && lastQuestionSequence < seq)) {
      return;
    }
    try {
      const response = await client(token).get(
        `/api/sessions/question/${mySessionId}/${seq}`,
      );
      setCurrentQuestion(response.data);
      // console.log(response.data);
      setLastQuestionSequence(response.data.totalQuestionCount);
    } catch (error) {
      console.error(error);
    }
  };
  const nextQuestion = () => {
    const nextseq = questionSequence + 1;
    if (
      !lastQuestionSequence ||
      (lastQuestionSequence && lastQuestionSequence >= nextseq)
    ) {
      setQuestionSequence(nextseq);
      fetchAQuestion(nextseq);

      if (isCreator && session) {
        session.signal({
          type: "nextQuestion",
          data: JSON.stringify({ questionSequence: nextseq }),
        });
      }
    }
  };

  const prevQuestion = () => {
    if (questionSequence > 1) {
      const prevseq = questionSequence - 1;
      setQuestionSequence(prevseq);
      fetchAQuestion(prevseq);

      if (isCreator && session) {
        session.signal({
          type: "prevQuestion",
          data: JSON.stringify({ questionSequence: prevseq }),
        });
      }
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (session) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleQuestionSignal = (event: any) => {
        if (event.data) {
          const data = JSON.parse(event.data);
          setQuestionSequence(data.questionSequence);
          fetchAQuestion(data.questionSequence);
        }
      };

      session.on("signal:nextQuestion", handleQuestionSignal);
      session.on("signal:prevQuestion", handleQuestionSignal);

      // 클린업 함수 반환
      return () => {
        session.off("signal:nextQuestion", handleQuestionSignal);
        session.off("signal:prevQuestion", handleQuestionSignal);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return isQuestionTime ? (
    <div>
      <p>Q&A 시간입니다.</p>
      {isCreator && (
        <div>
          <button type="button" onClick={prevQuestion}>
            이전 질문
          </button>
          <button type="button" onClick={nextQuestion}>
            다음 질문
          </button>
        </div>
      )}
      {currentQuestion && (
        <div>
          <p>{questionSequence}번째 질문</p>
          <p>작성자 : {currentQuestion.nickname}</p>
          <p>{currentQuestion.content}</p>
        </div>
      )}
    </div>
  ) : null;
};

export default QuestionTime;
