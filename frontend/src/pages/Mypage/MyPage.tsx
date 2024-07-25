import Sidebar from "./MyPage.Sidebar";
// import Reservation from "./MyPage.Reservation";
// import MyInfo from "./MyPage.MyInfo";
// import Gallery from "./MyPage.Gallery";
import IdCard from "./MyPage.IdCard";

function Mypage() {
  return (
    <>
      <Sidebar />
      <div className="w-5/6 ml-72 mt-10 bg-white rounded-3xl flex flex-col items-center shadow-mypage-shadow">
        {/* <Reservation /> */}
        {/* <MyInfo /> */}
        {/* <Gallery /> */}
        <IdCard />
      </div>
    </>
  );
}

export default Mypage;
