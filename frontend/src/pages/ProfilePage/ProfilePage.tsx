import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "./ProfilePage.Profile";
import Fanmeeting from "./ProfilePage.Fanmeeting";
import BoardList from "./ProfilePage.BoardList";
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

function ProfilePage() {
  const token = useAuthStore((state) => state.accessToken);
  const { creatorId } = useParams();

  const [isMe, setIsMe] = useState<boolean>(false);
  const [creatorProfile, setCreatorProfile] = useState<CreatorInfo>();

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        const response = await client(token).get("/api/member");
        const { memberId } = response.data;

        if (memberId === Number(creatorId)) {
          setIsMe(true);
        }
      }
    };

    const getCreatorInfo = async () => {
      if (token) {
        const response = await client(token).get(`/api/creator/${creatorId}`);
        setCreatorProfile(response.data);
      }
    };

    getUser();
    getCreatorInfo();
  }, [token, creatorId]);

  if (!creatorProfile) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center pt-10">
      <Profile creatorProfile={creatorProfile} isMe={isMe} />
      <div className="w-4/5 mt-8 bg-white p-8 rounded-t-2xl">
        <Fanmeeting />
      </div>
      <div className="bg-vertical-gradient w-4/5 bg-primary-100 rounded-b-2xl flex flex-col justify-center items-center">
        <BoardList creatorName={creatorProfile.creatorName} />
      </div>
    </div>
  );
}

export default ProfilePage;
