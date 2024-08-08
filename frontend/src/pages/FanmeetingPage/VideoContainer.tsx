import React from "react";
import { Publisher, Subscriber } from "openvidu-browser";
import UserVideoComponent from "./UserVideoComponent";

interface VideoContainerProps {
  publisher: Publisher | undefined;
  subscribers: Subscriber[];
  isCreator: boolean;
  toggleFanAudio: (subscriber: Subscriber) => void;
  fanAudioStatus: { [key: string]: boolean };
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  publisher,
  subscribers,
  isCreator,
  toggleFanAudio,
  fanAudioStatus,
}) => (
  <div id="video-container" className="col-md-12">
    {!isCreator && (
      <>
        {subscribers
          .filter(
            (sub) =>
              JSON.parse(sub.stream.connection.data).clientData === "creator",
          )
          .map((sub) => (
            <div key={sub.id} className="stream-container col-md-12">
              <UserVideoComponent streamManager={sub} />
            </div>
          ))}
        {publisher && (
          <div className="stream-container col-md-12">
            <UserVideoComponent streamManager={publisher} />
          </div>
        )}
      </>
    )}
    {isCreator && (
      <>
        {publisher && (
          <div className="stream-container col-md-12">
            <UserVideoComponent streamManager={publisher} />
          </div>
        )}
        {subscribers.map((sub) => {
          const { clientData } = JSON.parse(sub.stream.connection.data);
          return (
            <div key={sub.id} className="stream-container col-md-6 col-xs-6">
              <UserVideoComponent streamManager={sub} />
              <div>
                <span>{clientData}</span>
                <span>
                  {fanAudioStatus[sub.stream.connection.connectionId]
                    ? "Mic ON"
                    : "Mic OFF"}
                </span>
                <button onClick={() => toggleFanAudio(sub)} type="button">
                  {fanAudioStatus[sub.stream.connection.connectionId]
                    ? "Mute"
                    : "Unmute"}
                </button>
              </div>
            </div>
          );
        })}
      </>
    )}
  </div>
);

export default VideoContainer;
