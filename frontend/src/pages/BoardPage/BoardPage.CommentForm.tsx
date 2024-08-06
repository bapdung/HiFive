import { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import client from "../../client";

interface CommentFormProps {
  // fetchComments: (reset: boolean) => void;
  handleFetchSignal: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ handleFetchSignal }) => {
  const [comment, setComment] = useState("");
  const location = useLocation();
  const token = useAuthStore((state) => state.accessToken);
  const boardId = location.pathname.split("/")[3];

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const submitComment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token || !boardId) {
      return;
    }

    try {
      await client(token).post(`/api/comment/${boardId}`, {
        contents: comment,
      });
      handleFetchSignal();
      setComment("");
    } catch (error) {
      console.error("Error sending post request:", error);
    }
  };

  return (
    <div className="flex items-center w-full mb-12 justify-between">
      <div className="bg-gray-400 min-w-[50px] h-[50px] rounded-full" />
      <form
        className="w-full ml-4 flex justify-between border-b border-solid border-1 pb-2 border-gray-500"
        onSubmit={submitComment}
      >
        <input
          className="bg-transparent text-gray-700 outline-none w-[80%]"
          type="text"
          placeholder="댓글 작성"
          onChange={handleCommentChange}
          value={comment}
        />
        <button type="submit" className="btn-light-md">
          댓글
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
