import React from "react";
import CommentItem from "./BoardPage.CommentItem";
import CommentForm from "./BoardPage.CommentForm";

interface CommentListProps {
  handleModal: (stateOfModal: boolean, msg?: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ handleModal }) => (
  <div className="my-12 px-10">
    <p className="text-h5 my-6">댓글</p>
    <CommentForm />
    <CommentItem handleModal={handleModal} />
    <CommentItem handleModal={handleModal} />
    <CommentItem handleModal={handleModal} />
    <CommentItem handleModal={handleModal} />
  </div>
);

export default CommentList;
