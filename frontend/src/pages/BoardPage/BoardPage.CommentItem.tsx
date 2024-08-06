import formatDate from "../../utils/formatDate";

interface Comment {
  commentId: number;
  nickname: string;
  createdDate: string;
  contents: string;
}

interface CommentItemProps {
  handleModal: (stateOfModal: boolean, commentId: number, msg: string) => void;
  comment: Comment;
  userNickName: string;
  fetchComments: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  handleModal,
  comment,
  userNickName,
  fetchComments,
}) => {
  const openModal = (commentId: number) => {
    if (handleModal) {
      console.log("오픈 모달");
      handleModal(true, commentId, "댓글");
      setTimeout(() => {
        fetchComments();
      }, 1000);
    }
  };

  return (
    <div className="my-8 flex justify-between">
      <div className="w-[90%] flex justify-between ">
        <div className="bg-gray-400 min-w-[50px] max-h-[50px] rounded-full" />
        <div className="ml-4 w-full">
          <p>
            <span className="text-gray-900 text-lg">{comment.nickname}</span>
            <span className="text-gray-400 text-sm ml-2.5">
              {formatDate(comment.createdDate)}
            </span>
          </p>
          <p className="text-md text-gray-700">{comment.contents}</p>
        </div>
      </div>
      {userNickName === comment.nickname ? (
        <button
          type="submit"
          className="btn-outline-md mt-auto mb-auto"
          onClick={() => openModal(comment.commentId)}
        >
          삭제
        </button>
      ) : null}
    </div>
  );
};

export default CommentItem;
