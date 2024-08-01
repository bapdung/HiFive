import Carousel from "./MainPage.Carousel";

function TicketList() {
  return (
    <div className="w-[1524px] flex flex-col h-[755px] bg-gray-100 rounded-3xl py-8 items-center overflow-hidden">
      <span className="text-h4 text-gray-900 mb-8">이름님이 예매한 티켓</span>
      <Carousel />
    </div>
  );
}

export default TicketList;
