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
}

const UserVideoComponent: React.FC<UserVideoComponentProps> = ({
  streamManager,
  userAnswers,
  isQuizTime,
  currentQuiz,
}) => {
  const userId = streamManager.stream.connection.connectionId;
  const userName = JSON.parse(streamManager.stream.connection.data).clientData;

  const getNicknameTag = () => userName || "Unknown";

  const isWrong =
    isQuizTime && currentQuiz && userAnswers[userId] !== currentQuiz.answer;

  return (
    <div>
      {streamManager && (
        <div className="streamcomponent">
          <OpenViduVideoComponent
            streamManager={streamManager}
            userName={userName}
          />
          <div>
            {isQuizTime && userAnswers[userId] != null && (
              <p>
                {getNicknameTag()} 님이 선택한 답 :{" "}
                {userAnswers[userId] ? "O" : "X"}
              </p>
            )}
            {isWrong && <p>틀렸어</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserVideoComponent;
