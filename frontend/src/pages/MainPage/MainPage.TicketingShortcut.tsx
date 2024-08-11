import { Link } from "react-router-dom";
import Ticketing from "../../assets/icons/ticketing.png";

function TicketingShortcut() {
  return (
    <Link to="/ticket">
      <div className="flex flex-col justify-center items-center bg-white rounded-3xl gap-5 w-[580px] h-[200px] shadow-lg">
        <img src={Ticketing} alt="Ticketing" />
        <span className="text-h5 font-semibold text-gray-900">
          예매 가능한 팬미팅 찾아보기
        </span>
      </div>
    </Link>
  );
}

export default TicketingShortcut;
