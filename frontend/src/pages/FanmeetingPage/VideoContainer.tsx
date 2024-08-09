import { Publisher, Subscriber } from "openvidu-browser";
import UserVideoComponent from "./UserVideoComponent";
// import MainBackground from "../../assets/Fanmeeting/mainBackground.png";
// import CreatorMainBackground from "../../assets/Fanmeeting/creatorMainBackground.png";
import yellow from "../../assets/Fanmeeting/yellow.png";
// import micOn from "../../assets/Fanmeeting/micOn.svg";
// import micOff from "../../assets/Fanmeeting/micOff.svg";

interface VideoContainerProps {
  publisher: Publisher | undefined; // 현재 세션의 발행자 (스트림 발행자)
  subscribers: Subscriber[]; // 현재 세션의 구독자 (다른 사용자의 스트림)
  isCreator: boolean | undefined; // 사용자가 세션의 생성자인지 여부
  toggleFanAudio: (subscriber: Subscriber) => void; // 특정 구독자의 오디오를 토글하는 함수
  fanAudioStatus: { [key: string]: boolean }; // 각 구독자의 오디오 상태 (켜짐/꺼짐)
  focusedSubscriber: string | null; // 집중 모드에서 포커스된 구독자의 connectionId
  focusOnSubscriber: (subscriber: Subscriber) => void; // 특정 구독자에게 포커스를 맞추는 함수
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  publisher,
  subscribers,
  isCreator,
  toggleFanAudio,
  fanAudioStatus,
  focusedSubscriber,
  focusOnSubscriber,
}) => {
  const creatorSub = subscribers.find(
    (sub) => JSON.parse(sub.stream.connection.data).clientData === "creator",
  );
  return (
    <div id="video-container" className="w-full relative h-full">
      {/* 크리에이터가 아닐 때 */}
      {!isCreator && (
        <>
          {/* <img src={MainBackground} alt="fan-bg" className="w-full z-50" /> */}
          {/* 'creator'라는 clientData를 가진 스트림을 찾음 */}
          {creatorSub && (
            <div
              key={creatorSub.id}
              className=" w-[38%] top-[11vh] left-[30%] z-60"
            >
              {/* UserVideoComponent 컴포넌트에 스트림 전달 */}
              <UserVideoComponent streamManager={creatorSub} />
            </div>
          )}
          {/* 포커스된 구독자가 있을 때 해당 스트림을 표시 */}
          {focusedSubscriber &&
            subscribers
              .filter(
                (sub) =>
                  sub.stream.connection.connectionId === focusedSubscriber,
              )
              .map((sub) => (
                <div
                  key={sub.id}
                  className="bg-[#FDD1AE] w-[18%]  rounded-xl p-2 flex flex-col items-center top-[11vh] left-[21vh] z-60"
                >
                  <div>
                    <UserVideoComponent streamManager={sub} />
                  </div>
                  <div className="bg-white rounded-full my-3">
                    <img src={yellow} alt="img" />
                  </div>
                </div>
              ))}
          {/* 본인(publisher)화면 표시 */}
          {publisher && !focusedSubscriber && (
            <div className="bg-[#FDD1AE] w-[18%] rounded-xl p-2 flex flex-col items-center">
              <div className="stream-container col-md-12">
                <UserVideoComponent streamManager={publisher} />
              </div>
              <div className="bg-white rounded-full my-3 relative">
                <img src={yellow} alt="img" />
              </div>
              {/* 어차피 나중에 버튼으로 넣을거임 */}
              <span className=" bottom-3 left-3">
                {fanAudioStatus[publisher.stream.connection.connectionId]
                  ? "마이크 ON"
                  : "음소거중"}
              </span>
            </div>
          )}
        </>
      )}
      {/* 크리에이터일 때 */}
      {isCreator && (
        <>
          {/* <img
            src={CreatorMainBackground}
            alt="creator-bg"
            className="w-full z-0"
          /> */}
          {publisher && (
            <div className="z-60 bottom-5 right-20 max-w-[350px]">
              <UserVideoComponent streamManager={publisher} />
              <div>
                {/* 자신의 마이크 상태 표시 */}
                <span>
                  My Mic:{" "}
                  {fanAudioStatus[publisher.stream.connection.connectionId]
                    ? "Mic ON"
                    : "Mic OFF"}
                </span>
              </div>
            </div>
          )}

          {/* 모든 구독자 스트림을 표시 */}
          {subscribers.map((sub) => {
            const { clientData } = JSON.parse(sub.stream.connection.data);
            return (
              <div key={sub.id} className="stream-container col-md-6 col-xs-6">
                <UserVideoComponent streamManager={sub} />
                <div>
                  <span>{clientData}</span> {/* 구독자의 clientData 표시 */}
                  <span>
                    {/* 구독자의 마이크 상태 표시 */}
                    {fanAudioStatus[sub.stream.connection.connectionId]
                      ? "Mic ON"
                      : "Mic OFF"}
                  </span>
                  <button onClick={() => toggleFanAudio(sub)} type="button">
                    {/* 구독자의 오디오를 토글하는 버튼 */}
                    {fanAudioStatus[sub.stream.connection.connectionId]
                      ? "Mute"
                      : "Unmute"}
                  </button>
                  {/* 특정 팬에게 포커스를 맞추거나 해제하는 버튼 */}
                  <button onClick={() => focusOnSubscriber(sub)} type="button">
                    {focusedSubscriber === sub.stream.connection.connectionId
                      ? "되돌리기"
                      : "보여주기"}
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default VideoContainer;
