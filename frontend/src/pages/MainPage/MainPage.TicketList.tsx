import TicketCarousel from "./MainPage.TicketCarousel";

function TicketList() {
  return (
    <div className="w-[1900px] flex flex-col h-[755px] bg-gray-700 rounded-3xl py-8 items-center overflow-hidden">
      <span className="text-h4 text-[#FFFFFF] mb-8">이름님이 예매한 티켓</span>
      <TicketCarousel />
    </div>
  );
}

export default TicketList;
