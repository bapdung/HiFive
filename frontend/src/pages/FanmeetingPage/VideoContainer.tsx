import { Publisher, Subscriber, Session } from "openvidu-browser";
import { useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import PhotoTime from "./PhotoTime";
import CreatorCamera from "./CreatorCamera";
import TimeTableComponent from "./TimeTableComponent";
import StoryTime from "./StoryTime";
import QuestionTime from "./QuestionTime";
import QuizTime from "./QuizTime";
import Chat from "./Chat";
import frame1 from "../../assets/Fanmeeting/frame1.png";

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

interface Rank {
  fanId: number;
  score: number;
}
interface ChatMessage {
  isCreator: boolean;
  id: string;
  user: string;
  text: string;
}

interface VideoContainerProps {
  publisher: Publisher | undefined;
  subscribers: Subscriber[];
  isCreator: boolean | undefined;
  toggleFanAudio: (subscriber: Subscriber) => void;
  fanAudioStatus: { [key: string]: boolean };
  focusedSubscriber: string | null;
  focusOnSubscriber: (subscriber: Subscriber) => void;
  userAnswers: { [key: string]: boolean };
  currentSequence: number;
  timetables: Timetable[];
  currentQuiz: Quiz | null;
  isReveal: boolean;
  ranks: Rank[] | null;
  token: string | null;
  mySessionId: string | null;
  setCurrentSequence: (seq: number) => void;
  onSequenceChange: (newSequence: number) => void;
  session: Session | undefined;
  handleFetchQuiz: (quiz: Quiz | null) => void;
  handleReveal: (bool: boolean) => void;
  handleRank: (rank: Rank[]) => void;
  chatMessages: ChatMessage[];
  newMessage: string;
  handleChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  userColors: { [key: string]: string };
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
  ranks,
  token,
  mySessionId,
  setCurrentSequence,
  onSequenceChange,
  session,
  handleFetchQuiz,
  handleReveal,
  handleRank,
  chatMessages,
  newMessage,
  handleChangeMessage,
  handleSendMessage,
  userColors,
}) => {
  const [isQuizTime, setIsQuizTime] = useState(false);

  useEffect(() => {
    if (timetables[currentSequence - 1]?.categoryName === "O/X게임") {
      setIsQuizTime(true);
    } else {
      setIsQuizTime(false);
    }
  }, [timetables, currentSequence]);

  useEffect(() => {
    console.log("fanAudioStatus updated:", fanAudioStatus);
  }, [fanAudioStatus]);

  const getRankForUser = (userId: number): number | null => {
    if (!ranks) return null;
    const rankIndex = ranks.findIndex((rank) => rank.fanId === userId);
    return rankIndex !== -1 ? rankIndex + 1 : null;
  };

  if (timetables[currentSequence - 1]?.categoryName === "포토 타임") {
    return (
      <div className="flex">
        <div className="w-[300px] h-[409px] mr-3 bg-white rounded-2xl px-4 py-2 flex flex-col items-center">
          {/* 포토 타임일 경우 */}
          <TimeTableComponent
            token={token}
            mySessionId={mySessionId}
            timetables={timetables}
            currentSequence={currentSequence}
            isCreator={isCreator}
            setCurrentSequence={setCurrentSequence}
            onSequenceChange={onSequenceChange}
          />
        </div>
        <PhotoTime
          publisher={publisher}
          subscribers={subscribers}
          isCreator={isCreator}
          userAnswers={userAnswers}
          isQuizTime={isQuizTime}
          currentQuiz={currentQuiz}
          isReveal={isReveal}
          token={token}
          mySessionId={mySessionId}
          session={session}
        />
      </div>
    );
  }

  return (
    // 포토타임이 아닐 경우
    <div
      id="video-container"
      className="w-full relative h-full flex flex-col items-center"
    >
      <div className="flex">
        <div className="w-[300px] h-[409px] mr-3 bg-white rounded-2xl px-4 py-2 flex flex-col items-center">
          <TimeTableComponent
            token={token}
            mySessionId={mySessionId}
            timetables={timetables}
            currentSequence={currentSequence}
            isCreator={isCreator}
            setCurrentSequence={setCurrentSequence}
            onSequenceChange={onSequenceChange}
          />
          <StoryTime
            token={token}
            mySessionId={mySessionId}
            timetables={timetables}
            currentSequence={currentSequence}
            isCreator={isCreator}
            session={session}
          />
          <QuestionTime
            token={token}
            mySessionId={mySessionId}
            timetables={timetables}
            currentSequence={currentSequence}
            isCreator={isCreator}
            session={session}
          />
          <QuizTime
            token={token}
            mySessionId={mySessionId}
            timetables={timetables}
            currentSequence={currentSequence}
            isCreator={isCreator}
            session={session}
            handleFetchQuiz={handleFetchQuiz}
            handleReveal={handleReveal}
            handleRank={handleRank}
          />
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
                      className="absolute top-20 bg-white shadow-2xl rounded-xl z-20"
                    >
                      <div className="relative w-[256px] h-[256px] mt-4">
                        <img
                          src={frame1}
                          alt="frame"
                          className="w-full h-full"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <UserVideoComponent
                            streamManager={sub}
                            userAnswers={userAnswers}
                            isQuizTime={isQuizTime}
                            currentQuiz={currentQuiz}
                            isReveal={isReveal}
                            rank={null}
                          />
                        </div>
                      </div>
                    </div>
                  ))
              : publisher &&
                publisher.stream.connection.connectionId ===
                  focusedSubscriber && (
                  <div
                    key={publisher.stream.connection.connectionId}
                    className="absolute top-20 bg-white shadow-2xl rounded-xl z-20"
                  >
                    <div className="relative w-[256px] h-[256px] mt-4">
                      <img
                        src={frame1}
                        alt="frame"
                        className="w-full h-full "
                      />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <UserVideoComponent
                          streamManager={publisher}
                          userAnswers={userAnswers}
                          isQuizTime={isQuizTime}
                          currentQuiz={currentQuiz}
                          isReveal={isReveal}
                          rank={null}
                        />
                      </div>
                    </div>
                  </div>
                ))}
        </div>
        <div className="w-[540px] mr-3">
          <CreatorCamera
            publisher={publisher}
            subscribers={subscribers}
            isCreator={isCreator}
            userAnswers={userAnswers}
            isQuizTime={isQuizTime}
            currentQuiz={currentQuiz}
            isReveal={isReveal}
            fanAudioStatus={fanAudioStatus}
          />
        </div>
        <div className="w-[300px] h-[409px]">
          <Chat
            chatMessages={chatMessages}
            newMessage={newMessage}
            handleChangeMessage={handleChangeMessage}
            handleSendMessage={handleSendMessage}
            userColors={userColors}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {!isCreator && publisher && (
          <div className="relative w-[256px] h-[256px] mt-4">
            <img src={frame1} alt="frame" className="w-full h-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <UserVideoComponent
                streamManager={publisher}
                userAnswers={userAnswers}
                isQuizTime={isQuizTime}
                currentQuiz={currentQuiz}
                isReveal={isReveal}
                rank={getRankForUser(
                  JSON.parse(publisher.stream.connection.data).userId,
                )}
              />
            </div>
            <span className="absolute bottom-4 bg-meetingroom-100 bg-opacity-90 px-4 py-1 rounded-full">
              Mic {publisher.stream.audioActive ? " ON" : " OFF"}
            </span>
          </div>
        )}

        {subscribers
          .filter((sub) => {
            const { clientData } = JSON.parse(sub.stream.connection.data);
            return clientData !== "##";
          })
          .map((sub) => {
            const { clientData, userId } = JSON.parse(
              sub.stream.connection.data,
            );
            return (
              <div
                key={sub.stream.connection.connectionId}
                className="stream-container mt-4"
                id={`fan-camera-component-${userId}`}
              >
                <div className="relative w-[256px] h-[256px]">
                  <img src={frame1} alt="frame" className="w-full h-full" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <UserVideoComponent
                      streamManager={sub}
                      userAnswers={userAnswers}
                      isQuizTime={isQuizTime}
                      currentQuiz={currentQuiz}
                      isReveal={isReveal}
                      rank={getRankForUser(userId)}
                    />
                  </div>
                  <div className="absolute top-[-40px] mt-2 text-center w-full">
                    <div className="flex flex-col">
                      <div className="flex justify-center w-full">
                        <span className="text-large font-bold bg-meetingroom-100 bg-opacity-90 px-4 py-1 rounded-full">
                          {clientData}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isCreator && (
                    <div className="w-full absolute bottom-[-20px]">
                      <div className="flex justify-center">
                        <div className="inline-flex items-center text-small">
                          <span className="ml-2 bg-gray-200 pl-4 pr-3 py-2 rounded-l-full">
                            {fanAudioStatus[sub.stream.connection.connectionId]
                              ? "MIC ON"
                              : "MIC OFF"}
                          </span>
                          <button
                            onClick={() => toggleFanAudio(sub)}
                            type="button"
                            className="ml-0 bg-meetingroom-400 text-white px-3 py-2 rounded-none hover:bg-meetingroom-600"
                          >
                            {fanAudioStatus[sub.stream.connection.connectionId]
                              ? "음소거"
                              : "활성화"}
                          </button>
                          <button
                            onClick={() => focusOnSubscriber(sub)}
                            type="button"
                            className="ml-0 bg-meetingroom-400 text-white pr-4 pl-3  py-2 rounded-r-full hover:bg-meetingroom-600"
                          >
                            {focusedSubscriber ===
                            sub.stream.connection.connectionId
                              ? "돌려놓기"
                              : "데려오기"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default VideoContainer;
