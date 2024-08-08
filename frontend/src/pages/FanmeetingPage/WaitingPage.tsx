import BackGround from "../../assets/Fanmeeting/waitingBackground.png";

const WaitingPage: React.FC = () => {
  const message = "Loading...";
  return (
    <div className="bg-white flex flex-col justify-center items-center w-full relative">
      <img src={BackGround} alt="background-img" className="w-full" />
      <div></div>
      <p className="absolute">{message}</p>
    </div>
  );
};

export default WaitingPage;
