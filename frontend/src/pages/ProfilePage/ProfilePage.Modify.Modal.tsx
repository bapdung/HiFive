import TextareaAutosize from "react-textarea-autosize";

import { useEffect, useState } from "react";
import cameraIcon from "../../assets/icons/cameraIcon.png";
import useAuthStore from "../../store/useAuthStore";
import client from "../../client";

type CreatorInfo = {
  creatorId: number;
  creatorName: string;
  link: string;
  description: string;
  follower: number;
  boardCount: number;
  createdDate: string;
  fanmeetingCount: number;
  creatorImg: string;
};

type ModifyProfile = {
  link: string;
  description: string;
  creatorImg: string;
};

interface Props {
  creatorProfile: CreatorInfo;
  closeModal: () => void;
  updateCreatorProfile: (profile: CreatorInfo) => void;
}

function ModifyModal({
  creatorProfile,
  closeModal,
  updateCreatorProfile,
}: Props) {
  const token = useAuthStore((state) => state.accessToken);

  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const [tempProfile, setTempProfile] = useState<File | null>(null);
  const [tempProfileName, setTempProfileName] = useState<string | null>(null);
  const [tempProfileSrc, setTempProfileSrc] = useState<
    string | ArrayBuffer | null
  >(null);

  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setDescription(content);
  };

  const changeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    setLink(content);
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

  const postModifyProfile = async () => {
    const modifyProfile: ModifyProfile = {
      link,
      description,
      creatorImg: creatorProfile.creatorImg,
    };

    if (tempProfileName) {
      const url = await getS3url();

      if (url) {
        const [profileImg] = url.split("?");
        modifyProfile.creatorImg = profileImg;
      }
    }

    if (token && modifyProfile) {
      const response = await client(token).patch("/api/creator", modifyProfile);

      if (response.status === 200) {
        const updatedProfile = {
          ...creatorProfile,
          link: modifyProfile.link,
          description: modifyProfile.description,
          creatorImg: modifyProfile.creatorImg,
        };
        updateCreatorProfile(updatedProfile);
        alert("수정이 완료되었습니다.");
        closeModal();
      }
    }
  };

  useEffect(() => {
    setDescription(creatorProfile.description);
    setLink(creatorProfile.link);
  }, [creatorProfile]);
  // fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50
  return (
    <div className="z-40 w-full h-full fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="z-50 w-2/5 h-[600px] bg-white px-8 py-6 flex flex-col justify-between items-center rounded-3xl">
        <img
          src={(tempProfileSrc as string) || creatorProfile.creatorImg}
          alt="프로필이미지"
          className="w-48 h-48 bg-gray-300 rounded-full"
        />
        <label htmlFor="profileImg">
          <div className="creator-btn-outline-lg flex items-center hover:cursor-pointer">
            <img src={cameraIcon} alt="카메라" className="w-5 h-5 mr-2.5" />
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
        <span className="w-full items-start text-small text-gray-700 ml-3 mt-5">
          프로필 소개문
        </span>
        <TextareaAutosize
          className="w-full max-h-20 border-2 border-[#DED8E1] rounded-xl px-5 py-2.5 auto-rows-auto resize-none focus:outline-none font-Pretendard"
          placeholder="간단한 프로필 소개문을 100자 이내로 작성해 주세요."
          value={description}
          onChange={(e) => changeDescription(e)}
        />
        <span className="w-full items-start text-small text-gray-700 ml-3 mt-5">
          크리에이터 채널 링크
        </span>
        <input
          type="text"
          className="w-full border-2 border-[#DED8E1] rounded-xl px-5 py-2.5 focus:outline-none font-Pretendard"
          placeholder="프로필과 연결될 YouTube 채널 링크를 입력해주세요."
          value={link}
          onChange={(e) => changeLink(e)}
        />
        <div className="w-full flex justify-end">
          <button
            type="button"
            aria-label="취소 버튼"
            className="creator-btn-light-lg mr-2.5"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            type="button"
            aria-label="제출 버튼"
            className="creator-btn-lg"
            onClick={postModifyProfile}
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModifyModal;
