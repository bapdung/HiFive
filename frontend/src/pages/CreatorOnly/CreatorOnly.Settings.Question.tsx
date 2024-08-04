import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import client from "../../client";
import QuestionItem from "./CreatorOnly.Settings.QuestionItem";
import useAuthStore from "../../store/useAuthStore";

interface Question {
  questionId: number;
  nickname: string;
  contents: string;
  picked: boolean;
}

function Question() {
  const token = useAuthStore((state) => state.accessToken);
  const location = useLocation();
  const fanmeetingId = location.pathname.split("/")[2];
  const [typeOfQuestion, setTypeOfQuestion] = useState("all");
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  // 전체 / 선택 / 미선택 클릭시 filter 적용
  const doFilterQuestions = useCallback(
    (type: string, questions = allQuestions) => {
      const filtered = questions.filter((question) => {
        if (type === "selected") {
          return question.picked;
        }
        if (type === "unselected") {
          return !question.picked;
        }
        return true;
      });
      setFilteredQuestions(filtered);
    },
    [allQuestions],
  );

  // mount 될 때 모든 질문을 불러옴
  useEffect(() => {
    const fetchAllQuestions = async () => {
      const params = { page: 0 };
      try {
        if (token) {
          const response = await client(token).get(
            `/api/question/${fanmeetingId}`,
            { params },
          );
          setAllQuestions(response.data);
          doFilterQuestions(typeOfQuestion, response.data); // 초기 로드 시 필터링된 질문 목록 설정
          // console.log("Question Response:", response.data);
        }
      } catch (error) {
        // console.log(fanmeetingId);
        console.error("Fetch All Question Error:", error);
      }
    };
    fetchAllQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fanmeetingId, token, typeOfQuestion]);

  // toggle 시 토글 api 호출
  const toggleQuestion = async (id: number) => {
    try {
      if (token) {
        await client(token).patch(`/api/question/${id}/toggle`);
        setAllQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.questionId === id
              ? { ...question, picked: !question.picked }
              : question,
          ),
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 질문 토글
  const handleToggleQuestion = async (id: number) => {
    try {
      await toggleQuestion(id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 전체 / 선택 / 미선택 클릭시 동작
  const handleTypeOfQuestion = (type: string) => {
    setTypeOfQuestion(type);
    doFilterQuestions(type);
  };

  // 상태 업데이트 후 필터링 적용
  useEffect(() => {
    doFilterQuestions(typeOfQuestion);
  }, [allQuestions, typeOfQuestion, doFilterQuestions]);
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
