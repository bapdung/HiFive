import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

interface QuizProps {
  handleQuizOpen: () => void;
  handleQuizSequence: (sequence: number) => void;
  fetchSignal: boolean;
}

interface Quiz {
  id: number;
  sequence: number;
  detail: string;
  problem: string;
  answer: boolean;
}

const Quiz: React.FC<QuizProps> = ({
  handleQuizOpen,
  handleQuizSequence,
  fetchSignal,
}) => {
  const location = useLocation();
  const token = useAuthStore((state) => state.accessToken);
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
  const fanmeetingId = parseInt(location.pathname.split("/")[2], 10);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuizTitle, setCurrentQuizTitle] = useState("");
  const [currentQuizDetail, setCurrentQuizDetail] = useState("");
  const [currentQuizAnswer, setCurrentQuizAnswer] = useState<boolean | null>(
    null,
  );

  const fetchAllQuizzes = async () => {
    if (!token) {
      return;
    }
    const response = await client(token).get(`api/quiz/${fanmeetingId}`);
    // console.log(response.data);
    setAllQuizzes(response.data);
    handleQuizSequence(allQuizzes.length - 1);
  };

  useEffect(() => {
    fetchAllQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, fanmeetingId, allQuizzes.length, fetchSignal]);

  const openInput = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setIsEditing(true);
    setCurrentQuizAnswer(quiz.answer);
    setCurrentQuizTitle(quiz.problem);
    setCurrentQuizDetail(quiz.detail);
  };

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuizTitle(event.target.value);
  };

  const handleInputDetail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuizDetail(event.target.value);
  };

  const updateQuiz = async (buttonOfQuiz: Quiz) => {
    if (!isEditing || buttonOfQuiz !== currentQuiz) {
      setIsEditing(true);
      setCurrentQuiz(buttonOfQuiz);
      return;
    }
    if (!token || !currentQuiz || currentQuiz !== buttonOfQuiz) {
      return;
    }
    const payload = {
      problem: currentQuizTitle,
      detail: currentQuizDetail,
      sequence: buttonOfQuiz.sequence,
      answer: currentQuizAnswer,
    };
    await client(token).put(`/api/quiz/${currentQuiz.id}`, payload);
    setIsEditing(false);
    fetchAllQuizzes();
  };

  const deleteQuiz = async (quiz: Quiz) => {
    console.log(quiz.id);
    if (!token) {
      return;
    }
    await client(token).delete(`/api/quiz/${quiz.id}`);
    fetchAllQuizzes();
  };

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
            {!isEditing || currentQuiz !== quiz ? (
              <button
                type="button"
                className="text-h5 flex justify-between w-full"
                onClick={() => openInput(quiz)}
              >
                <span>문제 {index + 1}</span>{" "}
                <span
                  className={
                    quiz.answer ? "text-secondary" : "text-primary-text"
                  }
                >
                  정답 {quiz.answer ? "O" : "X"}
                </span>
              </button>
            ) : null}
            {isEditing && currentQuiz === quiz ? (
              <div>
                <button
                  type="button"
                  className={
                    currentQuizAnswer
                      ? "creator-btn-md"
                      : "creator-btn-light-md"
                  }
                  onClick={() => setCurrentQuizAnswer(true)}
                >
                  O
                </button>
                <button
                  type="button"
                  className={
                    currentQuizAnswer === false
                      ? "btn-md ml-2"
                      : "btn-light-md ml-2"
                  }
                  onClick={() => setCurrentQuizAnswer(false)}
                >
                  X
                </button>
              </div>
            ) : null}
            {currentQuiz !== quiz || !isEditing ? (
              <button
                type="button"
                className="text-large w-full"
                onClick={() => openInput(quiz)}
              >
                <span className="text-gray-700 w-full block mb-2.5">
                  {quiz.problem}
                </span>
                <span className="text-gray-500 w-full block mb-2.5">
                  {quiz.detail}
                </span>
              </button>
            ) : null}

            {currentQuiz === quiz && isEditing ? (
              <div>
                <input
                  type="text"
                  className="focus:outline-none text-large text-gray-700 text-center mb-2.5 w-full"
                  value={currentQuizTitle}
                  onChange={handleInputTitle}
                />
                <input
                  type="text"
                  className="focus:outline-none text-large text-gray-500 text-center mb-2.5 w-full"
                  value={currentQuizDetail}
                  onChange={handleInputDetail}
                />
              </div>
            ) : null}

            <div>
              <button
                type="button"
                className="creator-btn-light-md"
                onClick={() => updateQuiz(quiz)}
              >
                수정하기
              </button>
              <button
                type="button"
                className="btn-light-md ml-2"
                onClick={() => deleteQuiz(quiz)}
              >
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
