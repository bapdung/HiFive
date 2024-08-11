import ReactPlayer from "react-player/youtube";

const WaitingVideo: React.FC = () => {
  const videoUrl = "https://youtu.be/R_RAWjqdgTs?si=rCyikrDHdm7FwDdE";

  return (
    <div className="p-[1rem] bg-white rounded-[20px]">
      <div id="waiting-video-container" className="rounded-[20px]">
        <ReactPlayer url={videoUrl} />
      </div>
    </div>
  );
};

export default WaitingVideo;
