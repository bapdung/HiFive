import React, { FormEvent } from "react";

interface JoinFormProps {
  myUserName: string;
  mySessionId: string;
  isCreator: boolean | undefined;
  // setIsCreator: (isCreator: boolean) => void;
  joinSession: (e: FormEvent<HTMLFormElement>) => void;
}

const JoinForm: React.FC<JoinFormProps> = ({
  myUserName,
  mySessionId,
  isCreator,
  // setIsCreator,
  joinSession,
}) => (
  <div id="join">
    <div id="join-dialog" className="jumbotron vertical-center">
      <h1 className="text-h4"> 팬미팅 시작 화면 </h1>
      <form className="form-group" onSubmit={joinSession}>
        <p>참가자: {myUserName}</p>
        <p>세션: {mySessionId}</p>
        {isCreator ? "당신은 크리에이터입니다" : "당신은 팬입니다"}
        <div className="text-center">
          <input
            className="btn btn-lg btn-success"
            name="commit"
            type="submit"
            value="JOIN"
          />
        </div>
      </form>
    </div>
  </div>
);

export default JoinForm;
