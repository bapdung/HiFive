import OpenViduVideoComponent from "./OvVideo";

interface UserVideoComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  streamManager: any; // 비디오 스트림을 관리하는 객체
  userAnswers: { [key: string]: boolean };
  isQuizTime: boolean;
}

const UserVideoComponent: React.FC<UserVideoComponentProps> = ({
  streamManager,
  userAnswers,
  isQuizTime,
}) => {
  const getNicknameTag = (): string =>
    // Gets the nickName of the user
    JSON.parse(streamManager.stream.connection.data).clientData;
  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent
            streamManager={streamManager}
            userName={
              JSON.parse(streamManager.stream.connection.data).clientData
            }
          />
          <div>
            {streamManager !== undefined ? (
              <div className="streamcomponent">
                <OpenViduVideoComponent
                  streamManager={streamManager}
                  userName={
                    JSON.parse(streamManager.stream.connection.data).clientData
                  }
                />
                <div>
                  {isQuizTime &&
                    userAnswers &&
                    (userAnswers[
                      streamManager.stream.connection.connectionId
                    ] != null ? (
                      <p>
                        {getNicknameTag()} 님이 선택한 답 :{" "}
                        {userAnswers[
                          streamManager.stream.connection.connectionId
                        ]
                          ? "O"
                          : "X"}
                      </p>
                    ) : null)}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
