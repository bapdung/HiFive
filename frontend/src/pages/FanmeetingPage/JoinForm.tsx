import React, { ChangeEvent, FormEvent } from "react";

interface JoinFormProps {
  myUserName: string;
  mySessionId: string;
  isCreator: boolean;
  handleChangeUserName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSessionId: (e: ChangeEvent<HTMLInputElement>) => void;
  setIsCreator: (isCreator: boolean) => void;
  joinSession: (e: FormEvent<HTMLFormElement>) => void;
}

const JoinForm: React.FC<JoinFormProps> = ({
  myUserName,
  mySessionId,
  isCreator,
  handleChangeUserName,
  handleChangeSessionId,
  setIsCreator,
  joinSession,
}) => (
  <div id="join">
    <div id="img-div">
      <img
        src="resources/images/openvidu_grey_bg_transp_cropped.png"
        alt="OpenVidu logo"
      />
    </div>
    <div id="join-dialog" className="jumbotron vertical-center">
      <h1> Join a video session </h1>
      <form className="form-group" onSubmit={joinSession}>
        <p>
          <p>Participant: </p>
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
          <p> Session: </p>
          <input
            className="form-control"
            type="text"
            id="sessionId"
            value={mySessionId}
            onChange={handleChangeSessionId}
            required
          />
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              checked={isCreator}
              onChange={() => setIsCreator(!isCreator)}
            />
            Are you the creator?
          </label>
        </p>
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
