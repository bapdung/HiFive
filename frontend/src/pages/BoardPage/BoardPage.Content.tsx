import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import client from "../../client";
import useAuthStore from "../../store/useAuthStore";
import camera from "../../assets/icons/cameraIcon.png";

interface Board {
  boardId: number;
  contents: string;
  boardImg: string;
  createdDate: string;
  totalPages: number;
}

interface ContentProps {
  handleModal: (stateOfModal: boolean, boardId: number, msg: string) => void;
  handleEdit: (isEditing: boolean) => void;
  fetchDetail: () => void;
  isCanEdit: boolean;
  isEditing: boolean;
  board: Board | null;
}

const Content: React.FC<ContentProps> = ({
  handleModal,
  handleEdit,
  isCanEdit,
  isEditing,
  board,
  fetchDetail,
}) => {
  const location = useLocation();
  const boardId = parseInt(location.pathname.split("/")[3], 10);
  const token = useAuthStore((state) => state.accessToken);
  const [inputValue, setInputValue] = useState(board?.contents);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  // ref 객체 가져오기 위해서 생성 (높이 때문에)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scroll height
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  useEffect(() => {
    if (isEditing) {
      adjustTextareaHeight();
    }
  }, [isEditing]); // 수정버튼 눌렀을 때 높이 조정

  useEffect(() => {
    setInputValue(board?.contents);
  }, [board]);

  const inputImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!token) {
      return;
    }
    const file = event.target.files?.[0];
    if (file) {
      // S3로 이미지 업로드
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImageSrc(reader.result);
          // console.log(ImageSrc); // 테스트용으로 출력
        } else {
          console.error("FileReader result is null");
        }
      };
      reader.readAsDataURL(file);
      setImageName(file.name);
      setImageFile(file);
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

  // S3 URL 가져오기
  const getS3url = async () => {
    if (imageName && token && imageFile) {
      const response = await client(token).post(`/api/s3/upload/${imageName}`, {
        prefix: imageName,
      });
      const { path } = response.data;
      const url = uploadS3(path, imageFile);
      return url;
    }
    return null;
  };

  const updateBoard = async () => {
    if (!token) {
      return;
    }
    try {
      console.log("update");
      if (imageFile) {
        const url = await getS3url();
        if (!url) {
          return;
        }
        const [boardImg] = url.split("?");
        await client(token).patch(`/api/board/${boardId}`, {
          contents: inputValue,
          boardImg,
        });
        await fetchDetail();
      }
      if (!imageFile) {
        await client(token).patch(`/api/board/${boardId}`, {
          contents: inputValue,
        });
        await fetchDetail();
      }
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };

  const handleSave = () => {
    updateBoard();
    handleEdit(false);
  };

  return (
    <div className="py-8 px-10 bg-white w-full rounded-[30px] relative">
      <div className="flex items-center space-x-reverse">
        <div className="bg-gray-400 w-[50px] h-[50px] rounded-full" />
        <div className="ml-4">
          <p className="text-h6">개복어</p>
          <p className="text-xs">2024. 07. 15</p>
        </div>
        <div className="ml-auto space-x-2.5">
          {isEditing && isCanEdit ? (
            <>
              <button
                className="creator-btn-light-md px-[2.5]"
                type="button"
                onClick={() => handleEdit(false)}
              >
                취소
              </button>
              <button
                className="creator-btn-md px-[2.5]"
                type="button"
                onClick={handleSave}
              >
                수정 완료
              </button>
            </>
          ) : null}
          {!isEditing && isCanEdit ? (
            <>
              <button
                className="creator-btn-light-md px-[2.5]"
                type="button"
                onClick={() => handleEdit(true)}
              >
                수정
              </button>
              <button
                className="btn-light-md px-[2.5]"
                type="button"
                onClick={() => {
                  handleModal(true, boardId, "게시글");
                }}
              >
                삭제
              </button>
            </>
          ) : null}
        </div>
      </div>
      {isEditing ? (
        <div>
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            className="mt-4 p-5 border-2 w-full border-solid border-gray-200 text-medium text-gray-900 rounded-[15px] resize-none overflow-hidden focus:outline-0 mb-10"
            rows={1}
          />
          {imageSrc ? (
            <div className="relative">
              <img
                src={imageSrc as string}
                alt="board-img"
                className="mr-auto ml-auto"
              />
              <label htmlFor="photoFile">
                <div
                  className="creator-btn-outline-md flex justify-center items-center px-2.5 mr-auto ml-auto w-1/4 hover:cursor-pointer mt-5"
                  style={{ borderWidth: "1px" }}
                >
                  <img src={camera} alt="edit" className="mr-2.5 w-3.5" />
                  게시글 사진 변경하기
                </div>
                <input
                  type="file"
                  id="photoFile"
                  accept="image/*"
                  onChange={inputImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : null}
          {board?.boardImg && !imageSrc ? (
            <div className="relative">
              <img
                src={board?.boardImg}
                alt="board-img"
                className="mr-auto ml-auto"
              />
              <label htmlFor="photoFile">
                <div
                  className="creator-btn-outline-md flex justify-center items-center px-2.5 mr-auto ml-auto w-1/4 hover:cursor-pointer mt-5"
                  style={{ borderWidth: "1px" }}
                >
                  <img src={camera} alt="edit" className="mr-2.5 w-3.5" />
                  게시글 사진 변경하기
                </div>
                <input
                  type="file"
                  id="photoFile"
                  accept="image/*"
                  onChange={inputImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : null}
          {!board?.boardImg && !imageSrc ? (
            <label htmlFor="photoFile">
              <div
                className="creator-btn-outline-md flex justify-center items-center px-2.5 mr-auto ml-auto w-1/4 hover:cursor-pointer mt-5"
                style={{ borderWidth: "1px" }}
              >
                <img src={camera} alt="edit" className="mr-2.5 w-3.5" />
                게시글 사진 추가하기
              </div>
              <input
                type="file"
                id="photoFile"
                accept="image/*"
                onChange={inputImageUpload}
                className="hidden"
              />
            </label>
          ) : null}
        </div>
      ) : (
        <div>
          <p ref={pRef} className="py-5 w-full text-gray-900 text-medium mb-10">
            {board?.contents}
          </p>
          {imageSrc ? (
            <img
              src={imageSrc as string}
              alt="board-img"
              className="mr-auto ml-auto"
            />
          ) : null}
          {!imageSrc && board?.boardImg ? (
            <img
              src={board?.boardImg}
              alt="board-img"
              className="mr-auto ml-auto"
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Content;
