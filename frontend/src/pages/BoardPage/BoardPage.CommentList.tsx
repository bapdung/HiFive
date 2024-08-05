import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import client from "../../client";

import CommentItem from "./BoardPage.CommentItem";
import CommentForm from "./BoardPage.CommentForm";

interface Comment {
  commentId: number;
  nickname: string;
  createdDate: string;
  contents: string;
}
interface CommentListProps {
  handleModal: (stateOfModal: boolean, commentId: number, msg: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ handleModal }) => {
  const location = useLocation();
  const boardId = parseInt(location.pathname.split("/")[3], 10);
  const token = useAuthStore((state) => state.accessToken);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userNickName, setUserNickName] = useState("");

  const fetchComments = async () => {
    if (!token) {
      return;
    }
    try {
      const res = await client(token).get(`/api/comment/${boardId}`);
      setComments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await client(token).get(`/api/member`);
      setUserNickName(response.data.nickname);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, token]);

  return (
    <div className="my-12 px-10">
      <p className="text-h5 my-6">댓글</p>
      <CommentForm fetchComments={fetchComments} />
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          handleModal={handleModal}
          comment={comment}
          userNickName={userNickName}
          fetchComments={fetchComments}
        />
      ))}
    </div>
  );
};

export default CommentList;
