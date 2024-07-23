import CommentItem from "./BoardPage.CommentItem";
import CommentForm from "./BoardPage.CommentForm";

function CommentList() {
  return (
    <div className="my-12 px-10">
      <p className="text-h5 my-6">댓글</p>
      <CommentForm />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  );
}

export default CommentList;
