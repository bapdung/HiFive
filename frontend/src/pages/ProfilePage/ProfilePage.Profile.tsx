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
      }
    }
  };

  const handleUnfollow = async () => {
    if (token) {
      const response = await client(token).delete(`/api/follow/${creatorId}`);

      if (response.status === 200) {
        setFollow(false);
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
  }, [token, creatorId, creatorProfile.createdDate]);

  return (
    <>
      {openModifyModal && (
        <ModifyModal
          creatorProfile={creatorProfile}
          closeModal={closeModal}
          updateCreatorProfile={updateCreatorProfile}
        />
      )}
      <div className="flex h-90 px-12 py-10 items-center justify-between w-4/5 rounded-3xl bg-horizontal-gradient">
        <div className="w-2/5 h-64 flex flex-col justify-center">
          <div className="flex items-center">
            <div className="text-h2 mr-5">{creatorProfile.creatorName}</div>
            {follow ? (
              <button
                type="button"
                className="btn-outline-md h-8 flex items-center"
                onClick={handleUnfollow}
              >
                <img src={fullHeart} alt="하트" className="mr-1  w-3 h-3" />
                팔로잉 중
              </button>
            ) : (
              <button
                type="button"
                className="btn-md h-8 flex items-center"
                onClick={handleFollow}
              >
                <img src={heart} alt="하트" className="mr-1 w-3 h-3" />
                팔로우
              </button>
            )}
            {isMe && (
              <div
                className="creator-btn-outline-md h-8 flex items-center ml-3 hover:cursor-pointer"
                onClick={openModal}
                role="presentation"
              >
                프로필 수정
              </div>
            )}
          </div>
          <p className="text-medium my-5 text-gray-600">
            {creatorProfile.description}
          </p>
          <div className="flex">
            <div className="flex flex-col items-center text-small text-gray-600 mr-14">
              <span className="text-large">{activityDay}</span>
              활동일
            </div>
            <div className="flex flex-col items-center text-small text-gray-600 mr-14">
              <span className="text-large">{creatorProfile.follower}</span>
              팔로워
            </div>
            <div className="flex flex-col items-center text-small text-gray-600 mr-14">
              <span className="text-large">
                {creatorProfile.fanmeetingCount}
              </span>
              팬미팅
            </div>
            <div className="flex flex-col items-center text-small text-gray-600 mr-14">
              <span className="text-large">{creatorProfile.boardCount}</span>
              게시글
            </div>
          </div>
        </div>
        <img
          src={creatorProfile.creatorImg}
          alt="프로필이미지"
          className="bg-gray-300 w-52 h-52 rounded-full mx-5"
          onClick={() => window.open(creatorProfile.link, "_blank")}
          role="presentation"
        />
        <div className="w-2/5 h-64 flex flex-col justify-between py-6">
          {boardList[0] && (
            <div className="bg-white p-5 rounded-tl-2xl rounded-r-2xl">
              <span className="text-large">{creatorProfile.creatorName}</span>
              <p className="text-h6 text-gray-600">{boardList[0].contents}</p>
            </div>
          )}
          {boardList[1] && (
            <div className="bg-white p-5 rounded-tl-2xl rounded-r-2xl">
              <span className="text-large">{creatorProfile.creatorName}</span>
              <p className="text-h6 text-gray-600">{boardList[1].contents}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
