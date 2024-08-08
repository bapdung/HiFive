import React from "react";
import { Publisher, Subscriber } from "openvidu-browser";
import UserVideoComponent from "./UserVideoComponent";

interface VideoContainerProps {
  publisher: Publisher | undefined;
  subscribers: Subscriber[];
  isCreator: boolean;
  toggleFanAudio: (subscriber: Subscriber) => void;
  fanAudioStatus: { [key: string]: boolean };
  focusedSubscriber: string | null;
  focusOnSubscriber: (subscriber: Subscriber) => void;
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  publisher,
  subscribers,
  isCreator,
  toggleFanAudio,
  fanAudioStatus,
  focusedSubscriber,
  focusOnSubscriber,
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
        {focusedSubscriber &&
          subscribers
            .filter(
              (sub) => sub.stream.connection.connectionId === focusedSubscriber,
            )
            .map((sub) => (
              <div key={sub.id} className="stream-container col-md-12">
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
        {publisher && (
          <div className="stream-container col-md-12">
            <UserVideoComponent streamManager={publisher} />
            <div>
              <span>
                {fanAudioStatus[publisher.stream.connection.connectionId]
                  ? "Mic ON"
                  : "Mic OFF"}
              </span>
            </div>
          </div>
        )}
      </>
    )}
    {isCreator && (
      <>
        {publisher && (
          <div className="stream-container col-md-12">
            <UserVideoComponent streamManager={publisher} />
            <div>
              <span>
                My Mic:{" "}
                {fanAudioStatus[publisher.stream.connection.connectionId]
                  ? "Mic ON"
                  : "Mic OFF"}
              </span>
            </div>
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
                <button onClick={() => focusOnSubscriber(sub)} type="button">
                  {focusedSubscriber === sub.stream.connection.connectionId
                    ? "Show All"
                    : "Show Only Me"}
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
