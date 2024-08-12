import React, { useRef, useEffect } from "react";

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
  // console.log(videoRef, "비디오ref");
  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      autoPlay
      ref={videoRef}
      id={`openvidu-video-${userName}`}
      className="rounded-xl"
    />
  );
};

export default OpenViduVideoComponent;
