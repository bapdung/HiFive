import { useNavigate, useParams } from "react-router-dom";

type Board = {
  boardId: number;
  creatorName: string;
  boardImg: string;
  createdDate: string;
  contents: string;
  totalPages: number;
};

interface BoardProps {
  board: Board;
  creatorImg: string;
}

function Board({ board, creatorImg }: BoardProps) {
  const navigate = useNavigate();
  const { creatorId } = useParams();

  const date = board.createdDate.split("T")[0].replaceAll("-", ". ");

  return (
    <div className="bg-white px-10 py-7 rounded-3xl mt-9">
      <div className="flex justify-between">
        <div className="flex">
          <img
            src={creatorImg}
            alt="프로필이미지"
            className="w-12 h-12 rounded-full bg-gray-300"
          />
          <div className="flex flex-col ml-3">
            <span className="text-h5">{board.creatorName}</span>
            <span className="text-small text-gray-700">{date}</span>
          </div>
        </div>
        <div
          className="btn-light-md h-8 flex justify-center items-center hover:cursor-pointer"
          onClick={() => navigate(`/creator/${creatorId}/${board.boardId}`)}
          role="presentation"
        >
          자세히보기
        </div>
      </div>
      <p className="mt-2.5 text-large">{board.contents}</p>
      {board.boardImg ? (
        <img src={board.boardImg} alt="본문이미지" className="mt-5" />
      ) : (
        ""
      )}
    </div>
  );
}

export default Board;
