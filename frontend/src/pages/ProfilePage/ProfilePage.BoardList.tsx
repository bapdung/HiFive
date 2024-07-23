import TextareaAutosize from "react-textarea-autosize";

import photoIcon from "../../assets/photoicon.png";
import Board from "./ProfilePage.BoardList.Board";

function BoardList() {
  return (
    <>
      <div className="text-h3 flex justify-center m-[30px_0px]">
        From. 개복어
      </div>
      <div className="w-3/4 bg-white rounded-2xl p-5 mb-[35px]">
        <TextareaAutosize
          className="w-full auto-rows-auto resize-none focus:outline-none"
          placeholder="팬들에게 새로운 소식을 알려주세요!"
        />
        <div className="flex justify-between mt-[25px]">
          <button type="button" className="flex items-center">
            <img src={photoIcon} alt="사진등록" />
            <div className="text-gray-500">이미지 첨부</div>
          </button>
          <button type="button" className="creator-btn-md">
            게시글 등록
          </button>
        </div>
      </div>
      <div className="w-3/4 h-[1px] border-b border-solid border-gray-500" />
      <div className="w-3/4 mb-[60px]">
        <Board />
        <Board />
        <Board />
      </div>
    </>
  );
}

export default BoardList;
