// import { Route, Routes, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

import TicketList from "./MainPage.TicketList";

function MainPage() {
  return (
    <div className=" flex flex-col items-center">
      <span className="text-h2 text-gray-900 font-bold my-10">
        하이파이브 한 번 해요, <span className="text-primary-text">이름</span>
        님!
      </span>
      <TicketList />
    </div>
  );
}

export default MainPage;
