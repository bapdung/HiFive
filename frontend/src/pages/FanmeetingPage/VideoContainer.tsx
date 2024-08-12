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

  const getRankForUser = (userId: number): number | null => {
    if (!ranks) return null;
    const rankIndex = ranks.findIndex((rank) => rank.fanId === userId);
    return rankIndex !== -1 ? rankIndex + 1 : null;
  };

  if (timetables[currentSequence - 1]?.categoryName === "포토 타임") {
    return (
      <>
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
        />
      </>
    );
  }

  return (
    // 포토타임이 아닐 경우
    <div id="video-container" className="w-full relative h-full">
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
      <Chat
        chatMessages={chatMessages}
        newMessage={newMessage}
        handleChangeMessage={handleChangeMessage}
        handleSendMessage={handleSendMessage}
        userColors={userColors}
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
                  className="bg-[#FDD1AE] p-4"
                >
                  <div>
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
                    rank={null}
                  />
                </div>
              </div>
            ))}

      {!isCreator && publisher && (
        <div className="p-5 bg-primary-300">
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

      {subscribers
        .filter((sub) => {
          const { clientData } = JSON.parse(sub.stream.connection.data);
          return clientData !== "##";
        })
        .map((sub) => {
          const { clientData, userId } = JSON.parse(sub.stream.connection.data);
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
                rank={getRankForUser(userId)}
              />
              <div>
                <span>{clientData}</span>
                {isCreator && (
                  <span>
                    {fanAudioStatus[sub.stream.connection.connectionId]
                      ? "Mic ON"
                      : "Mic OFF"}
                  </span>
                )}
                {isCreator && (
                  <button onClick={() => toggleFanAudio(sub)} type="button">
                    {fanAudioStatus[sub.stream.connection.connectionId]
                      ? "음소거"
                      : "활성화"}
                  </button>
                )}
                {isCreator && (
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
