import OpenViduVideoComponent from "./OvVideo";

interface UserVideoComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  streamManager: any; // 비디오 스트림을 관리하는 객체
}

const UserVideoComponent: React.FC<UserVideoComponentProps> = ({
  streamManager,
}) => {
  const getNicknameTag = (): string =>
    // Gets the nickName of the user
    JSON.parse(streamManager.stream.connection.data).clientData;
  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
          <div>
            <p className="text-center text-gray-900 text-small m-1">
              {getNicknameTag() === "creator" ? null : getNicknameTag()}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
