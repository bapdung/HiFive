import FanmeetingInfo from "../../components/FanmeetingInfo";
import preIcon from "../../assets/preicon.png";
import nextIcon from "../../assets/nexticon.png";

function Fanmeeting() {
  return (
    <>
      <div className="flex justify-center mb-[30px]">
        <span className="text-primary-text text-h5 mr-5">예정된 팬미팅</span>
        <span className="text-h5">종료된 팬미팅</span>
      </div>
      <div className="flex w-full justify-between relative">
        <div className="w-[50px] h-[50px] bg-white text-h3 rounded-full flex justify-center items-center absolute left-[-30px] top-[120px]">
          <img src={preIcon} alt="이전버튼" />
        </div>
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <div className="w-[50px] h-[50px] bg-white text-h3 rounded-full flex justify-center items-center absolute right-[-30px] top-[120px]">
          <img src={nextIcon} alt="다음버튼" />
        </div>
      </div>
    </>
  );
}

export default Fanmeeting;
