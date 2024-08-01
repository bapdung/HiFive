import Ticketing from "../../assets/icons/ticketing.png";

function TicketingShortcut() {
  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-3xl gap-5 w-[610px] h-[200px] shadow-lg">
      <img src={Ticketing} alt="Ticketing" />
      <span className="text-h4 font-semibold text-gray-900">
        예매 가능한 미팅 찾아보기
      </span>
    </div>
  );
}

export default TicketingShortcut;
