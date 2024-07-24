import TextareaAutosize from "react-textarea-autosize";

import cameraIcon from "../../assets/cameraicon.png";

function ModifyModal() {
  return (
    <div className="z-40 w-screen h-screen absolute top-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="z-50 w-2/5 h-3/5 bg-white px-8 py-6 flex flex-col justify-between items-center rounded-3xl">
        <div className="w-48 h-48 bg-gray-300 rounded-full" />
        <button
          type="button"
          className="creator-btn-outline-lg flex items-center"
        >
          <img src={cameraIcon} alt="카메라" className="w-5 h-5 mr-2.5" />
          프로필 사진 변경하기
        </button>
        <TextareaAutosize
          className="w-full max-h-20 border-2 border-[##DED8E1] rounded-xl px-5 py-2.5 auto-rows-auto resize-none focus:outline-none font-Pretendard"
          placeholder="간단한 프로필 소개문을 100자 이내로 작성해 주세요."
        />
        <input
          type="text"
          className="w-full border-2 border-[##DED8E1] rounded-xl px-5 py-2.5 focus:outline-none font-Pretendard"
          placeholder="프로필과 연결될 YouTube 채널 링크를 입력해주세요."
        />
        <div className="w-full flex justify-end">
          <button
            type="button"
            aria-label="취소 버튼"
            className="creator-btn-light-lg mr-2.5"
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
