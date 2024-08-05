import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

export interface BoardProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  id: number;
  fetchDetail: () => void;
}

const DeleteModal: React.FC<BoardProps> = ({
  isOpen,
  onClose,
  message,
  id,
  fetchDetail,
}) => {
  const token = useAuthStore((state) => state.accessToken);

  const deleteBoard = async () => {
    try {
      if (!token || !message || !id || message !== "게시글") {
        return;
      }
      await client(token).delete(`/api/board/${id}`);
      onClose();
    } catch (error) {
      console.error("Error during board deletion:", error);
    }
  };

  const deleteComment = async () => {
    try {
      if (!token || !message || !id || message !== "댓글") {
        return;
      }
      await client(token).delete(`/api/comment/${id}`);
      fetchDetail();
      onClose();
    } catch (error) {
      console.error("Error during board deletion:", error);
    }
  };

  const doDelete = () => {
    if (message === "게시글") {
      onClose();
      deleteBoard();
    } else if (message === "댓글") {
      onClose();
      deleteComment();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-12 rounded-[12px] w-96 opacity-90">
        <p className="text-large text-gray-900">
          정말 해당 {message}을 삭제하시겠습니까?
        </p>
        <p className="text-medium text-gray-600">
          {message} 삭제 후엔 되돌릴 수 없습니다.
        </p>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 text-gray-700 w-32 rounded-[24px] text-large font-semibold"
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="button"
            className="bg-primary text-white px-4 py-2 w-32 rounded-[24px] text-large font-semibold"
            onClick={doDelete}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
