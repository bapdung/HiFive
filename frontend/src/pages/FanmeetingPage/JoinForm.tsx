import React, { ChangeEvent, FormEvent } from "react";

interface JoinFormProps {
  myUserName: string;
  mySessionId: string;
  isCreator: boolean | undefined;
  handleChangeUserName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSessionId: (e: ChangeEvent<HTMLInputElement>) => void;
  // setIsCreator: (isCreator: boolean) => void;
  joinSession: (e: FormEvent<HTMLFormElement>) => void;
}

const JoinForm: React.FC<JoinFormProps> = ({
  myUserName,
  mySessionId,
  isCreator,
  handleChangeUserName,
  handleChangeSessionId,
  // setIsCreator,
  joinSession,
}) => (
  <div id="join">
    <div id="join-dialog" className="jumbotron vertical-center">
      <h1 className="text-h4"> 팬미팅 시작 화면 </h1>
      <form className="form-group" onSubmit={joinSession}>
        <p>
          <p>참가자: </p>
          <input
            className="form-control"
            type="text"
            id="userName"
            value={myUserName}
            onChange={handleChangeUserName}
            required
          />
        </p>
        <p>
          <p>세션: </p>
          <input
            className="form-control"
            type="text"
            id="sessionId"
            value={mySessionId}
            onChange={handleChangeSessionId}
            required
          />
        </p>
        {isCreator ? "당신은 크리에이터입니다" : "당신은 팬입니다"}
        <p className="text-center">
          <input
            className="btn btn-lg btn-success"
            name="commit"
            type="submit"
            value="JOIN"
          />
        </p>
      </form>
    </div>
  </div>
);

export default JoinForm;
