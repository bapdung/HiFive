import TextareaAutosize from "react-textarea-autosize";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import client from "../../client";

import photoIcon from "../../assets/icons/photoIcon.png";
import Board from "./ProfilePage.BoardList.Board";
import preIcon from "../../assets/icons/preIcon.svg";
import nextIcon from "../../assets/icons/nextIcon.svg";

type BoardInfo = {
  boardId: number;
  creatorName: string;
  boardImg: string;
  createdDate: string;
  contents: string;
  totalPages: number;
};

type Params = {
  sort: string;
  page: number;
};

type InputBoard = {
  contents: string;
  boardImg?: string;
};

interface Props {
  creatorName: string;
  isMe: boolean;
  creatorImg: string;
}

function BoardList({ creatorName, isMe, creatorImg }: Props) {
  const token = useAuthStore((state) => state.accessToken);
  const { creatorId } = useParams();

  const [boardList, setBoardList] = useState<BoardInfo[]>([]);

  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [currentPageGroup, setCurrentPageGroup] = useState<number>(0);

  const [inputContent, setInputContent] = useState<string>();

  const [tempBoardImg, setTempBoardImg] = useState<File | null>(null);
  const [tempBoardImgName, setTempBoardImgName] = useState<string | null>(null);
  const [tempBoardImgSrc, setTempBoardImgSrc] = useState<
    string | ArrayBuffer | null
  >(null);

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleNextPageGroup = () => {
    if ((currentPageGroup + 1) * 5 < totalPage) {
      setCurrentPageGroup(currentPageGroup + 1);
    }
  };

  const handlePreviousPageGroup = () => {
    if (currentPageGroup > 0) {
      setCurrentPageGroup(currentPageGroup - 1);
    }
  };

  const renderPageNumbers = () => {
    const startPage = currentPageGroup * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPage);
    const pages = [];
    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(
        <div
          key={i}
          onClick={() => changePage(i)}
          role="presentation"
          className={`${page === i ? "text-primary-700" : ""} hover:cursor-pointer`}
        >
          {i}
        </div>,
      );
    }
    return pages;
  };

  const handelInputContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value);
  };

  const inputBoardImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempBoardImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setTempBoardImgName(file.name);
      setTempBoardImg(file);
    }
  };

  const uploadS3 = async (path: string, file: File) => {
    const response = await fetch(
      new Request(path, {
        method: "PUT",
        body: file,
        headers: new Headers({
          "Content-Type": file.type,
        }),
      }),
    );

    return response.url;
  };

  const getS3url = async () => {
    if (tempBoardImgName && token && tempBoardImg) {
      const response = await client(token).post(
        `/api/s3/upload/${tempBoardImgName}`,
        {
          prefix: "test",
        },
      );

      const { path } = response.data;
      const url = uploadS3(path, tempBoardImg);

      return url;
    }

    return null;
  };

  const getBoardList = async () => {
    const params: Params = {
      sort: "desc",
      page: page - 1,
    };

    if (token) {
      const response = await client(token).get(`/api/board/${creatorId}`, {
        params,
      });
      setBoardList(response.data);

      if (response.data.length > 0) {
        setTotalPage(response.data[0].totalPages);
      } else {
        setTotalPage(0);
      }
    }
  };

  const postBoard = async () => {
    if (!inputContent) {
      alert("글을 작성해주세요.");
      return;
    }

    const inputBoard: InputBoard = {
      contents: inputContent,
    };

    if (tempBoardImgName) {
      const url = await getS3url();

      if (url) {
        const [boardImg] = url.split("?");
        inputBoard.boardImg = boardImg;
      }
    }

    if (token) {
      const response = await client(token).post(
        `/api/board/${creatorId}`,
        inputBoard,
      );

      if (response.status === 201) {
        alert("게시글 등록이 완료되었습니다.");
        getBoardList();
        setInputContent("");
        setTempBoardImgSrc(null);
      }
    }
  };

  useEffect(() => {
    getBoardList();
    // eslint-disable-next-line
  }, [creatorId, token, page]);

  return (
    <>
      <div className="text-h4 flex font-bold justify-center my-7">
        From. {creatorName}
      </div>
      {isMe ? (
        <div className="w-3/4 bg-white rounded-2xl px-10 pt-10 pb-5 mb-9 border-2 border-primary-500">
          <TextareaAutosize
            className="w-full auto-rows-auto resize-none focus:outline-none"
            placeholder="팬들에게 새로운 소식을 알려주세요!"
            onChange={(e) => handelInputContent(e)}
            value={inputContent || ""}
          />
          {tempBoardImgSrc ? (
            <img
              src={tempBoardImgSrc as string}
              alt="이미지"
              className="bg-gray-500"
            />
          ) : (
            ""
          )}
          <div className="flex justify-between mt-6">
            <label htmlFor="boardImg">
              <div className="flex items-center hover:cursor-pointer">
                <img
                  src={photoIcon}
                  alt="사진등록"
                  className="w-[25px] h-[25px]"
                />
                <div className="text-gray-500 mt-0.5 ml-1">이미지 첨부</div>
                <input
                  type="file"
                  id="boardImg"
                  accept="image/*"
                  className="hidden"
                  onChange={inputBoardImg}
                />
              </div>
            </label>
            <button
              type="button"
              className="creator-btn-md"
              onClick={postBoard}
            >
              게시글 등록
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="w-3/4 h-px border-b border-solid border-y-2 border-primary-500" />
      <div className="w-3/4 mb-16">
        {boardList.map((board) => (
          <Board board={board} key={board.boardId} creatorImg={creatorImg} />
        ))}
      </div>
      {totalPage ? (
        <div className="my-3.5 flex justify-center">
          <div className="flex justify-between items-center w-80 text-h6">
            <img
              src={preIcon}
              alt="이전버튼"
              className="w-[1rem] h-[1rem] hover:cursor-pointer"
              onClick={handlePreviousPageGroup}
              role="presentation"
            />
            {renderPageNumbers()}
            <img
              src={nextIcon}
              alt="다음버튼"
              className="w-[1rem] h-[1rem] hover:cursor-pointer"
              onClick={handleNextPageGroup}
              role="presentation"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default BoardList;
