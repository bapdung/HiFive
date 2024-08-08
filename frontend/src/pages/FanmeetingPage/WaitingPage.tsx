import ReactPlayer from "react-player/youtube";
import BackGround from "../../assets/Fanmeeting/waitingBackground.png";

const WaitingPage: React.FC = () => {
  const videoUrl = "https://youtu.be/R_RAWjqdgTs?si=rCyikrDHdm7FwDdE";
  // const fanmeetingDate = Date.now();

  return (
    <div className="bg-white flex flex-col justify-center items-center w-full relative">
      <img src={BackGround} alt="background-img" className="w-full" />
      <div className="p-[1rem] absolute z-30 top-[10%] left-[50%] bg-white rounded-[20px]">
        <div id="waiting-video-container" className="rounded-[20px]">
          <ReactPlayer url={videoUrl} />
        </div>
      </div>
      <div>
        <p className="text-[48px] text-white absolute top-[28%] left-28 z-30 font-[jua]">
          잠시 후 팬미팅이 시작됩니다!
        </p>
      </div>
    </div>
  );
};

export default WaitingPage;
