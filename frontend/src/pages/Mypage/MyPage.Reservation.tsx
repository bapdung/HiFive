import FanmeetingInfo from "../../components/FanmeetingInfo";

function Reservation() {
  return (
    <>
      <div className="mt-6">
        <span className="text-primary-text pr-5 mr-5 border-r-2 border-gray-700 text-h4">
          예정 팬미팅
        </span>
        <span className="text-h4">지난 팬미팅</span>
      </div>
      <div className="flex w-full justify-end mr-28 mt-6">
        <span className="mr-2.5 text-primary-text text-medium">최신순</span>
        <span className="text-medium">과거순</span>
      </div>
      <div className="mt-6 flex flex-wrap px-10 box-border justify-start gap-8">
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
      </div>
    </>
  );
}

export default Reservation;
