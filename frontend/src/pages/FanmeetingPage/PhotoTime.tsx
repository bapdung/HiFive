import React, { useEffect, useState } from "react";
import { Publisher, Subscriber } from "openvidu-browser";
import UserVideoComponent from "./UserVideoComponent";
import client from "../../client";

interface Quiz {
  problem: string;
  answer: boolean;
  totalQuizCount: number;
  detail: string;
}

interface PhotoTimeProps {
  publisher: Publisher | undefined;
  subscribers: Subscriber[];
  isCreator: boolean | undefined;
  userAnswers: { [key: string]: boolean };
  isQuizTime: boolean;
  currentQuiz: Quiz | null;
  isReveal: boolean;
  token: string | null;
  mySessionId: string | null;
}

const PhotoTime: React.FC<PhotoTimeProps> = ({
  publisher,
  subscribers,
  isCreator,
  userAnswers,
  isQuizTime,
  currentQuiz,
  isReveal,
  token,
  mySessionId,
}) => {
  const [randomFan, setRandomFan] = useState<Subscriber | null>(null);
  const [recordId, setRecordId] = useState<string | null>(null);

  useEffect(() => {
    if (isCreator) {
      // 크리에이터인 경우 랜덤한 팬 선택
      const nonCreatorSubscribers = subscribers.filter(
        (sub) => JSON.parse(sub.stream.connection.data).clientData !== "##",
      );
      if (nonCreatorSubscribers.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * nonCreatorSubscribers.length,
        );
        setRandomFan(nonCreatorSubscribers[randomIndex]);
      }
    }
  }, [subscribers, isCreator]);

  const startPhoto = async () => {
    if (token && mySessionId) {
      const response = await client(token).post(`/api/sessions/record`, {
        fanmeetingId: mySessionId,
      });
      console.log("녹화성공", response.data.recordId);
      setRecordId(response.data.recordId);
    }
  };

  const stopPhoto = async () => {
    if (token && mySessionId && recordId) {
      const response = await client(token).post(`/api/sessions/record/stop`, {
        recordId,
      });
      console.log("녹화 중지", response.data.recordId);
    }
  };

  return (
    <div className="photo-time-container">
      {isCreator ? (
        <>
          <button type="button" onClick={startPhoto}>
            촬영시작
          </button>
          <button type="button" onClick={stopPhoto}>
            촬영중지
          </button>
          {publisher && (
            <div className="p-5 bg-emerald-500">
              <UserVideoComponent
                streamManager={publisher}
                userAnswers={userAnswers}
                isQuizTime={isQuizTime}
                currentQuiz={currentQuiz}
                isReveal={isReveal}
                rank={null}
              />
            </div>
          )}
          {randomFan && (
            <div className="p-5 bg-primary-300">
              <UserVideoComponent
                streamManager={randomFan}
                userAnswers={userAnswers}
                isQuizTime={isQuizTime}
                currentQuiz={currentQuiz}
                isReveal={isReveal}
                rank={null}
              />
            </div>
          )}
        </>
      ) : (
        <>
          {subscribers
            .filter(
              (sub) =>
                JSON.parse(sub.stream.connection.data).clientData === "##",
            )
            .map((creatorSub) => (
              <div
                key={creatorSub.stream.connection.connectionId}
                className="p-5 bg-emerald-500"
              >
                <UserVideoComponent
                  streamManager={creatorSub}
                  userAnswers={userAnswers}
                  isQuizTime={isQuizTime}
                  currentQuiz={currentQuiz}
                  isReveal={isReveal}
                  rank={null}
                />
              </div>
            ))}
          {publisher && (
            <div className="p-5 bg-primary-300">
              <UserVideoComponent
                streamManager={publisher}
                userAnswers={userAnswers}
                isQuizTime={isQuizTime}
                currentQuiz={currentQuiz}
                isReveal={isReveal}
                rank={null}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoTime;
