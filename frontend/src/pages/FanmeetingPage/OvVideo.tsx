import React, { useRef, useEffect } from "react";

interface OpenViduVideoComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  streamManager: any; // Replace 'any' with the appropriate type if known
}

// 비디오 객체를 반환하는 오픈비두 비디오 컴포넌트
const OpenViduVideoComponent: React.FC<OpenViduVideoComponentProps> = ({
  streamManager,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video autoPlay ref={videoRef} className="rounded-xl" />;
};

export default OpenViduVideoComponent;
