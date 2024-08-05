import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import client from "../../client";
import Content from "./BoardPage.Content";
import CommentList from "./BoardPage.CommentList";
import DeleteModal from "./BoardPage.DeleteModal";
import useAuthStore from "../../store/useAuthStore";

interface Board {
  boardId: number;
  contents: string;
  boardImg: string;
  createdDate: string;
  totalPages: number;
}

const BoardPage: React.FC = () => {
  const location = useLocation();
  const boardId = parseInt(location.pathname.split("/")[3], 10);
  const token = useAuthStore((state) => state.accessToken);
  const [board, setBoard] = useState<Board | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("게시글");
  const [isEditing, setEditing] = useState<boolean>(false);

  const handleModal = (stateOfModal: boolean, msg = "게시글"): void => {
    setOpen(stateOfModal);
    setMessage(msg);
  };

  const handleEdit = (editingState: boolean): void => {
    setEditing(editingState);
  };

  const fetchDetail = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await client(token).get(`api/board/detail/${boardId}`);
      setBoard(response.data);
    } catch (error) {
      console.error("Error fetching board details:", error);
    }
  };

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, boardId, board]);

  return (
    <div className="relative w-full flex flex-col items-center pt-[40px] bg-gray-100">
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-10" />}
      <div
        className={`w-3/4 flex flex-col items-center bg-board-gradient rounded-3xl ${isOpen ? "relative z-20" : ""}`}
      >
        {isOpen && (
          <div className="absolute inset-0 bg-black opacity-50 z-10 rounded-3xl" />
        )}
        <div className="w-[80%] mt-20 mb-10 relative">
          <Content
            handleModal={handleModal}
            handleEdit={handleEdit}
            isEditing={isEditing}
            board={board}
          />
          <CommentList handleModal={handleModal} />
        </div>
      </div>
      <DeleteModal
        isOpen={isOpen}
        onClose={() => handleModal(false, "게시글")}
        message={message}
      />
    </div>
  );
};

export default BoardPage;
