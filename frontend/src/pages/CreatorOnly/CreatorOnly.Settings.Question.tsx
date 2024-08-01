import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import client from "../../client";
import QuestionItem from "./CreatorOnly.Settings.QuestionItem";

interface Question {
  questionId: number;
  nickname: string;
  contents: string;
  isPicked: boolean;
}

function Question() {
  const token = process.env.REACT_APP_AUTHORIZATION as string;
  const location = useLocation();
  const fanmeetingId = location.pathname.split("/")[2];
  const [typeOfQuestion, setTypeOfQuestion] = useState("all");
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  // 모든 질문 불러오는 api 호출
  const fetchAllQuestions = async () => {
    const params = { page: 0 };
    try {
      const response = await client(token).get(
        `/api/question/${fanmeetingId}`,
        { params },
      );
      setAllQuestions(response.data);
      setFilteredQuestions(response.data); // 초기 로드 시 모든 질문을 필터링된 질문으로 설정
      console.log("Question Response:", response.data);
    } catch (error) {
      console.log(fanmeetingId);
      console.error("Fetch All Question Error:", error);
    }
  };

  // mount 될 때 모든 질문을 불러옴
  useEffect(() => {
    fetchAllQuestions();
  }, [fanmeetingId, token]);

  // toggle 시 토글 api 호출
  const toggleQuestion = async (id: number) => {
    try {
      const response = await client(token).patch(`/api/question/${id}/toggle`);
      console.log("Toggle Question Response:", response.data);

      // 로컬 상태 업데이트
      setAllQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.questionId === id
            ? { ...question, isPicked: !question.isPicked }
            : question,
        ),
      );

      // 필터링 상태 업데이트
      setFilteredQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.questionId === id
            ? { ...question, isPicked: !question.isPicked }
            : question,
        ),
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 전체 / 선택 / 미선택 클릭시 filter 적용
  const doFilterQuestions = (type: string) => {
    const filtered = allQuestions.filter((question) => {
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
  const handleToggleQuestion = async (id: number, type: string) => {
    try {
      await toggleQuestion(id);
      doFilterQuestions(type); // 필터 적용
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 전체 / 선택 / 미선택 클릭시 동작
  const handleTypeOfQuestion = (type: string) => {
    doFilterQuestions(type);
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
          <QuestionItem
            key={question.questionId}
            question={question}
            typeOfQuestion={typeOfQuestion}
            handleToggleQuestion={handleToggleQuestion}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
