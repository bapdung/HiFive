import React, { useState, useRef, useEffect } from "react";
import camera from "../../assets/icons/cameraIcon.png";

interface Board {
  boardId: number;
  contents: string;
  boardImg: string;
  createdDate: string;
  totalPages: number;
}

interface ContentProps {
  handleModal: (stateOfModal: boolean, msg?: string) => void;
  handleEdit: (isEditing: boolean) => void;
  isEditing: boolean;
  board: Board | null;
}

const Content: React.FC<ContentProps> = ({
  handleModal,
  handleEdit,
  isEditing,
  board,
}) => {
  const [inputValue, setInputValue] = useState(board?.contents);

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

  const handleSave = () => {
    // 나중에 save 로직 작성
    handleEdit(false); // 수정 완료 후 edit 모드 종료
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
          {isEditing ? (
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
          ) : (
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
                onClick={() => handleModal(true, "게시글")}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
      {isEditing ? (
        <div>
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            className="mt-4 p-5 border-2 w-full border-solid border-gray-200 text-medium text-gray-900 rounded-[15px] resize-none overflow-hidden focus:outline-0"
            rows={1}
          />
          {board?.boardImg ? (
            <div className="relative">
              <img src={board?.boardImg} alt="board-img" />
              <button
                className="creator-btn-outline-md flex justify-center items-center px-[2.5] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70"
                type="button"
              >
                <img src={camera} alt="edit" className="mr-2.5 w-3.5" />
                게시글 사진 변경하기
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <p ref={pRef} className="py-5 w-full text-gray-900 text-medium">
            {inputValue}
          </p>
          {board?.boardImg ? (
            <img src={board?.boardImg} alt="board-img" />
          ) : null}
        </>
      )}
    </div>
  );
};

export default Content;
