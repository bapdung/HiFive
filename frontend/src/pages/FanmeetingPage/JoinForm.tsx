import React, { FormEvent } from "react";

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
    <div id="join" className="flex w-full flex-col items-center">
      <div id="join-dialog" className="flex flex-col items-center">
        <h1 className="text-h3 text-center">{fanmeetingName}</h1>
        <h2 className="text-large">
          <span>{creatorName}</span> 님의 팬미팅에 오신 것을 환영합니다 !
        </h2>
        <form className="form-group flex flex-col" onSubmit={joinSession}>
          {/* 여기는 테스트 용으로 남겨둔 구간 */}
          <div id="text-div" className="flex flex-col border-1 border-gray-500">
            <p>테스트 공간</p>
            <p>참가자: {myUserName}</p>
            <p>세션: {mySessionId}</p>
            {isCreator ? "당신은 크리에이터입니다" : "당신은 팬입니다"}
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
          <input
            className="btn btn-lg btn-success"
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
