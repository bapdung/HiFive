import WaitingVideo from "./WaitingVideo";
import BackGround from "../../assets/Fanmeeting/waitline.jpg";
import logo from "../../assets/Fanmeeting/logomeeting.png";

const WaitingPage = () => (
  <div className="bg-meetingroom-600 flex flex-col items-center w-full h-[100vh]">
    <img src={logo} alt="logo" className="w-[200px] mr-4 my-6" />
    <p className="text-h4 text-white mb-4 font-semibold">
      잠시 후 팬미팅이 시작됩니다!
    </p>
    <WaitingVideo />

    <div className="absolute bottom-0 left-0 w-full">
      <img src={BackGround} alt="background-img" className="w-full h-auto" />
    </div>
  </div>
);

export default WaitingPage;
