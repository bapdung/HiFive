import Carousel from "./MainPage.Carousel";

interface TicketListProps {
  nickname: string | null;
}

const TicketList: React.FC<TicketListProps> = ({ nickname }) => (
  <div className="w-[1524px] flex flex-col h-[755px] bg-gray-700 shadow-inner-shadow rounded-3xl py-8 mb-20 items-center overflow-hidden">
    <span className="text-h4 text-white font-semibold mb-8">
      {nickname}님이 예매한 티켓
    </span>
    <Carousel />
  </div>
);

export default TicketList;
