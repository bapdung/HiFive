import FanmeetingInfo from "../../components/FanmeetingInfo";
import preIcon from "../../assets/icons/preIcon.png";
import nextIcon from "../../assets/icons/nextIcon.png";

function Fanmeeting() {
  return (
    <>
      <div className="flex justify-center mb-7">
        <span className="text-primary-text text-h4 mr-5">예정된 팬미팅</span>
        <span className="text-h4">종료된 팬미팅</span>
      </div>
      <div className="flex w-full justify-between relative">
        <div className="w-12 h-12 bg-white text-h3 rounded-full flex justify-center items-center absolute left-[-30px] top-[120px]">
          <img src={preIcon} alt="이전버튼" />
        </div>
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <div className="w-12 h-12 bg-white text-h3 rounded-full flex justify-center items-center absolute right-[-30px] top-[120px]">
          <img src={nextIcon} alt="다음버튼" />
        </div>
      </div>
    </>
  );
}

export default Fanmeeting;
