import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  OpenVidu,
  Publisher,
  Session,
  Subscriber,
  Stream,
} from "openvidu-browser";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import VideoContainer from "./VideoContainer";
import JoinForm from "./JoinForm";
import Chat from "./Chat";
import useAuthStore from "../../store/useAuthStore";
import client from "../../client";

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

interface ChatMessage {
  id: string;
  user: string;
  text: string;
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
  const [isCreator, setIsCreator] = useState<boolean | undefined>();
  const [fanAudioStatus, setFanAudioStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [focusedSubscriber, setFocusedSubscriber] = useState<string | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timetables, setTimetables] = useState<Timetable[]>([]);

  // 채팅 관련 상태 추가
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const userColorsRef = useRef<{ [key: string]: string }>({});

  // 유저 정보 불러오기
  const fetchUser = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await client(token).get(`api/member`);
      setIsCreator(response.data.creator);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

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

    // 밝은 색상을 제외하고 색상 생성 함수
    const generateColor = (): string => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i += 1) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      // 밝은 색상 제외
      if (
        parseInt(color.substring(1, 3), 16) > 200 &&
        parseInt(color.substring(3, 5), 16) > 200 &&
        parseInt(color.substring(5, 7), 16) > 200
      ) {
        return generateColor();
      }
      return color;
    };

    // 채팅 관련 시그널 처리
    mySession.on("signal:chat", (event) => {
      if (event.data) {
        const data = JSON.parse(event.data);
        setChatMessages((prevMessages) => [...prevMessages, data]);

        if (!userColorsRef.current[data.user]) {
          userColorsRef.current[data.user] = generateColor();
        }
      }
    });

    setSession(mySession);
  }, [mySessionId, isCreator, deleteSubscriber]);

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

      // 객체 구조를 복사하여 수정
      const updatedStream = {
        ...subscriber.stream,
        audioActive: newAudioStatus,
      };
      const updatedSubscriber = { ...subscriber, stream: updatedStream };

      setFanAudioStatus((prevStatus) => ({
        ...prevStatus,
        [updatedSubscriber.stream.connection.connectionId]: newAudioStatus,
      }));
      session?.signal({
        data: JSON.stringify({
          connectionId: updatedSubscriber.stream.connection.connectionId,
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
        session?.signal({
          data: JSON.stringify({
            focusedSubscriber: null,
          }),
          type: "focus",
        });
      } else {
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

  const handleChangeMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMessage(e.target.value);
    },
    [],
  );

  const handleSendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (newMessage.trim() !== "") {
        const message = {
          id: uuidv4(),
          user: myUserName,
          text: newMessage,
        };
        session?.signal({
          data: JSON.stringify(message),
          type: "chat",
        });
        setNewMessage("");
      }
    },
    [newMessage, myUserName, session],
  );

  return (
    <div className="w-full items-center">
      {session === undefined ? (
        <JoinForm
          myUserName={myUserName}
          mySessionId={mySessionId}
          isCreator={isCreator}
          handleChangeUserName={handleChangeUserName}
          handleChangeSessionId={handleChangeSessionId}
          joinSession={joinSession}
        />
      ) : (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="세션나가기"
            />
            {isCreator && (
              <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={switchCamera}
                value="카메라 기종 변경"
              />
            )}
            <input
              className="btn btn-large btn-warning"
              type="button"
              id="buttonToggleAudio"
              onClick={toggleMyAudio}
              value="마이크 껐다 키기"
            />
            <input
              className="btn btn-large btn-warning"
              type="button"
              id="buttonToggleVideo"
              onClick={toggleMyVideo}
              value="비디오껐다키기"
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
          <Chat
            chatMessages={chatMessages}
            newMessage={newMessage}
            handleChangeMessage={handleChangeMessage}
            handleSendMessage={handleSendMessage}
            userColors={userColorsRef.current}
          />
        </div>
      )}
    </div>
  );
}
