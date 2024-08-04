import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

type RouteParams = {
  fanmeetingId: string;
};

type QuestionData = {
  questionId: number;
  contents: string;
};

function Question() {
  const { fanmeetingId } = useParams<RouteParams>();
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [newQuestions, setNewQuestions] = useState<string[]>(Array(6).fill(""));

  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const apiClient = client(accessToken || "");
        const response = await apiClient.get(
          `/api/question/my/${fanmeetingId}`,
        );
        setQuestions(response.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, [fanmeetingId, accessToken]);

  const handleInputChange = (index: number, value: string) => {
    const updatedQuestions = [...newQuestions];
    updatedQuestions[index] = value;
    setNewQuestions(updatedQuestions);
  };

  const handleSubmit = async (index: number) => {
    const contents = newQuestions[index];
    if (!contents) {
      console.error("질문 내용을 입력해주세요.");
      return;
    }
    try {
      const apiClient = client(accessToken || "");
      const response = await apiClient.post(`/api/question/${fanmeetingId}`, {
        contents,
      });
      console.log("Question submitted successfully:", response.data);

      // 서버에서 반환된 데이터를 사용하여 상태 업데이트
      setQuestions((prevQuestions) => [...prevQuestions, response.data]);
      setNewQuestions((prevNewQuestions) => {
        const updatedQuestions = [...prevNewQuestions];
        updatedQuestions[index] = "";
        console.log("New Questions after update:", updatedQuestions);
        return updatedQuestions;
      });
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleDelete = async (questionId: number) => {
    try {
      const apiClient = client(accessToken || "");
      await apiClient.delete(`/api/question/${questionId}`);
      console.log("질문 삭제 완료!");
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.questionId !== questionId),
      );
    } catch (error) {
      console.error("삭제 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div className="w-[100vw] flex flex-col items-center">
      <div className="bg-white w-full flex flex-col items-center py-8 mb-5">
        <h1 className="text-primary-text text-h2 mb-5">질문 작성</h1>
        <div className="bg-gray-100 px-8 py-4 rounded-lg text-center">
          <p className="text-gray-700">
            <span className="text-primary-text">개복어</span> 에게 궁금한 내용을
            남겨주세요!
          </p>
          <p className="text-gray-700">
            질문하신 내용은
            <span className="text-primary-text">어쩌면 해피엔딩</span>{" "}
            팬미팅에서 직접 답해줍니다 :)
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-[80%] justify-items-center pb-5 ">
        {questions.map((question) => (
          <div
            key={question.questionId} // 서버에서 받아온 고유한 questionId 사용
            className="border border-primary-700 rounded-[20px] w-[25rem] bg-white py-5 px-8 flex flex-col items-center"
          >
            <p className="text-large mb-4 min-h-32">{question.contents}</p>
            <div className="flex gap-2">
              <button type="button" className="btn-light-md mt-auto">
                수정
              </button>
              <button
                type="button"
                className="btn-light-md mt-auto"
                onClick={() => handleDelete(question.questionId)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}

        {Array.from({ length: 6 - questions.length }).map((_, index) => (
          <div
            key={`empty-${index}`} // 빈 폼에 고유한 키를 부여
            className="border border-primary-700 rounded-[20px] w-[25rem] bg-white py-5 px-8 flex flex-col items-center"
          >
            <textarea
              className="focus:outline-none resize-none w-full min-h-32 text-body-large"
              value={newQuestions[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <button
              type="button"
              className="btn-md mt-auto"
              onClick={() => handleSubmit(index)}
            >
              작성
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
