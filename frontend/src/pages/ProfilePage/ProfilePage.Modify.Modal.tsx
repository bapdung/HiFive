import TextareaAutosize from "react-textarea-autosize";

import cameraIcon from "../../assets/cameraicon.png";

function ModifyModal() {
  return (
    <div className="z-40 w-screen h-screen absolute top-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="z-50 w-[600px] h-[540px] bg-white p-[30px_20px] flex flex-col justify-between items-center rounded-3xl">
        <div className="w-[200px] h-[200px] bg-gray-300 rounded-full" />
        <button
          type="button"
          className="creator-btn-outline-lg flex items-center"
        >
          <img
            src={cameraIcon}
            alt="카메라"
            className="w-[20px] h-[17px] mr-[10px]"
          />
          프로필 사진 변경하기
        </button>
        <TextareaAutosize
          className="w-[560px] border-2 border-[##AEAEAE] rounded-xl p-[10px_20px] auto-rows-auto resize-none focus:outline-none font-Pretendard"
          placeholder="간단한 프로필 소개문을 100자 이내로 작성해 주세요."
        />
        <input
          type="text"
          className="w-[560px] border-2 border-[##AEAEAE] rounded-xl p-[10px_20px] focus:outline-none font-Pretendard"
          placeholder="프로필과 연결될 YouTube 채널 링크를 입력해주세요."
        />
        <div className="w-full flex justify-end">
          <button
            type="button"
            aria-label="취소 버튼"
            className="creator-btn-light-lg mr-[10px]"
          >
            취소
          </button>
          <button
            type="button"
            aria-label="제출 버튼"
            className="creator-btn-lg"
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModifyModal;
