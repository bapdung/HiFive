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
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionItem[]>(
    [],
  );

  const tempQuestion = [
    { questionId: 1, nickname: "민채", contents: "내용1", isPicked: false },
    { questionId: 2, nickname: "민채", contents: "내용2", isPicked: true },
    { questionId: 3, nickname: "민채", contents: "내용3", isPicked: false },
    { questionId: 4, nickname: "민채", contents: "내용4", isPicked: true },
    { questionId: 5, nickname: "민채", contents: "내용5", isPicked: false },
    { questionId: 6, nickname: "민채", contents: "내용6", isPicked: false },
    { questionId: 7, nickname: "민채", contents: "내용7", isPicked: false },
  ];

  // 모든 질문 불러오는 api 호출
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
      console.log(allQuestions, "모든 질문들");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Fetch All Question Error:", error);
    }
  };

  // mount 될 때 모든 질문을 불러옴
  useOnMounted(() => fetchAllQuestions);

  // toggle 시 토글 api 호출
  const toggleQuestion = async (id: number) => {
    // 임시 테스트 코드
    const questionIndex = tempQuestion.findIndex((q) => q.questionId === id);
    console.log(questionIndex, "찾은 id", id);
    if (questionIndex !== -1) {
      tempQuestion[questionIndex].isPicked =
        !tempQuestion[questionIndex].isPicked;
      console.log("Updated Question:", allQuestions[questionIndex]);
    } else {
      console.error("Question not found");
    }
    try {
      const response = await client(token).patch(`/api/question/${id}/toggle`);
      console.log("Toggle Question Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 전체 / 선택 / 미선택 클릭시 filter 적용
  const filterQuestions = (type: string) => {
    const filtered = tempQuestion.filter((question) => {
      if (type === "selected") {
        return question.isPicked;
      }
      if (type === "unselected") {
        return !question.isPicked;
      }
      return true;
    });
    setFilteredQuestions(filtered);
  };

  // 질문 토글
  const handleToggleQuestion = (id: number, type: string) => {
    toggleQuestion(id);
    console.log(id);
    filterQuestions(type);
  };

  // 전체 / 선택 / 미선택 클릭시 동작
  const handleTypeOfQuestion = (type: string) => {
    filterQuestions(type);
    setTypeOfQuestion(type);
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
        {filteredQuestions.map((question) => (
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
        ))}
      </div>
    </div>
  );
}

export default Question;
