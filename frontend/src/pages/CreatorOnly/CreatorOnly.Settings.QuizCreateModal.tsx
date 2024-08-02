import propTypes from "prop-types";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

interface QuizCreateModalProps {
  handleQuizClose: React.MouseEventHandler<HTMLButtonElement>;
}

const QuizCreateModal: React.FC<QuizCreateModalProps> = ({
  handleQuizClose,
}) => {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState<boolean | null>(null);
  const location = useLocation();
  const fanmeetingId = location.pathname.split("/")[2];

  const handleInputQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 30) {
      setQuestion(event.target.value);
    }
  };

  const handleInputDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const validateSubmit = () => {
    if (question === "" || description === "" || answer === null) {
      alert("질문과 설명을 모두 입력하세요.");
      return false;
    }
    return true;
  };

  const sequence = 1;
  const token = useAuthStore((state) => state.accessToken);

  const handleQuizSubmit = async () => {
    if (validateSubmit()) {
      try {
        if (!token) {
          return;
        }
        const payload = {
          problem: question,
          answer,
          detail: description,
          sequence,
        };
        console.log(payload);
        await client(token).post(`/api/quiz/${fanmeetingId}`, payload);
        console.log("success : 퀴즈 생성 성공");
      } catch (error) {
        console.error("Error sending post request:", error);
      }
    }
  };

  const handleInputAnswer = (input: boolean) => {
    setAnswer(input);
  };

  return (
    <div className="w-full h-full absolute flex items-center justify-center">
      <div className="w-full h-full bg-black absolute opacity-70" />
      <div className="bg-white w-[50rem] h-[22rem] z-10 rounded-3xl flex flex-col items-center justify-between absolute top-1/4 p-12">
        <div className="flex justify-between w-full">
          <div className="w-2/3">
            <p className="text-h6 mb-[0.6rem]">질문</p>
            <input
              type="text"
              className="border-2 border-gray-300 focus:outline-none border-3xl w-full px-2 py-2 rounded-3xl text-center"
              placeholder="O/X 퀴즈 문제를 입력해주세요. (최대 30글자)"
              value={question}
              onChange={handleInputQuestion}
            />
          </div>
          <div>
            <p className="text-h6 mb-[0.6rem]">정답</p>
            <div>
              <button
                type="button"
                className={answer ? "creator-btn-md" : "creator-btn-light-md"}
                onClick={() => handleInputAnswer(true)}
              >
                O
              </button>
              <button
                type="button"
                className={answer ? "btn-light-md ml-2" : "btn-md ml-2"}
                onClick={() => handleInputAnswer(false)}
              >
                X
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <p className="text-h6 mb-[0.6rem]">설명</p>
          <input
            type="text"
            className="border-2 border-gray-300 focus:outline-none border-3xl w-4/5 px-2 py-2 rounded-3xl text-center"
            placeholder="정답에 대한 간단한 설명을 입력해주세요. 설명은 최대 50글자 입니다."
            value={description}
            onChange={handleInputDescription}
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            className="creator-btn-light-md w-1/4"
            type="button"
            onClick={handleQuizClose}
          >
            돌아가기
          </button>
          <button
            className="creator-btn-md w-1/4 ml-10"
            type="button"
            onClick={handleQuizSubmit}
          >
            문제 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

QuizCreateModal.propTypes = {
  handleQuizClose: propTypes.func.isRequired,
};
export default QuizCreateModal;
