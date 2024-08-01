import React from "react";

interface QuestionItemProps {
  question: {
    questionId: number;
    nickname: string;
    contents: string;
    isPicked: boolean;
  };
  typeOfQuestion: string;
  handleToggleQuestion: (id: number, type: string) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  typeOfQuestion,
  handleToggleQuestion,
}) => (
  <div className="border-2 border-secondary-700 rounded-[20px] w-[30%] flex flex-col items-center min-h-48 py-[0.5rem] px-10 justify-between bg-white">
    <p className="text-large">{question.nickname}</p>
    <p className="text-large text-gray-700">{question.contents}</p>
    {question.isPicked ? (
      <button
        className="creator-btn-light-md"
        type="button"
        onClick={() =>
          handleToggleQuestion(question.questionId, typeOfQuestion)
        }
      >
        선택 취소
      </button>
    ) : (
      <button
        className="creator-btn-md"
        type="button"
        onClick={() =>
          handleToggleQuestion(question.questionId, typeOfQuestion)
        }
      >
        질문 선택
      </button>
    )}
  </div>
);

export default QuestionItem;
