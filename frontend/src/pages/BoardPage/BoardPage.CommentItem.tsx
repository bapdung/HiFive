import React from "react";

interface CommentItemProps {
  handleModal?: (stateOfModal: boolean, msg: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ handleModal }) => {
  const openModal = () => {
    if (handleModal) {
      handleModal(true, "댓글");
    }
  };

  return (
    <div className="my-8 flex justify-between">
      <div className="w-[90%] flex justify-between ">
        <div className="bg-gray-400 min-w-[50px] max-h-[50px] rounded-full" />
        <div className="ml-4 w-full">
          <p>
            <span className="text-gray-900 text-lg">닉네임</span>
            <span className="text-gray-400 text-sm ml-2.5">
              2024. 07. 15 18:20
            </span>
          </p>
          <p className="text-md text-gray-700">
            커뮤니티에서 다른 사람들과 함께 의견을 나누는 게 정말 재밌어요!
            커뮤니티에서 다른 사람들과 함께 의견을 나누는 게 정말 재밌어요!
            커뮤니티에서 다른 사람들과 함께 의견을 나누는 게 정말 재밌어요!
            커뮤니티에서 다른 사람들과 함께 의견을 나누는 게 정말 재밌어요!
          </p>
        </div>
      </div>
      <button
        type="submit"
        className="btn-outline-md mt-auto mb-auto"
        onClick={openModal}
      >
        삭제
      </button>
    </div>
  );
};

// 기본 props 설정
CommentItem.defaultProps = {
  handleModal: undefined,
};

export default CommentItem;
