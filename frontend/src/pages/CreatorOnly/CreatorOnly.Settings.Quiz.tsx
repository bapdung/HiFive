import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

interface QuizProps {
  handleQuizOpen: () => void;
  handleQuizSequence: (sequence: number) => void;
}

interface Quiz {
  id: number;
  sequence: number;
  detail: string;
  problem: string;
  answer: boolean;
}

const Quiz: React.FC<QuizProps> = ({ handleQuizOpen, handleQuizSequence }) => {
  const location = useLocation();
  const token = useAuthStore((state) => state.accessToken);
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
  const fanmeetingId = parseInt(location.pathname.split("/")[2], 10);
  // console.log(fanmeetingId);
  useEffect(() => {
    const fetchAllQuizzes = async () => {
      if (!token) {
        return;
      }
      const response = await client(token).get(`api/quiz/${fanmeetingId}`);
      // console.log(response.data);
      setAllQuizzes(response.data);
      handleQuizSequence(allQuizzes.length - 1);
    };

    fetchAllQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, fanmeetingId, allQuizzes.length]);

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className="my-8 w-1/4 creator-btn-md"
        onClick={handleQuizOpen}
      >
        퀴즈 생성하기
      </button>
      <div className="w-3/4 flex flex-wrap justify-center gap-6">
        {allQuizzes.map((quiz, index) => (
          <div
            key={quiz.id}
            className="border-2 border-secondary-700 rounded-[20px] w-[30%] flex flex-col items-center min-h-48 py-[1rem] px-8 justify-between bg-white"
          >
            <p className="text-h5 flex justify-between w-full">
              <span>문제 {index + 1}</span>{" "}
              <span
                className={quiz.answer ? "text-secondary" : "text-primary-text"}
              >
                정답 {quiz.answer ? "O" : "X"}
              </span>
            </p>
            <p className="text-large text-gray-700">{quiz.problem}</p>
            <p className="text-large text-gray-500">{quiz.detail}</p>
            <div>
              <button type="button" className="creator-btn-light-md">
                수정하기
              </button>
              <button type="button" className="btn-light-md ml-2">
                삭제하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Quiz.propTypes = {
  handleQuizOpen: propTypes.func.isRequired,
};

export default Quiz;
