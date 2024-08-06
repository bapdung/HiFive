import HeroSection from "./TicketPage.HeroSection";
import MeetingList from "./TicketPage.List";

function TicketPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <HeroSection />
      <MeetingList />
    </div>
  );
}

export default TicketPage;
