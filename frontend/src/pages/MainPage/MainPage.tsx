import { useEffect, useState } from "react";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

import TicketList from "./MainPage.TicketList";
import FollowingList from "./MainPage.FollowingList";
import TicketingShortcut from "./MainPage.TicketingShortcut";
import MylistShortcut from "./MainPage.MylistShortcut";

type UserData = {
  nickname: string;
};

function MainPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const apiClient = client(accessToken || "");
        const response = await apiClient.get("/api/member");
        if (response.data && response.data.nickname) {
          const { nickname } = response.data;
          setUserData({ nickname });
        }
      } catch (err) {
        console.error("Error fetching nickname:", err);
      }
    };

    fetchNickname();
  }, [accessToken]);

  return (
    <div className=" flex flex-col items-center w-full">
      <span className="text-h2 text-gray-900 font-bold my-10">
        하이파이브 한 번 해요,{" "}
        <span className="text-primary-text">
          {userData?.nickname || "이름"}
        </span>
        님!
      </span>
      <TicketList nickname={userData?.nickname || null} />
      <FollowingList />
      <div className="flex w-full justify-between items-center mb-10">
        <TicketingShortcut />
        <MylistShortcut />
      </div>
    </div>
  );
}

export default MainPage;
