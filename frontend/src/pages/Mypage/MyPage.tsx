import Gallery from "./MyPage.Gallery";
// import MyInfo from "./MyPage.MyInfo";
// import Reservation from "./MyPage.Reservation";
import Sidebar from "./MyPage.Sidebar";

function Mypage() {
  return (
    <>
      <Sidebar />
      <div className="w-5/6 ml-72 mt-10 bg-white rounded-3xl flex flex-col items-center shadow-mypage-shadow">
        {/* <Reservation /> */}
        {/* <MyInfo /> */}
        <Gallery />
      </div>
    </>
  );
}

export default Mypage;
