import FanmeetingInfo from "../../components/FanmeetingInfo";

function Fanmeeting() {
  return (
    <>
      <div className="flex justify-center mb-[30px]">
        <span className="text-primary-text text-h5 mr-5">예정된 팬미팅</span>
        <span className="text-h5">종료된 팬미팅</span>
      </div>
      <div className="flex w-full justify-between">
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
      </div>
    </>
  );
}

export default Fanmeeting;
