import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

import FollowingProfile from "./MainPage.Following.Profile";
import noContent from "../../assets/img/nocontent1.png";

type FollowingData = {
  creatorId: number;
  creatorName: string;
  profileImg: string;
};

function FollowingList() {
  const [followings, setFollowings] = useState<FollowingData[]>([]);

  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        const apiClient = client(accessToken || "");
        const response = await apiClient.get("/api/creator/follow");
        setFollowings(response.data);
      } catch (err) {
        console.error("Error fetching followings:", err);
      }
    };

    fetchFollowings();
  }, [accessToken]);

  return (
    <div className="flex flex-col bg-white px-10 py-8 rounded-3xl w-[1200px] shadow-lg mb-10">
      <div className="flex items-end justify-between w-[1120px] mb-8">
        <span className="text-h5 text-gray-900 font-bold">
          팔로우 중인 크리에이터
        </span>
        <Link to="/creator/list">
          <span className="text-h6 text-gray-700">전체 크리에이터 보기</span>
        </Link>
      </div>
      {followings.length > 0 ? (
        <div className=" flex flex-wrap justify-start">
          {followings.map((following) => (
            <div
              key={following.creatorId}
              className="flex-grow-0 flex-shrink-0 basis-1/6 p-2"
            >
              <FollowingProfile
                creatorId={following.creatorId}
                profileName={following.creatorName}
                profile={following.profileImg}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-full items-center justify-center">
          <img src={noContent} alt="nocontent" className="w-72" />
          <span className="text-medium my-8 text-center text-gray-500">
            높이 날며 찾아 봤지만, 아무 것도 찾지 못했어요...
          </span>
        </div>
      )}
    </div>
  );
}

export default FollowingList;
