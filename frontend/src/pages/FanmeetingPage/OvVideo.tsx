import React, { useRef, useEffect, useState } from "react";

interface OpenViduVideoComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  streamManager: any;
  userName: string;
}

// 비디오 객체를 반환하는 오픈비두 비디오 컴포넌트
const OpenViduVideoComponent: React.FC<OpenViduVideoComponentProps> = ({
  streamManager,
  userName,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);

      const videoElement = videoRef.current;
      const handleVideoElementEvent = () => {
        setIsCameraOn(videoElement.readyState >= 2);
      };

      videoElement.addEventListener("loadeddata", handleVideoElementEvent);
      videoElement.addEventListener("emptied", handleVideoElementEvent);

      return () => {
        videoElement.removeEventListener("loadeddata", handleVideoElementEvent);
        videoElement.removeEventListener("emptied", handleVideoElementEvent);
      };
    }
  }, [streamManager]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleStreamPropertyChanged = (event: any) => {
      if (event.changedProperty === "videoActive") {
        setIsCameraOn(event.newValue);
      }
    };

    if (streamManager) {
      streamManager.on("streamPropertyChanged", handleStreamPropertyChanged);
    }

    return () => {
      if (streamManager) {
        streamManager.off("streamPropertyChanged", handleStreamPropertyChanged);
      }
    };
  }, [streamManager]);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      autoPlay
      ref={videoRef}
      id={`openvidu-video-${userName}`}
      className={`rounded-xl ${userName !== "##" ? "rounded-full w-[200px] h-[200px]" : ""}`}
      hidden={!isCameraOn && userName !== "##"} // 카메라가 꺼져있으면 hidden 속성을 true로 설정
    />
  );
};

export default OpenViduVideoComponent;
