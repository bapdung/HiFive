import React, { FormEvent } from "react";
import joinImg from "../../assets/Fanmeeting/joinImg.png";

interface JoinFormProps {
  myUserName: string;
  mySessionId: string;
  isCreator: boolean | undefined;
  setIsCreator: (isCreator: boolean) => void;
  joinSession: (e: FormEvent<HTMLFormElement>) => void;
  fanmeetingName: string | null;
  creatorName: string | null;
}

const JoinForm: React.FC<JoinFormProps> = ({
  myUserName,
  mySessionId,
  isCreator,
  setIsCreator,
  joinSession,
  fanmeetingName,
  creatorName,
}) => {
  const handleSetFan = () => {
    setIsCreator(false);
  };
  return (
    <div
      id="join"
      className="flex w-full flex-col items-center bg-meetingroom-800 min-h-[800px] pt-20 relative"
    >
      <div id="text-div" className="absolute left-0 hidden">
        <p className="text-white">테스트 공간 (나중에 지울거임)</p>
        <p className="text-white">참가자: {myUserName}</p>
        <p className="text-white">세션: {mySessionId}</p>
        {isCreator ? (
          <p className="text-white">당신은 크리에이터입니다</p>
        ) : (
          <p className="text-white">당신은 팬입니다</p>
        )}
        {isCreator && (
          <button
            type="button"
            onClick={handleSetFan}
            className="creator-btn-outline-md my-3"
          >
            팬으로 접속하기
          </button>
        )}
      </div>
      <div id="join-dialog" className="flex flex-col items-center">
        <h1 className="text-h2 text-center text-meetingroom-100 font-semibold">
          {fanmeetingName}
        </h1>
        <img src={joinImg} alt="join-img" className="w-1/2 mt-2 mb-5" />
        <h2 className="text-large text-meetingroom-100">
          <span className="text-h6 text-meetingroom-800 btn-md bg-meetingroom-100 mr-1">
            {creatorName}
          </span>{" "}
          님의 팬미팅에 오신 것을 환영합니다 !
        </h2>
        <form
          className="w-full form-group flex flex-col items-center"
          onSubmit={joinSession}
        >
          <input
            className="btn btn-lg w-1/3 mt-8 bg-meetingroom-300 text-meetingroom-800 hover:cursor-pointer hover:bg-meetingroom-400 hover:text-meetingroom-100"
            name="commit"
            type="submit"
            value="입장하기"
          />
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
