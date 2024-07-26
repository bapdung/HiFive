import { Route, Routes } from "react-router-dom";

import Sidebar from "./MyPage.Sidebar";
import Reservation from "./MyPage.Reservation";
import MyInfo from "./MyPage.MyInfo";
import Gallery from "./MyPage.Gallery";
import IdCard from "./MyPage.IdCard";
import Point from "./MyPage.Point";

function Mypage() {
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
