import cameraIcon from "../../assets/icons/pink-cameraIcon.png";

function MyInfo() {
  return (
    <div className="flex flex-col h-[900px] justify-center">
      <div className="flex w-[800px] justify-between">
        <div className="flex flex-col items-center pl-5">
          <div className="w-64 h-64 bg-gray-300 rounded-full" />
          <button
            type="button"
            className="btn-outline-lg flex items-center mt-4"
          >
            <img
              src={cameraIcon}
              alt="카메라아이콘"
              className="w-[15px] h-[13.7px] mr-2.5"
            />
            프로필 사진 변경하기
          </button>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="text-h6">이름</span>
            <span className="w-96 h-11 bg-gray-100 rounded-3xl text-gray-500 flex items-center pl-5 mt-2">
              서지흔
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-h6">이메일 주소</span>
            <span className="w-96 h-11 bg-gray-100 rounded-3xl text-gray-500 flex items-center pl-5 mt-2">
              example@hifive.com
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-h6">닉네임</span>
              {/* <span className="text-green text-small">
                사용 가능한 닉네임입니다.
              </span> */}
              <span className="text-red text-small">중복된 닉네임입니다.</span>
            </div>
            <input
              type="text"
              defaultValue="현재 닉네임"
              id="nickname"
              className="w-96 h-11 bg-gray-100 rounded-3xl text-gray-500 flex items-center pl-5 mt-2"
            />
            <button type="button" className="btn-light-lg mt-3">
              중복 확인
            </button>
          </div>
        </div>
      </div>
      <button type="button" className="btn-lg mt-10">
        수정 완료
      </button>
    </div>
  );
}

export default MyInfo;
