// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import useOnMounted from "../../utils/useOnMounted";
import client from "../../client";

function Question() {
  const token = process.env.REACT_APP_AUTHORIZATION as string;
  // const [typeOfQuestion, setTypeOfQuestion] = useState("all");
  // const [allQuestions, setAllQuestions] = useState([]);

  const fetchAllQuestions = async () => {
    await client(token).get("/api/question/");
  };
  useOnMounted(fetchAllQuestions);

  return (
    <div>
      <p>
        <span>전체 질문 |</span> <span>선택한 질문 |</span>{" "}
        <span>미선택 질문</span>
      </p>
    </div>
  );
}

export default Question;
