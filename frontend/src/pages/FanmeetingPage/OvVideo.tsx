/* eslint-disable jsx-a11y/media-has-caption */

import React, { useRef, useEffect, useState } from "react";

interface OpenViduVideoComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  streamManager: any;
  userName: string;
  isPhotoTime: boolean;
}

// 비디오 객체를 반환하는 오픈비두 비디오 컴포넌트
const OpenViduVideoComponent: React.FC<OpenViduVideoComponentProps> = ({
  streamManager,
  userName,
  isPhotoTime,
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

  if (isPhotoTime) {
    return (
      <div className="rounded-xl overflow-hidden">
        <video
          autoPlay
          ref={videoRef}
          id={`openvidu-video-${userName}`}
          className="object-contain w-full h-full"
          hidden={!isCameraOn && userName !== "##"} // 카메라가 꺼져있으면 hidden 속성을 true로 설정
        />
      </div>
    );
  }

  return (
    <div
      className={`${
        userName !== "##" ? "rounded-full w-[156px] h-[156px]" : "rounded-xl"
      } overflow-hidden`}
    >
      <video
        autoPlay
        ref={videoRef}
        id={`openvidu-video-${userName}`}
        className="object-cover w-full h-full transform -scale-x-100"
        hidden={!isCameraOn && userName !== "##"} // 카메라가 꺼져있으면 hidden 속성을 true로 설정
      />
    </div>
  );
};

export default OpenViduVideoComponent;
