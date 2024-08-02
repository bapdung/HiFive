// import { Route, Routes, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

import TicketList from "./MainPage.TicketList";
import FollowingList from "./MainPage.FollowingList";
import TicketingShortcut from "./MainPage.TicketingShortcut";
import MylistShortcut from "./MainPage.MylistShortcut";

function MainPage() {
  return (
    <div className=" flex flex-col items-center w-[1900px]">
      <span className="text-h2 text-gray-900 font-bold my-10">
        하이파이브 한 번 해요, <span className="text-primary-text">이름</span>
        님!
      </span>
      <TicketList />
      <FollowingList />
      <div className="flex w-[1272px] justify-between items-center mb-10">
        <TicketingShortcut />
        <MylistShortcut />
      </div>
    </div>
  );
}

export default MainPage;
