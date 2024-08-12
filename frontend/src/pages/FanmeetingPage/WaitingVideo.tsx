import ReactPlayer from "react-player/youtube";

interface WaitingVideoProps {
  waitingUrl: string | null;
}

const WaitingVideo: React.FC<WaitingVideoProps> = ({ waitingUrl }) => {
  console.log(waitingUrl);

  return (
    <div className="p-[1rem] bg-white rounded-[20px]">
      <div id="waiting-video-container" className="rounded-[20px]">
        <ReactPlayer url={waitingUrl || ""} />
      </div>
    </div>
  );
};

export default WaitingVideo;
