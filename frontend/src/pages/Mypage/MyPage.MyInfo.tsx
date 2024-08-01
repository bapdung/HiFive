import { useEffect, useState } from "react";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

import cameraIcon from "../../assets/icons/pink-cameraIcon.png";

type User = {
  creaotr: boolean;
  email: string;
  memberId: number;
  name: string | null;
  nickname: string;
  point: number;
  profileImg: string;
};

function MyInfo() {
  const token = useAuthStore((state) => state.accessToken);

  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        if (token) {
          const response = await client(token).get("/api/member");
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error("Error 발생", error);
      }
    };

    getMemberInfo();
  }, [token]);

  if (!userInfo) {
    return null;
  }

  return (
    <div className="flex flex-col h-[900px] justify-center">
      <div className="flex w-[800px] justify-between">
        <div className="flex flex-col items-center pl-5">
          <img
            src={userInfo.profileImg}
            alt="프로필이미지"
            className="w-64 h-64 bg-gray-300 rounded-full"
          />
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
              {userInfo.name}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-h6">이메일 주소</span>
            <span className="w-96 h-11 bg-gray-100 rounded-3xl text-gray-500 flex items-center pl-5 mt-2">
              {userInfo.email}
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
              defaultValue={userInfo.nickname}
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
