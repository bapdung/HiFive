import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

import MyFanmeetingDoneList from "./CreatorOnly.MyFanmeetingDoneList";
import MyFanmeetingPreList from "./CreatorOnly.MyFanmeetingPreList";

function MyFanmeeting() {
  const [isRecent, setIsRecent] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const token = useAuthStore((state) => state.accessToken);
  const orderRecent = () => {
    setIsRecent(true);
  };
  const orderPast = () => {
    setIsRecent(false);
  };

  const navigate = useNavigate();
  const goCreateFanmeeting = () => {
    navigate("/creator-only/new");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      const response = await client(token).get("api/member");
      setUserId(response.data.memberId);
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="my-10 w-4/5 bg-white p-10 rounded-[25px] flex flex-col items-center">
        <p className="text-h4">예정된 팬미팅</p>
        <button
          onClick={goCreateFanmeeting}
          type="button"
          className="creator-btn-lg my-5 px-10"
        >
          새로운 팬미팅 생성하기
        </button>
        <MyFanmeetingPreList userId={userId} />
      </div>
      <div className="my-10 w-4/5 bg-white p-10 rounded-[25px] flex flex-col items-center">
        <p className="text-h4">종료된 팬미팅</p>
        <div className="flex w-full justify-end">
          <button
            type="button"
            onClick={orderRecent}
            className={isRecent ? "text-secondary" : "text-gray-900"}
          >
            최신순
          </button>
          &nbsp;&nbsp;| &nbsp;&nbsp;
          <button
            type="button"
            onClick={orderPast}
            className={!isRecent ? "text-secondary" : "text-gray-900"}
          >
            오래된순
          </button>
        </div>
        <MyFanmeetingDoneList isRecent={isRecent} userId={userId} />
      </div>
    </div>
  );
}

export default MyFanmeeting;
