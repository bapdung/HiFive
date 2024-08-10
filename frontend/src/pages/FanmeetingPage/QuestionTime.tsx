import { useEffect, useState } from "react";
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
        console.log("성공적으로 전송!! Q&A 시작!");
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
      console.log(response.data);
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
    }
  };

  const prevQuestion = () => {
    if (questionSequence > 1) {
      const prevseq = questionSequence - 1;
      setQuestionSequence(prevseq);
      fetchAQuestion(prevseq);
    }
  };

  return isQuestionTime ? (
    <div>
      <p>Q&A 시간입니다.</p>
      {isCreator && (
        <div>
          <button type="button" onClick={prevQuestion}>
            이전 사연
          </button>
          <button type="button" onClick={nextQuestion}>
            다음 사연
          </button>
        </div>
      )}
      {currentQuestion && (
        <div>
          <p>{questionSequence}번째 사연</p>
          <p>작성자 : {currentQuestion.nickname}</p>
          <p>{currentQuestion.content}</p>
        </div>
      )}
    </div>
  ) : null;
};

export default QuestionTime;
