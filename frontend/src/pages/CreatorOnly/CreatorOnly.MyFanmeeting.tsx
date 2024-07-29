import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyFanmeetingDoneList from "./CreatorOnly.MyFanmeetingDoneList";
import MyFanmeetingPreList from "./CreatorOnly.MyFanmeetingPreList";

function MyFanmeeting() {
  const [isRecent, setIsRecent] = useState(true);
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
        <MyFanmeetingPreList />
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
        <MyFanmeetingDoneList />
      </div>
    </div>
  );
}

export default MyFanmeeting;
