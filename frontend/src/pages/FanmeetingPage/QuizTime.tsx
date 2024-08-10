import { useState, useEffect } from "react";
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
  isCreator: boolean | undefined;
  timetables: Timetable[];
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
}) => {
  const [isQuizTime, setIsQuizTime] = useState(false);
  const [quizSequence, setQuizSequence] = useState(0);
  const [lastQuizSequence, setLastQuizSequence] = useState<number | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const quizStartApi = async () => {
      if (!token || !mySessionId) {
        return;
      }
      try {
        await client(token).post(`api/sessions/quiz/${mySessionId}`);
        console.log("성공적으로 전송!! Q&A 시작!");
      } catch (error) {
        console.error(error);
      }
    };

    if (timetables[currentSequence - 1]?.categoryName === "Q&A") {
      setIsQuizTime(true);
      quizStartApi();
    } else {
      setIsQuizTime(false);
      setQuizSequence(0);
      setLastQuizSequence(null);
      setCurrentQuiz(null);
    }
  }, [token, mySessionId, currentSequence, timetables]);

  const fetchAQuiz = async (seq: number) => {
    if (!token || (lastQuizSequence && lastQuizSequence < seq)) {
      return;
    }
    try {
      const response = await client(token).get(
        `/api/sessions/quiz/${mySessionId}/${seq}`,
      );
      setCurrentQuiz(response.data);
      console.log(response.data);
      setLastQuizSequence(response.data.totalQuizCount);
    } catch (error) {
      console.error(error);
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
    }
  };

  return isQuizTime ? (
    <div>
      <p>Q&A 시간입니다.</p>
      {isCreator && (
        <div>
          <button type="button" onClick={nextQuestion}>
            다음 사연
          </button>
        </div>
      )}
      {currentQuiz && (
        <div>
          <p>{quizSequence}번째 문제</p>
          <p>문제 : {currentQuiz.problem}</p>
        </div>
      )}
    </div>
  ) : null;
};

export default QuizTime;
