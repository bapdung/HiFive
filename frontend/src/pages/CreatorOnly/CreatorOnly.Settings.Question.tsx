import { useState } from "react";
import { useLocation } from "react-router-dom";
import useOnMounted from "../../utils/useOnMounted";
import client from "../../client";

interface QuestionItem {
  questionId: number;
  nickname: string;
  contents: string;
  isPicked: boolean;
}

function Question() {
  const token = process.env.REACT_APP_AUTHORIZATION as string;
  const location = useLocation();
  const fanmeetingId = location.pathname.split("/")[1];
  const [typeOfQuestion, setTypeOfQuestion] = useState("all");
  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>([]);

  const tempQuestion = [
    { questionId: 1, nickname: "민채", contents: "내용1", isPicked: false },
    { questionId: 2, nickname: "민채", contents: "내용2", isPicked: false },
    { questionId: 3, nickname: "민채", contents: "내용3", isPicked: false },
    { questionId: 4, nickname: "민채", contents: "내용4", isPicked: false },
    { questionId: 5, nickname: "민채", contents: "내용5", isPicked: false },
    { questionId: 6, nickname: "민채", contents: "내용6", isPicked: false },
    { questionId: 7, nickname: "민채", contents: "내용7", isPicked: false },
  ];
  const fetchAllQuestions = async () => {
    const params = {
      sort: "desc",
      page: 0,
    };
    try {
      const response = await client(token).get(
        `/api/question/${fanmeetingId}`,
        {
          params,
        },
      );
      setAllQuestions(response.data);
      console.log(allQuestions);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useOnMounted(() => fetchAllQuestions);

  const handleTypeOfQuestion = (type: string) => {
    setTypeOfQuestion(type);
  };

  const toggleQuestion = async (questionId: number) => {
    try {
      const response = await client(token).patch(
        `/api/question/${questionId}/toggle`,
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <p className="text-h4 w-1/3 flex justify-around my-10">
        <button
          type="button"
          onClick={() => handleTypeOfQuestion("all")}
          className={
            typeOfQuestion === "all" ? "text-gray-900" : "text-gray-500"
          }
        >
          전체 질문
        </button>{" "}
        <span>|</span>
        <button
          type="button"
          onClick={() => handleTypeOfQuestion("selected")}
          className={
            typeOfQuestion === "selected" ? "text-gray-900" : "text-gray-500"
          }
        >
          선택한 질문
        </button>{" "}
        <span>|</span>
        <button
          type="button"
          onClick={() => handleTypeOfQuestion("unselected")}
          className={
            typeOfQuestion === "unselected" ? "text-gray-900" : "text-gray-500"
          }
        >
          미선택 질문
        </button>
      </p>
      <div className="w-3/4 flex flex-wrap justify-center gap-6">
        {tempQuestion.map((question) => (
          <div
            key={question.questionId}
            className="border-2 border-secondary-700 rounded-[20px] w-[30%] flex flex-col items-center min-h-48 py-[0.5rem] px-10 justify-between bg-white"
          >
            <p className="text-large">{question.nickname}</p>
            <p className="text-large text-gray-700">{question.contents}</p>
            {question.isPicked ? (
              <button
                className="creator-btn-light-md"
                type="button"
                onClick={() => toggleQuestion(question.questionId)}
              >
                선택 취소
              </button>
            ) : (
              <button
                className="creator-btn-md"
                type="button"
                onClick={() => toggleQuestion(question.questionId)}
              >
                질문 선택
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
