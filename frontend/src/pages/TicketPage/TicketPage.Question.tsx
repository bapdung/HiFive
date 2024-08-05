import { useEffect, useState, useCallback } from "react";
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

const formNames = ["bang", "hana", "dul", "set", "net", "dasut"];

function Question() {
  const { fanmeetingId } = useParams<RouteParams>();
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [newQuestions, setNewQuestions] = useState<string[]>(Array(6).fill(""));
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const accessToken = useAuthStore((state) => state.accessToken);

  const fetchQuestions = useCallback(async () => {
    try {
      const apiClient = client(accessToken || "");
      const response = await apiClient.get(`/api/question/my/${fanmeetingId}`);
      setQuestions(response.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  }, [accessToken, fanmeetingId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleInputChange = (index: number, value: string) => {
    const updatedQuestions = [...newQuestions];
    updatedQuestions[index] = value;
    setNewQuestions(updatedQuestions);
  };

  const handleEditChange = (value: string) => {
    setEditContent(value);
  };

  const handleSubmit = async (index: number) => {
    const contents = newQuestions[index];
    if (!contents) {
      console.error("질문 내용을 입력해주세요.");
      return;
    }
    try {
      const apiClient = client(accessToken || "");
      await apiClient.post(`/api/question/${fanmeetingId}`, {
        contents,
      });

      setNewQuestions((prevNewQuestions) => {
        const updatedQuestions = [...prevNewQuestions];
        updatedQuestions[index] = "";
        return updatedQuestions;
      });

      await fetchQuestions();
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleEditSubmit = async (questionId: number) => {
    if (!editContent) {
      console.error("질문 내용을 입력해주세요.");
      return;
    }
    try {
      const apiClient = client(accessToken || "");
      await apiClient.patch(`/api/question/${questionId}`, {
        contents: editContent,
      });

      setEditIndex(null);
      setEditContent("");

      await fetchQuestions();
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleDelete = async (questionId: number) => {
    try {
      const apiClient = client(accessToken || "");
      await apiClient.delete(`/api/question/${questionId}`);
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
            크리에이터에게 궁금한 내용을 남겨주세요! (최대 6개)
          </p>
          <p className="text-gray-700">
            질문하신 내용은 크리에이터가 팬미팅에서 직접 답해줍니다.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-[80%] justify-items-center pb-5">
        {questions.map((question, index) => (
          <div
            key={question.questionId}
            className="border border-primary-700 rounded-[20px] w-[25rem] bg-white py-5 px-8 flex flex-col items-center"
          >
            {editIndex === index ? (
              <textarea
                className="focus:outline-none resize-none w-full min-h-32 text-body-large"
                value={editContent}
                onChange={(e) => handleEditChange(e.target.value)}
              />
            ) : (
              <p className="text-large mb-4 min-h-32">{question.contents}</p>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                className="btn-light-md mt-auto"
                onClick={() => {
                  if (editIndex === index) {
                    handleEditSubmit(question.questionId);
                  } else {
                    setEditIndex(index);
                    setEditContent(question.contents);
                  }
                }}
              >
                {editIndex === index ? "완료" : "수정"}
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
            key={formNames[index]} // 고유한 이름을 키로 사용
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
