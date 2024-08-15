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

type ModifyInfo = {
  profileImg?: string;
  nickname?: string;
};

function MyInfo() {
  const token = useAuthStore((state) => state.accessToken);

  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string | undefined>(undefined);
  const [checkNickname, setCheckNickname] = useState<string | null>(null);
  const [check, setCheck] = useState<boolean>(true);

  const [tempProfile, setTempProfile] = useState<File | null>(null);
  const [tempProfileName, setTempProfileName] = useState<string | null>(null);
  const [tempProfileSrc, setTempProfileSrc] = useState<
    string | ArrayBuffer | null
  >(null);

  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        if (token) {
          const response = await client(token).get("/api/member");
          setUserInfo(response.data);
          setNickname(response.data.nickname);
        }
      } catch (error) {
        console.error("Error 발생", error);
      }
    };

    getMemberInfo();
  }, [token]);

  const inputNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setCheck(false);
  };

  const changeNickname = async () => {
    if (token) {
      const response = await client(token).post("/api/member/valid", {
        nickname,
      });

      if (response.status === 200) {
        setCheckNickname(response.data);
        setCheck(true);
      } else if (response.status === 202) {
        setCheckNickname(response.data.acceptedMessage);
        setNickname(userInfo?.nickname);
      }
    }
  };

  const inputProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfileSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setTempProfileName(file.name);
      setTempProfile(file);
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
    if (tempProfileName && token && tempProfile) {
      const response = await client(token).post(
        `/api/s3/upload/${tempProfileName}`,
        {
          prefix: "test",
        },
      );

      const { path } = response.data;
      const url = uploadS3(path, tempProfile);

      return url;
    }

    return null;
  };

  const postInfo = async () => {
    if (!check) {
      alert("닉네임 중복확인 먼저 진행해주세요");
      return;
    }

    const modifyInfo: ModifyInfo = {};

    if (tempProfileName) {
      const url = await getS3url();

      if (url) {
        const [profileImg] = url.split("?");
        modifyInfo.profileImg = profileImg;
      }
    }

    if (nickname !== userInfo?.nickname) {
      modifyInfo.nickname = nickname;
    }

    if (modifyInfo && token) {
      const response = await client(token).patch("/api/member", modifyInfo);

      if (response.status === 200) {
        alert("프로필 수정이 완료되었습니다.");
        setCheckNickname(null);
      }
    }
  };

  if (!userInfo) {
    return null;
  }

  return (
    <div className="flex flex-col m-auto">
      <div className="flex w-[800px] justify-between">
        <div className="flex flex-col items-center pl-5">
          <img
            src={
              tempProfileSrc ? (tempProfileSrc as string) : userInfo.profileImg
            }
            alt="프로필 이미지"
            className="w-64 h-64 bg-gray-300 rounded-full"
          />
          <label htmlFor="profileImg">
            <div className="btn-outline-lg flex items-center mt-4 hover:cursor-pointer">
              <img
                src={cameraIcon}
                alt="카메라아이콘"
                className="w-[15px] h-[13.7px] mr-2.5"
              />
              프로필 사진 변경하기
            </div>
            <input
              type="file"
              id="profileImg"
              accept="image/*"
              onChange={inputProfile}
              className="hidden"
            />
          </label>
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
              <span
                className={`text-small ${checkNickname === "사용 가능한 닉네임입니다." ? "text-green" : "text-red"}`}
              >
                {checkNickname}
              </span>
            </div>
            <input
              type="text"
              defaultValue={userInfo.nickname}
              id="nickname"
              className="w-96 h-11 bg-gray-100 rounded-3xl  flex items-center pl-5 mt-2"
              onChange={inputNickname}
            />
            <button
              type="button"
              className="btn-light-lg mt-3"
              onClick={changeNickname}
            >
              중복 확인
            </button>
          </div>
        </div>
      </div>
      <button type="button" className="btn-lg mt-10" onClick={postInfo}>
        수정 완료
      </button>
    </div>
  );
}

export default MyInfo;
