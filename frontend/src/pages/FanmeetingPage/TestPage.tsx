import {
  OpenVidu,
  Publisher,
  Session,
  Subscriber,
  Stream,
} from "openvidu-browser";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import VideoContainer from "./VideoContainer";
import JoinForm from "./JoinForm";
import useAuthStore from "../../store/useAuthStore";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/";

interface Timetable {
  categoryName: string;
  sequence: number;
  detail: string;
}

interface ResponseData {
  sessionId: string;
  timetables: Timetable[];
}

export default function App() {
  const [mySessionId, setMySessionId] = useState<string>("SessionA");
  const [myUserName, setMyUserName] = useState<string>(
    `Participant${Math.floor(Math.random() * 100)}`,
  );
  const token = useAuthStore((state) => state.accessToken);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<
    Publisher | Subscriber | undefined
  >(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] =
    useState<MediaDeviceInfo | null>(null);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [fanAudioStatus, setFanAudioStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [focusedSubscriber, setFocusedSubscriber] = useState<string | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timetables, setTimetables] = useState<Timetable[]>([]);

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

  // 세션 아이디는 팬미팅 아이디로 보내줘야함
  const createSession = async (sessionId: string): Promise<string> => {
    const response = await axios.post<ResponseData>(
      `${APPLICATION_SERVER_URL}api/sessions`,
      { customSessionId: sessionId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setTimetables(response.data.timetables);
    return response.data.sessionId;
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
    return response.data;
  };

  const getToken = useCallback(async () => {
    if (!token) {
      return "";
    }
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySessionId, token]);

  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event: { stream: Stream }) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      if (!isCreator) {
        setFanAudioStatus((prevStatus) => ({
          ...prevStatus,
          [subscriber.stream.connection.connectionId]:
            subscriber.stream.audioActive,
        }));
      }
    });

    mySession.on("streamDestroyed", (event: { stream: Stream }) => {
      deleteSubscriber(event.stream.streamManager as Subscriber);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mySession.on("exception", (exception: any) => {
      console.warn(exception);
    });

    mySession.on("signal:audioStatus", (event) => {
      if (event.data) {
        const data = JSON.parse(event.data);
        setFanAudioStatus((prevStatus) => ({
          ...prevStatus,
          [data.connectionId]: data.audioActive,
        }));
      }
    });

    mySession.on("signal:focus", (event) => {
      if (event.data) {
        const data = JSON.parse(event.data);
        setFocusedSubscriber(data.focusedSubscriber);
      }
    });

    setSession(mySession);
  }, [isCreator, deleteSubscriber]);

  useEffect(() => {
    if (session && token) {
      getToken().then(async (openviduToken) => {
        try {
          await session.connect(openviduToken, {
            clientData: isCreator ? "creator" : myUserName,
          });

          const newPublisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: isCreator,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          session.publish(newPublisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput",
          );

          const currentVideoDeviceId = newPublisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;

          const currentVideoInputDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId,
          ) as MediaDeviceInfo;

          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
          setCurrentVideoDevice(currentVideoInputDevice || null);

          setFanAudioStatus((prevStatus) => ({
            ...prevStatus,
            [session.connection.connectionId]: newPublisher.stream.audioActive,
          }));
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
  }, [session, isCreator, myUserName, token, getToken]);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

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
      );

      if (videoDevices.length > 1) {
        const newVideoInputDevice = videoDevices.find(
          (device) => device.deviceId !== currentVideoDevice?.deviceId,
        ) as MediaDeviceInfo;

        if (newVideoInputDevice) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoInputDevice.deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (session) {
            await session.unpublish(mainStreamManager as Publisher);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoInputDevice);
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager]);

  const toggleMyAudio = useCallback(() => {
    if (publisher) {
      const newAudioStatus = !publisher.stream.audioActive;
      publisher.publishAudio(newAudioStatus);
      setFanAudioStatus((prevStatus) => ({
        ...prevStatus,
        [session?.connection.connectionId || ""]: newAudioStatus,
      }));
      session?.signal({
        data: JSON.stringify({
          connectionId: session.connection.connectionId,
          audioActive: newAudioStatus,
        }),
        type: "audioStatus",
      });
    }
  }, [publisher, session]);

  const toggleMyVideo = useCallback(() => {
    if (publisher) {
      publisher.publishVideo(!publisher.stream.videoActive);
    }
  }, [publisher]);

  const toggleFanAudio = useCallback(
    (subscriber: Subscriber) => {
      const newAudioStatus = !subscriber.stream.audioActive;
      // eslint-disable-next-line no-param-reassign
      subscriber.stream.audioActive = newAudioStatus;
      setFanAudioStatus((prevStatus) => ({
        ...prevStatus,
        [subscriber.stream.connection.connectionId]: newAudioStatus,
      }));
      session?.signal({
        data: JSON.stringify({
          connectionId: subscriber.stream.connection.connectionId,
          audioActive: newAudioStatus,
        }),
        type: "audioStatus",
      });
    },
    [session],
  );

  const focusOnSubscriber = useCallback(
    (subscriber: Subscriber) => {
      if (focusedSubscriber === subscriber.stream.connection.connectionId) {
        // 이미 선택된 팬이 다시 선택될 경우 기본 상태로 돌아갑니다.
        session?.signal({
          data: JSON.stringify({
            focusedSubscriber: null,
          }),
          type: "focus",
        });
      } else {
        // 팬의 화면을 선택하여 보여줍니다.
        session?.signal({
          data: JSON.stringify({
            focusedSubscriber: subscriber.stream.connection.connectionId,
          }),
          type: "focus",
        });
      }
    },
    [focusedSubscriber, session],
  );

  return (
    <div className="w-full items-center">
      {session === undefined ? (
        // Session 이 undefined 일 때 JoinForm 표시 (나중에 대기방화면으로 바꾸면될듯)
        <JoinForm
          myUserName={myUserName}
          mySessionId={mySessionId}
          isCreator={isCreator}
          handleChangeUserName={handleChangeUserName}
          handleChangeSessionId={handleChangeSessionId}
          setIsCreator={setIsCreator}
          joinSession={joinSession}
        />
      ) : (
        // session 이 정의되어 있을 때 비디오 세션 표시
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
            {isCreator && (
              <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={switchCamera}
                value="Switch Camera"
              />
            )}
            <input
              className="btn btn-large btn-warning"
              type="button"
              id="buttonToggleAudio"
              onClick={toggleMyAudio}
              value="Toggle Audio"
            />
            <input
              className="btn btn-large btn-warning"
              type="button"
              id="buttonToggleVideo"
              onClick={toggleMyVideo}
              value="Toggle Video"
            />
          </div>

          <VideoContainer
            publisher={publisher}
            subscribers={subscribers}
            isCreator={isCreator}
            toggleFanAudio={toggleFanAudio}
            fanAudioStatus={fanAudioStatus}
            focusedSubscriber={focusedSubscriber}
            focusOnSubscriber={focusOnSubscriber}
          />
        </div>
      )}
    </div>
  );
}
