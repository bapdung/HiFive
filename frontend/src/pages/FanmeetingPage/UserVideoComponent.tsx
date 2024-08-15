import OpenViduVideoComponent from "./OvVideo";

interface Quiz {
  problem: string;
  answer: boolean;
  totalQuizCount: number;
  detail: string;
}

interface UserVideoComponentProps {
  currentQuiz: Quiz | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  streamManager: any; // 비디오 스트림을 관리하는 객체
  userAnswers: { [key: string]: boolean };
  isQuizTime: boolean;
  isReveal: boolean;
  rank: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isPhotoTime?: any;
}

const UserVideoComponent: React.FC<UserVideoComponentProps> = ({
  streamManager,
  userAnswers,
  isQuizTime,
  currentQuiz,
  isReveal,
  rank,
  isPhotoTime,
}) => {
  const userId = streamManager.stream.connection.connectionId;
  const userName = JSON.parse(streamManager.stream.connection.data).clientData;

  // const getNicknameTag = () => userName || "Unknown";

  const isWrong =
    isQuizTime && currentQuiz && userAnswers[userId] !== currentQuiz.answer;

  return (
    <div className="z-10">
      {streamManager && (
        <div className="streamcomponent">
          {isQuizTime && rank && (
            <p className="absolute bg-vivid-gradient border-4 text-white border-white font-bold text-[20px] rounded-full p-2 px-3 z-40 shadow-xl">
              {rank}등
            </p>
          )}
          <OpenViduVideoComponent
            streamManager={streamManager}
            userName={userName}
            isPhotoTime={isPhotoTime}
          />
          <div className={`${rank ? "hidden" : ""}`}>
            {userAnswers[userId] != null && (
              <p className="absolute bottom-0 left-14 bg-white p-2 bg-opacity-90 shadow-lg font-bold rounded-md text-h2 leading-none text-meetingroom-800">
                {/* eslint-disable-next-line no-nested-ternary */}
                {userName === "##" ? null : userAnswers[userId] ? "O" : "X"}
              </p>
            )}
            {isWrong && isReveal && userName !== "##" && (
              <p className="absolute top-0 left-10 bg-white p-2 bg-opacity-90 shadow-lg font-bold rounded-md text-red">
                틀렸어요.
              </p>
            )}
            {!isWrong && isReveal && userName !== "##" && (
              <p className="absolute top-0 left-10 bg-white p-2 bg-opacity-90 shadow-lg font-bold rounded-md text-green">
                맞았어요!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserVideoComponent;
