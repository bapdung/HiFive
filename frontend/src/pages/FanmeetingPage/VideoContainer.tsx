import { Publisher, Subscriber } from "openvidu-browser";
import { useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
// import MainBackground from "../../assets/Fanmeeting/mainBackground.png";
// import CreatorMainBackground from "../../assets/Fanmeeting/creatorMainBackground.png";
// import micOn from "../../assets/Fanmeeting/micOn.svg";
// import micOff from "../../assets/Fanmeeting/micOff.svg";

interface Timetable {
  categoryName: string;
  sequence: number;
  detail: string;
}

interface Quiz {
  problem: string;
  answer: boolean;
  totalQuizCount: number;
  detail: string;
}

interface VideoContainerProps {
  publisher: Publisher | undefined; // 현재 세션의 발행자 (스트림 발행자)
  subscribers: Subscriber[]; // 현재 세션의 구독자 (다른 사용자의 스트림)
  isCreator: boolean | undefined; // 사용자가 세션의 생성자인지 여부
  toggleFanAudio: (subscriber: Subscriber) => void; // 특정 구독자의 오디오를 토글하는 함수
  fanAudioStatus: { [key: string]: boolean }; // 각 구독자의 오디오 상태 (켜짐/꺼짐)
  focusedSubscriber: string | null; // 집중 모드에서 포커스된 구독자의 connectionId
  focusOnSubscriber: (subscriber: Subscriber) => void; // 특정 구독자에게 포커스를 맞추는 함수
  userAnswers: { [key: string]: boolean };
  currentSequence: number;
  timetables: Timetable[];
  currentQuiz: Quiz | null;
  isReveal: boolean;
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  publisher,
  subscribers,
  isCreator,
  toggleFanAudio,
  fanAudioStatus,
  focusedSubscriber,
  focusOnSubscriber,
  userAnswers,
  currentSequence,
  timetables,
  currentQuiz,
  isReveal,
}) => {
  const [isQuizTime, setIsQuizTime] = useState(false);
  useEffect(() => {
    if (timetables[currentSequence - 1]?.categoryName === "O/X게임") {
      setIsQuizTime(true);
    } else {
      setIsQuizTime(false);
    }
  }, [timetables, currentSequence]);

  // console.log(subscribers, "구독자@#@@@@@@@@@@@@@@");
  const creatorSub = subscribers.find(
    (sub) => JSON.parse(sub.stream.connection.data).clientData === "##",
  );
  // console.log(publisher, "자기자신@@@@@@@@@@@@@");
  // console.log(creatorSub, "크리에이터@#@@@");

  return (
    <div id="video-container" className="w-full relative h-full">
      {/* 크리에이터 스트림을 찾음 */}
      {creatorSub && (
        <div
          key={JSON.parse(creatorSub.stream.connection.data).clientData}
          className="p-5 bg-emerald-500"
        >
          {/* UserVideoComponent 컴포넌트에 스트림 전달 */}
          <UserVideoComponent
            streamManager={creatorSub}
            userAnswers={userAnswers}
            isQuizTime={isQuizTime}
            currentQuiz={currentQuiz}
            isReveal={isReveal}
          />
        </div>
      )}

      {isCreator && publisher && (
        <div className="p-5 bg-emerald-500">
          <UserVideoComponent
            streamManager={publisher}
            userAnswers={userAnswers}
            isQuizTime={isQuizTime}
            currentQuiz={currentQuiz}
            isReveal={isReveal}
          />
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

      {/* 포커스된 구독자가 있을 때 해당 스트림을 표시 */}
      {focusedSubscriber &&
        (subscribers.find(
          (sub) => sub.stream.connection.connectionId === focusedSubscriber,
        )
          ? subscribers
              .filter(
                (sub) =>
                  sub.stream.connection.connectionId === focusedSubscriber,
              )
              .map((sub) => (
                <div
                  key={sub.stream.connection.connectionId}
                  className="bg-[#FDD1AE] p-4"
                >
                  <div>
                    <UserVideoComponent
                      streamManager={sub}
                      userAnswers={userAnswers}
                      isQuizTime={isQuizTime}
                      currentQuiz={currentQuiz}
                      isReveal={isReveal}
                    />
                  </div>
                </div>
              ))
          : publisher &&
            publisher.stream.connection.connectionId === focusedSubscriber && (
              <div
                key={publisher.stream.connection.connectionId}
                className="bg-[#FDD1AE] p-4"
              >
                <div>
                  <UserVideoComponent
                    streamManager={publisher}
                    userAnswers={userAnswers}
                    isQuizTime={isQuizTime}
                    currentQuiz={currentQuiz}
                    isReveal={isReveal}
                  />
                </div>
              </div>
            ))}

      {/* 자신의 스트림 표시 */}
      {!isCreator && publisher && (
        <div className="p-5 bg-primary-300">
          <UserVideoComponent
            streamManager={publisher}
            userAnswers={userAnswers}
            isQuizTime={isQuizTime}
            currentQuiz={currentQuiz}
            isReveal={isReveal}
          />
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

      {/* 모든 참여자의 스트림 표시-> 크리에이터 제외 */}
      {subscribers
        .filter((sub) => {
          const { clientData } = JSON.parse(sub.stream.connection.data);
          return clientData !== "##";
        })
        .map((sub) => {
          const { clientData, userId } = JSON.parse(sub.stream.connection.data);
          console.log(clientData, "클라이언트 이름");
          console.log(userId, "클라이언트 멤버 번호");
          return (
            <div
              key={sub.stream.connection.connectionId}
              className="stream-container col-md-6 col-xs-6"
              id={`fan-camera-component-${userId}`}
            >
              <UserVideoComponent
                streamManager={sub}
                userAnswers={userAnswers}
                isQuizTime={isQuizTime}
                currentQuiz={currentQuiz}
                isReveal={isReveal}
              />
              <div>
                <span>{clientData}</span> {/* 구독자의 clientData 표시 */}
                {isCreator && (
                  <span>
                    {/* 구독자의 마이크 상태 표시 */}
                    {fanAudioStatus[sub.stream.connection.connectionId]
                      ? "Mic ON"
                      : "Mic OFF"}
                  </span>
                )}
                {isCreator && (
                  <button onClick={() => toggleFanAudio(sub)} type="button">
                    {/* 구독자의 오디오를 토글하는 버튼 */}
                    {fanAudioStatus[sub.stream.connection.connectionId]
                      ? "음소거"
                      : "활성화"}
                  </button>
                )}
                {isCreator && (
                  // 특정 팬에게 포커스를 맞추거나 해제하는 버튼
                  <button onClick={() => focusOnSubscriber(sub)} type="button">
                    {focusedSubscriber === sub.stream.connection.connectionId
                      ? "되돌리기"
                      : "보여주기"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default VideoContainer;
