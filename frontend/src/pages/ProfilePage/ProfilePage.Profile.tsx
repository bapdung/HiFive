import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

import ModifyModal from "./ProfilePage.Modify.Modal";

import fullHeart from "../../assets/icons/full-heart.png";
import heart from "../../assets/icons/heart.png";

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

type Board = {
  boardId: number;
  creatorName: string;
  boardImg: string;
  createdDate: string;
  contents: string;
  totalPages: number;
};

interface Props {
  initialCreatorProfile: CreatorInfo;
  isMe: boolean;
}

function Profile({ initialCreatorProfile, isMe }: Props) {
  const token = useAuthStore((state) => state.accessToken);
  const { creatorId } = useParams();

  const [creatorProfile, setCreatorProfile] = useState<CreatorInfo>(
    initialCreatorProfile,
  );
  const [follow, setFollow] = useState<boolean>(false);
  const [activityDay, setActivityDay] = useState<number>();
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [openModifyModal, setOpenModifyModal] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const openModal = () => {
    setOpenModifyModal(true);
  };

  const closeModal = () => {
    setOpenModifyModal(false);
  };

  const handleFollow = async () => {
    if (token) {
      const response = await client(token).post(`/api/follow/${creatorId}`);

      if (response.status === 200) {
        setFollow(true);
        creatorProfile.follower += 1;
      }
    }
  };

  const handleUnfollow = async () => {
    if (token) {
      const response = await client(token).delete(`/api/follow/${creatorId}`);

      if (response.status === 200) {
        setFollow(false);
        creatorProfile.follower -= 1;
      }
    }
  };

  const updateCreatorProfile = (updatedProfile: CreatorInfo) => {
    setCreatorProfile(updatedProfile);
  };

  useEffect(() => {
    const handleActivityDay = () => {
      const createdDate = new Date(creatorProfile.createdDate);
      const currentDate = new Date();
      const dateDiff = Math.floor(
        (currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      setActivityDay(dateDiff);
    };

    const getFollow = async () => {
      if (token) {
        const res = await client(token).get("/api/creator/follow");
        const followList = res.data;

        for (let idx = 0; idx < followList.length; idx += 1) {
          if (followList[idx].creatorId === Number(creatorId)) {
            setFollow(true);
            return;
          }
        }
      }
    };

    const getBoardList = async () => {
      if (token) {
        const response = await client(token).get(
          `/api/board/${creatorId}?sort=desc`,
        );
        setBoardList(response.data);
      }
    };

    getFollow();
    getBoardList();
    handleActivityDay();
  }, [token, creatorId, creatorProfile.createdDate, creatorProfile]);

  return (
    <>
      {openModifyModal && (
        <ModifyModal
          creatorProfile={creatorProfile}
          closeModal={closeModal}
          updateCreatorProfile={updateCreatorProfile}
        />
      )}
      <div className="flex h-90 px-12 py-10 items-center justify-between w-5/6 rounded-3xl bg-horizontal-gradient shadow-md">
        <div className="w-2/6 h-64 flex flex-col justify-center">
          <div className="flex items-center">
            <div className="text-h2 mr-5 font-semibold">
              {creatorProfile.creatorName}
            </div>
            {follow ? (
              <button
                type="button"
                className="btn-outline-md w-25 h-9 flex items-center"
                onClick={handleUnfollow}
              >
                <img
                  src={fullHeart}
                  alt="하트"
                  className="mr-1.5 w-[13px] h-[13px]"
                />
                팔로잉
              </button>
            ) : (
              <button
                type="button"
                className="btn-md w-25 h-9 flex items-center"
                onClick={handleFollow}
              >
                <img
                  src={heart}
                  alt="하트"
                  className="mr-1.5 w-[15px] h-[14px]"
                />
                팔로우
              </button>
            )}
            {isMe && (
              <div
                className="creator-btn-outline-md h-9 flex items-center ml-3 hover:cursor-pointer"
                onClick={openModal}
                role="presentation"
              >
                편집
              </div>
            )}
          </div>
          <p className="text-medium my-5 text-gray-900">
            {creatorProfile.description}
          </p>
          <div className="flex w-full justify-between">
            <div className="flex flex-col items-center text-small text-gray-600">
              <span className="text-large font-semibold text-gray-700">
                {activityDay}
              </span>
              활동일
            </div>
            <div className="flex flex-col items-center text-small text-gray-600">
              <span className="text-large font-semibold text-gray-700">
                {creatorProfile.follower}
              </span>
              팔로워
            </div>
            <div className="flex flex-col items-center text-small text-gray-600">
              <span className="text-large font-semibold text-gray-700">
                {creatorProfile.fanmeetingCount}
              </span>
              팬미팅
            </div>
            <div className="flex flex-col items-center text-small text-gray-600 ">
              <span className="text-large font-semibold text-gray-700">
                {creatorProfile.boardCount}
              </span>
              게시글
            </div>
          </div>
        </div>
        <div
          className="relative w-52 h-52"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={creatorProfile.creatorImg}
            alt="프로필이미지"
            className="bg-gray-300 w-full h-full rounded-full hover:cursor-pointer"
          />
          {isHovered && (
            <button
              className="absolute inset-0 w-auto bg-black bg-opacity-50 text-white text-h6 font-semibold flex items-center justify-center rounded-full"
              onClick={() => window.open(creatorProfile.link, "_blank")}
              type="button"
            >
              크리에이터 방문하기
            </button>
          )}
        </div>
        <div className="w-4/12 h-64 flex flex-col justify-between py-5">
          <span className="text-h6 font-semibold ml-1">
            크리에이터의 최신 소식
          </span>
          {boardList[0] && (
            <div className="bg-white p-5 rounded-tl-2xl rounded-r-2xl shadow-sm">
              <span className="text-medium font-semibold">
                {creatorProfile.creatorName}
              </span>
              <p className="text-small text-gray-900">
                {boardList[0].contents}
              </p>
            </div>
          )}
          {boardList[1] && (
            <div className="bg-white p-5 rounded-tl-2xl rounded-r-2xl shadow-sm">
              <span className="text-medium font-semibold">
                {creatorProfile.creatorName}
              </span>
              <p className="text-small text-gray-900">
                {boardList[1].contents}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
