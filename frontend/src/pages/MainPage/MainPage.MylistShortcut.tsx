import { Link } from "react-router-dom";
import Mylist from "../../assets/img/sc_mymeeting.png";

function MylistShortcut() {
  return (
    <Link to="/mypage/reservation">
      <div className="flex flex-col justify-center items-center bg-white rounded-3xl gap-5 w-[580px] h-[200px] shadow-lg">
        <img src={Mylist} alt="Mylist" />
        <span className="text-h6 font-semibold text-gray-900">
          나의 팬미팅 내역 보러가기
        </span>
      </div>
    </Link>
  );
}

export default MylistShortcut;
