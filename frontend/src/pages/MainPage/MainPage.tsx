import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

import TicketList from "./MainPage.TicketList";
import FollowingList from "./MainPage.FollowingList";
import TicketingShortcut from "./MainPage.TicketingShortcut";
import MylistShortcut from "./MainPage.MylistShortcut";

import logoIcon from "../../assets/joinCreator/logoIcon.png";
import client from "../../client";

type UserData = {
  nickname: string;
  creator: boolean;
};

function MainPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { accessToken, validateAndGetToken, setAccessToken } = useAuthStore();
  const navigate = useNavigate();
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    const preparePage = async () => {
      let token = accessToken;

      if (!token) {
        token = await validateAndGetToken();
        if (token) {
          setAccessToken(token);
        } else {
          navigate("/login");
          return;
        }
      }

      setIsTokenReady(true);
    };

    preparePage();
  }, [accessToken, validateAndGetToken, setAccessToken, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isTokenReady) {
        try {
          const apiClient = await client(accessToken || "");
          const response = await apiClient.get("/api/member");
          if (response.data) {
            const { nickname, creator } = response.data;
            setUserData({ nickname, creator });
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          navigate("/login");
        }
      }
    };

    fetchUserData();
  }, [isTokenReady, accessToken, navigate]);

  if (!isTokenReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="my-6 flex justify-center items-center w-full max-w-[1200px] px-4">
        <span className="text-h3 text-gray-900 font-bold">
          하이파이브 한 번 해요,{" "}
          <span
            className={`${
              userData?.creator ? "text-secondary" : "text-primary-text"
            }`}
          >
            {userData?.nickname || "이름"}
          </span>
          님!
        </span>
      </div>
      <div className="absolute right-10 my-4">
        {userData?.creator && (
          <Link to="/creator-only" className="flex items-center">
            <div className="px-10 py-2 text-center bg-secondary rounded-full flex items-center justify-center shadow-md ml-4">
              <img
                src={logoIcon}
                alt="creatorlogo"
                className="w-[40px] h-[40px] mr-4"
              />
              <div className="flex flex-col items-start justify-center">
                <span className="text-medium text-white font-semibold">
                  크리에이터 입점 완료된 계정입니다.
                </span>
                <span className="text-small text-white">
                  전용 페이지에서 팬미팅을 생성, 관리해보세요 &rarr;
                </span>
              </div>
            </div>
          </Link>
        )}
      </div>
      <TicketList nickname={userData?.nickname || null} />
      <FollowingList />
      <div className="flex w-[1200px] justify-between items-center mb-20">
        <TicketingShortcut />
        <MylistShortcut />
      </div>
    </div>
  );
}

export default MainPage;
