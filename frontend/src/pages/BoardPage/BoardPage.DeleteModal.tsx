import React from "react";

export interface BoardProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const DeleteModal: React.FC<BoardProps> = ({ isOpen, onClose, message }) => {
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
        <form className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 text-gray-700 w-32 rounded-[24px] text-large font-semibold"
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 w-32 rounded-[24px] text-large font-semibold"
          >
            삭제하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
