import Reservation from "./MyPage.Reservation";
import Sidebar from "./MyPage.Sidebar";

function Mypage() {
  return (
    <>
      <Sidebar />
      <div className="ml-72 mt-10 bg-white rounded-3xl flex flex-col items-center">
        <Reservation />
      </div>
    </>
  );
}

export default Mypage;
