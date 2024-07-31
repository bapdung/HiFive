import { useState } from "react";
import { useLocation } from "react-router-dom";
import useOnMounted from "../../utils/useOnMounted";
import client from "../../client";

function Question() {
  const token = process.env.REACT_APP_AUTHORIZATION as string;
  const location = useLocation();
  const fanmeetingId = location.pathname.split("/")[1];
  const [typeOfQuestion, setTypeOfQuestion] = useState("all");
  const [allQuestions, setAllQuestions] = useState([{}]);

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
  useOnMounted(fetchAllQuestions);

  const handleTypeOfQuestion = (type: string) => {
    setTypeOfQuestion(type);
  };
  return (
    <div>
      <p>
        <button type="button" onClick={() => handleTypeOfQuestion("all")}>
          전체 질문 |
        </button>{" "}
        <button type="button" onClick={() => handleTypeOfQuestion("selected")}>
          선택한 질문 |
        </button>{" "}
        <button
          type="button"
          onClick={() => handleTypeOfQuestion("unselected")}
        >
          미선택 질문
        </button>
      </p>
      <p>{typeOfQuestion}</p>
    </div>
  );
}

export default Question;
