import { useEffect, useState, useRef } from "react";
import { Publisher, Subscriber, Session } from "openvidu-browser";
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
  session: Session | undefined;
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
  session,
}) => {
  const [randomFan, setRandomFan] = useState<Subscriber | null>(null);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [photoSequence, setPhotoSequence] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [showShootButton, setShowShootButton] = useState(true); // 촬영 시작 버튼
  const [showShutterMessage, setShowShutterMessage] = useState(false); // "찰칵!" 문구 상태
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const shutterMessageRef = useRef<NodeJS.Timeout | null>(null);
  const [isPhotoTimeEnd, setIsPhotoTimeEnd] = useState(false);

  const stopPhotoApi = async () => {
    console.log(token);
    console.log(recordId, "recordid");
    if (token && recordId) {
      try {
        const response = await client(token).post(`/api/sessions/record/stop`, {
          recordId,
          sequence: photoSequence,
        });
        console.log("녹화 중지", response.data.recordId);
      } catch (error) {
        console.error("녹화중지 : ", error);
      }
    }
  };

  const startTimer = () => {
    setShowShootButton(false);
    setTimer(5);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (shutterMessageRef.current) {
      clearTimeout(shutterMessageRef.current);
    }
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer !== null && prevTimer > 0) {
          return prevTimer - 1;
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setShowShutterMessage(true);
        shutterMessageRef.current = setTimeout(() => {
          setShowShutterMessage(false);
          setShowShootButton(true);
          stopPhotoApi();
        }, 1500);
        return null;
      });
    }, 1000);
  };

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
    console.log("토큰", token);
    console.log("세션아이디", mySessionId);
    if (token && mySessionId) {
      const response = await client(token).post(`/api/sessions/record`, {
        fanmeetingId: mySessionId,
      });
      console.log("녹화성공", response.data.recordId);
      setRecordId(response.data.recordId);
    }
    // 임시로 바깥에 빼놓기
    startTimer();
    if (isCreator && session) {
      const nextseq = photoSequence + 1;
      session.signal({
        type: "nextPhoto",
        data: JSON.stringify({ sequence: nextseq }),
      });
      session.signal({
        type: "startPhotoTimer",
        data: JSON.stringify({}),
      });
    }
  };
  const stopPhoto = async () => {
    setIsPhotoTimeEnd(true);
    if (isCreator && session) {
      session.signal({
        type: "endPhoto",
        data: JSON.stringify({}),
      });
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (session) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleStartTimerSignal = (event: any) => {
        if (event.data) {
          startTimer();
        }
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handlePhotoSignal = (event: any) => {
        if (event.data) {
          const data = JSON.parse(event.data);
          setPhotoSequence(data.sequence);
        }
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handlePhotoTimeEndSignal = (event: any) => {
        if (event.data) {
          setIsPhotoTimeEnd(true);
        }
      };

      session.on("signal:startPhotoTimer", handleStartTimerSignal);
      session.on("signal:nextPhoto", handlePhotoSignal);
      session.on("signal:endPhoto", handlePhotoTimeEndSignal);

      return () => {
        session.off("signal:startPhotoTimer", handleStartTimerSignal);
        session.off("signal:nextPhoto", handlePhotoSignal);
        session.off("signal:endPhoto", handlePhotoTimeEndSignal);
      };
    }
  });

  return (
    <div className="photo-time-container z-10">
      {/* 현재 몇번째 사진 찍는중인지 보여주기 */}
      {photoSequence > 0 && !isPhotoTimeEnd && <p>{photoSequence}/4</p>}
      {isPhotoTimeEnd && <p>포토 타임이 끝났습니다!</p>}
      {timer && <p>{timer}</p>}
      {showShutterMessage && <p>찰칵!</p>}
      {isCreator ? (
        <div className="w-[852px] h-[409px] flex flex-col items-center p-2 bg-meetingroom-100 rounded-2xl">
          <div className="flex gap-2">
            {publisher && (
              <div className="w-[412px]">
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
              <div className="w-[412px]">
                <UserVideoComponent
                  streamManager={randomFan}
                  userAnswers={userAnswers}
                  isQuizTime={isQuizTime}
                  currentQuiz={currentQuiz}
                  isReveal={isReveal}
                  rank={null}
                  isPhotoTime={!isPhotoTimeEnd ?? false}
                />
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4">
            {showShootButton && !isPhotoTimeEnd && photoSequence === 0 && (
              <button
                type="button"
                onClick={startPhoto}
                className="meetingroom-btn-lg"
              >
                촬영 시작
              </button>
            )}
            {!isPhotoTimeEnd && (
              <button type="button" onClick={stopPhotoApi}>
                한컷 중지
              </button>
            )}
            {showShootButton &&
              !isPhotoTimeEnd &&
              photoSequence > 0 &&
              photoSequence < 4 && (
                <button type="button" onClick={startPhoto}>
                  다음 사진
                </button>
              )}
            {photoSequence >= 4 && !isPhotoTimeEnd && !timer && (
              <button type="button" onClick={stopPhoto}>
                촬영 마무리
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* 읿반사용자들이 보는 화면 */}
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
                isPhotoTime={!isPhotoTimeEnd ?? false}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoTime;
