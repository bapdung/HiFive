import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Sidebar from "./MyPage.Sidebar";
import Reservation from "./MyPage.Reservation";
import MyInfo from "./MyPage.MyInfo";
import Gallery from "./MyPage.Gallery";
import IdCard from "./MyPage.IdCard";
import Point from "./MyPage.Point";

function Mypage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/mypage") {
      navigate("/mypage/reservation");
    }
  }, [navigate]);

  return (
    <>
      <Sidebar />
      <div className="w-5/6 ml-72 mt-10 bg-white rounded-3xl flex flex-col items-center shadow-mypage-shadow">
        <Routes>
          <Route path="reservation" element={<Reservation />} />
          <Route path="my-info" element={<MyInfo />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="idcard" element={<IdCard />} />
          <Route path="point" element={<Point />} />
        </Routes>
      </div>
    </>
  );
}

export default Mypage;
