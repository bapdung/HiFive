import {
  OpenVidu,
  Publisher,
  Session,
  Subscriber,
  Stream,
} from "openvidu-browser";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import useAuthStore from "../../store/useAuthStore";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/";

export default function App() {
  const [mySessionId, setMySessionId] = useState<string>("SessionA");
  const [myUserName, setMyUserName] = useState<string>(
    `Participant${Math.floor(Math.random() * 100)}`,
  );
  const token = useAuthStore((state) => state.accessToken);
  // console.log("1 ", token);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<
    Publisher | Subscriber | undefined
  >(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] =
    useState<MediaDeviceInfo | null>(null);

  const OV = useRef<OpenVidu>(new OpenVidu());

  const handleChangeSessionId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMySessionId(e.target.value);
    },
    [],
  );

  const handleChangeUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMyUserName(e.target.value);
    },
    [],
  );

  const handleMainVideoStream = useCallback(
    (stream: Publisher | Subscriber) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager],
  );
  // console.log("2 ", token);

  const joinSession = useCallback(() => {
    // console.log("3 ", token);
    // console.log("Join session!!!!");
    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event: { stream: Stream }) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event: { stream: Stream }) => {
      // eslint-disable-next-line no-use-before-define
      deleteSubscriber(event.stream.streamManager as Subscriber);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mySession.on("exception", (exception: any) => {
      console.warn(exception);
    });

    setSession(mySession);
    // console.log(session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log("4 ", token);
    if (session && token) {
      // console.log(session);
      // eslint-disable-next-line no-use-before-define
      getToken().then(async (openviduToken) => {
        try {
          await session.connect(openviduToken, { clientData: myUserName });

          // eslint-disable-next-line prefer-const, no-shadow
          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput",
          ) as MediaDeviceInfo[]; // Ensure devices are of type MediaDeviceInfo

          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;

          // eslint-disable-next-line no-shadow
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId,
          );

          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice || null);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log(
              "There was an error connecting to the session:",
              error.code,
              error.message,
            );
          } else {
            console.error("An unexpected error occurred:", error);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, myUserName]);

  const leaveSession = useCallback(() => {
    // console.log("5 ", token);
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName(`Participant${Math.floor(Math.random() * 100)}`);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput",
      ) as MediaDeviceInfo[]; // Ensure devices are of type MediaDeviceInfo

      if (videoDevices.length > 1) {
        const newVideoDevice = videoDevices.find(
          (device) => device.deviceId !== currentVideoDevice?.deviceId,
        );

        if (newVideoDevice) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice.deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (session) {
            await session.unpublish(mainStreamManager as Publisher);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice);
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager]);

  const deleteSubscriber = useCallback((streamManager: Subscriber) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      }
      return prevSubscribers;
    });
  }, []);

  useEffect(() => {
    // console.log("6 ", token);
    const handleBeforeUnload = () => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const createSession = async (sessionId: string): Promise<string> => {
    // console.log("create");
    // console.log("7 ", token);
    const response = await axios.post<string>(
      `${APPLICATION_SERVER_URL}api/sessions`,
      { customSessionId: sessionId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(response.data, "세션생성");
    return response.data;
  };
  const createToken = async (sessionId: string): Promise<string> => {
    const response = await axios.post<string>(
      `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(response.data, "토큰생성");
    return response.data;
  };
  // const getToken = useCallback(
  //   async () => {
  //     console.log("짠");
  //     createSession(mySessionId).then((sessionId) => createToken(sessionId));
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [mySessionId],
  // );

  // eslint-disable-next-line arrow-body-style
  const getToken = useCallback(async () => {
    if (!token) {
      return "";
    }

    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySessionId, token]);

  // const getToken = useCallback(async () => {
  //   // console.log("Dd");
  //   createSession(mySessionId).then((sessionId) => createToken(sessionId));
  // }, [mySessionId]);

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }
  //   getToken();
  // }, [token]);

  return (
    <div className="container">
      {session === undefined ? (
        <div id="join">
          <div id="img-div">
            <img
              src="resources/images/openvidu_grey_bg_transp_cropped.png"
              alt="OpenVidu logo"
            />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form
              className="form-group"
              onSubmit={(e) => {
                e.preventDefault();
                joinSession();
              }}
            >
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
      ) : null}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                key={sub.id}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(sub)}
              >
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
