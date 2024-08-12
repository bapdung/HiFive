/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import TimeTableComponent from "./TimeTableComponent";
import StoryTime from "./StoryTime";
import QuestionTime from "./QuestionTime";
import QuizTime from "./QuizTime";
import WaitingPage from "./WaitingPage";

import roomframe from "../../assets/Fanmeeting/roomframe.png";

// const APPLICATION_SERVER_URL =
// process.env.NODE_ENV === "production" ? "" : "https://i11a107.p.ssafy.io/";
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
  isCreator: boolean;
}

interface Quiz {
  problem: string;
  answer: boolean;
  totalQuizCount: number;
  detail: string;
}

interface Rank {
  fanId: number;
  score: number;
}

export default function Main() {
  const navigate = useNavigate();
  const [myUserName, setMyUserName] = useState<string>("");
  const token = useAuthStore((state) => state.accessToken);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<
    Publisher | Subscriber | undefined
  >(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] =
    useState<MediaDeviceInfo | null>(null);
  const location = useLocation();
  const mySessionId = location.pathname.split("/")[2];
  const [isCreator, setIsCreator] = useState<boolean | undefined>();
  const [waitingUrl, setWaitingUrl] = useState<string | null>(null);
  const [fanAudioStatus, setFanAudioStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [focusedSubscriber, setFocusedSubscriber] = useState<string | null>(
    null,
  );

  // 퀴즈 관련 상태
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [isReveal, setIsReveal] = useState(false);
  const handleReveal = (bool: boolean) => {
    setIsReveal(bool);
  };
  const [ranks, setRanks] = useState<Rank[] | null>(null);
  const handleRank = (allRank: Rank[]) => {
    setRanks(allRank);
  };

  // 타임 테이블 관련 상태
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [currentSequence, setCurrentSequence] = useState(0);

  // 채팅 관련 상태 추가
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const userColorsRef = useRef<{ [key: string]: string }>({});
  const [userId, setUserId] = useState<number | undefined>();
  const [lastMessageTime, setLastMessageTime] = useState<number | null>(null);

  // 유저 정보 불러오기
  const fetchUser = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await client(token).get(`api/member`);
      setUserId(response.data.memberId);
      setMyUserName(response.data.nickname);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchFanmeeting = async () => {
    if (!token || !mySessionId) {
      return;
    }
    try {
      const response = await client(token).get(`api/fanmeeting/${mySessionId}`);
      if (response.data.creatorId === userId) {
        setIsCreator(true);
      }
      setWaitingUrl(response.data.link);
    } catch (error) {
      console.error(error);
    }
  };

  const checkIsEnded = async () => {
    if (!token || !session || !mySessionId) {
      return;
    }
    try {
      const response = await client(token).get(`api/fanmeeting/${mySessionId}`);
      if (response.data.data) {
        navigate(`/fanmeeting/result/${mySessionId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIsEnded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, token, mySessionId]);

  useEffect(() => {
    fetchFanmeeting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, mySessionId, userId]);

  const OV = useRef<OpenVidu>(new OpenVidu());

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
    console.log(APPLICATION_SERVER_URL);
    const response = await axios.post<ResponseData>(
      `${APPLICATION_SERVER_URL}api/sessions/open`,
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
    try {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        navigate(
          `/error?code=${error.response?.data.errorCode}&message=${encodeURIComponent(error.response?.data.errorMessage)}`,
        );
      }
      return "";
    }
  };

  const getToken = useCallback(async () => {
    if (!token || !mySessionId) {
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
        const focusedSubscriberId = data.focusedSubscriber;

        if (focusedSubscriberId) {
          const foundSubscriber = subscribers.find(
            (sub) => sub.stream.connection.connectionId === focusedSubscriberId,
          );

          if (foundSubscriber) {
            setFocusedSubscriber(focusedSubscriberId);
          } else if (
            publisher &&
            publisher.stream.connection.connectionId === focusedSubscriberId
          ) {
            setFocusedSubscriber(focusedSubscriberId);
          } else {
            setFocusedSubscriber(null);
          }
        } else {
          setFocusedSubscriber(null);
        }
      }
    });

    mySession.on("signal:userAnswer", (event) => {
      if (event.data) {
        const data = JSON.parse(event.data);
        setUserAnswers((prevAnswers) => ({
          ...prevAnswers,
          [data.userId]: data.answer,
        }));
      }
    });

    mySession.on("signal:resetAnswer", (event) => {
      if (event.data) {
        setUserAnswers({});
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySessionId, isCreator, deleteSubscriber]);

  useEffect(() => {
    if (session && token) {
      getToken().then(async (openviduToken) => {
        try {
          await session.connect(openviduToken, {
            // 크리에이터일경우 이름 특수문자(##)로 설정 => 팬이랑 안겹치게 하기 위해서
            clientData: isCreator ? "##" : myUserName,
            userId,
          });

          const newPublisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: isCreator, // 크리에이터일경우만 마이크 킨 상태로 시작
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
  }, [session, isCreator, myUserName, token, getToken, userId]);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const closeSessionApi = async () => {
    if (!token || !session || !mySessionId) {
      return;
    }
    try {
      const response = await client(token).delete(
        `api/sessions/${mySessionId}`,
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error closing the session:", error);
    }
  };

  const closeSession = useCallback(() => {
    closeSessionApi();
    if (session) {
      session
        .signal({
          type: "closeSession",
          data: JSON.stringify({
            reason: "The session has been closed by the creator.",
          }),
        })
        .then(() => {
          leaveSession(); // 세션 종료 후 자신도 나가도록 처리
          console.log("나갔어");
        })
        .catch((error) => {
          console.error("Error sending closeSession signal:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, token, mySessionId]);

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
            publishAudio: isCreator,
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
  }, [currentVideoDevice, session, mainStreamManager, isCreator]);

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

  // 내 오디오 끄기 함수
  const muteMyAudio = useCallback(() => {
    if (publisher && publisher.stream.audioActive) {
      publisher.publishAudio(false);
      setFanAudioStatus((prevStatus) => ({
        ...prevStatus,
        [session?.connection.connectionId || ""]: false,
      }));
      session?.signal({
        data: JSON.stringify({
          connectionId: session.connection.connectionId,
          audioActive: false,
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
    (subscriber: Subscriber | Publisher) => {
      const subscriberId = subscriber.stream.connection.connectionId;
      const newFocusedSubscriber =
        focusedSubscriber === subscriberId ? null : subscriberId;

      session?.signal({
        data: JSON.stringify({
          focusedSubscriber: newFocusedSubscriber,
        }),
        type: "focus",
      });
    },
    [focusedSubscriber, session],
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (session) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleFocusSignal = (event: any) => {
        const data = JSON.parse(event.data);
        const focusedSubscriberId = data.focusedSubscriber;

        if (focusedSubscriberId) {
          const foundSubscriber = subscribers.find(
            (sub) => sub.stream.connection.connectionId === focusedSubscriberId,
          );

          if (foundSubscriber) {
            setFocusedSubscriber(focusedSubscriberId);
          } else if (
            publisher &&
            publisher.stream.connection.connectionId === focusedSubscriberId
          ) {
            setFocusedSubscriber(focusedSubscriberId);
          } else {
            setFocusedSubscriber(null);
          }
        } else {
          setFocusedSubscriber(null);
        }
      };

      session.on("signal:focus", handleFocusSignal);

      return () => {
        session.off("signal:focus", handleFocusSignal);
      };
    }
  }, [session, subscribers, publisher]);

  const handleChangeMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMessage(e.target.value);
    },
    [],
  );

  const handleSendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const now = Date.now();
      // 0.5초에 채팅 하나 보낼 수 있다.
      if (lastMessageTime && now - lastMessageTime < 500) {
        alert("도배 금지!!");
        return;
      }
      if (newMessage.trim() !== "") {
        const message = {
          id: uuidv4(),
          user: myUserName,
          text: newMessage,
          isCreator,
        };
        session?.signal({
          data: JSON.stringify(message),
          type: "chat",
        });
        setNewMessage("");
        setLastMessageTime(now);
      }
    },
    [newMessage, myUserName, session, lastMessageTime, isCreator],
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (session) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleSignal = (event: any) => {
        if (event.data) {
          console.log("Received closeSession signal:", event.data);
          leaveSession();
        }
      };
      session.on("signal:closeSession", handleSignal);
      return () => {
        session.off("signal:closeSession", handleSignal);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const goToNextCorner = useCallback(
    (newSequence: number) => {
      if (isCreator && session) {
        setCurrentSequence(newSequence);
        session.signal({
          type: "nextCorner",
          data: JSON.stringify({ sequence: newSequence }),
        });
      }
    },
    [isCreator, session],
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (session) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleNextCornerSignal = (event: any) => {
        if (event.data) {
          const data = JSON.parse(event.data);
          setCurrentSequence(data.sequence);
        }
      };

      session.on("signal:nextCorner", handleNextCornerSignal);

      // 클린업 함수 반환
      return () => {
        session.off("signal:nextCorner", handleNextCornerSignal);
      };
    }
  }, [session]);

  const handleFetchQuiz = (quiz: Quiz | null) => {
    setCurrentQuiz(quiz);
  };

  return (
    <div className="w-full h-full items-center bg-meetingroom-700">
      {session === undefined ? (
        <JoinForm
          myUserName={myUserName}
          mySessionId={mySessionId}
          isCreator={isCreator}
          joinSession={joinSession}
          setIsCreator={setIsCreator}
        />
      ) : currentSequence === 0 ? (
        <div>
          <TimeTableComponent
            token={token}
            mySessionId={mySessionId}
            timetables={timetables}
            currentSequence={currentSequence}
            isCreator={isCreator}
            setCurrentSequence={setCurrentSequence}
            onSequenceChange={goToNextCorner}
          />
          <WaitingPage waitingUrl={waitingUrl} />
        </div>
      ) : (
        <div
          id="session"
          className="bg-meetingroom-700 w-full h-full flex flex-col items-center"
        >
          <img src={roomframe} alt="frame" className="w-11/12 absolute top-5" />
          <div id="session-header" className="w-[300px]">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="세션나가기"
            />
            {isCreator && (
              <>
                <input
                  className="btn btn-large btn-success"
                  type="button"
                  id="buttonSwitchCamera"
                  onClick={switchCamera}
                  value="카메라 기종 변경"
                />
                <button type="button" className="btn-md" onClick={closeSession}>
                  세션 종료
                </button>
              </>
            )}
            {isCreator ? (
              <input
                className="btn btn-large btn-warning"
                type="button"
                id="buttonToggleAudio"
                onClick={toggleMyAudio}
                value="마이크 껐다 키기"
              />
            ) : (
              <input
                className={
                  publisher &&
                  fanAudioStatus[publisher.stream.connection.connectionId]
                    ? "btn-md hover:pointer"
                    : "btn-md bg-gray-700 hover:default"
                }
                type="button"
                id="buttonToggleAudio"
                onClick={muteMyAudio}
                value={
                  publisher &&
                  fanAudioStatus[publisher.stream.connection.connectionId]
                    ? "음소거 하기"
                    : "음소거 중"
                }
              />
            )}
            <input
              className="btn btn-large btn-warning"
              type="button"
              id="buttonToggleVideo"
              onClick={toggleMyVideo}
              value="비디오껐다키기"
            />
          </div>
          <TimeTableComponent
            token={token}
            mySessionId={mySessionId}
            timetables={timetables}
            currentSequence={currentSequence}
            isCreator={isCreator}
            setCurrentSequence={setCurrentSequence}
            onSequenceChange={goToNextCorner}
          />
          <StoryTime
            token={token}
            mySessionId={mySessionId}
            timetables={timetables}
            currentSequence={currentSequence}
            isCreator={isCreator}
            session={session}
          />
          <QuestionTime
            token={token}
            mySessionId={mySessionId}
            timetables={timetables}
            currentSequence={currentSequence}
            isCreator={isCreator}
            session={session}
          />
          <QuizTime
            token={token}
            mySessionId={mySessionId}
            timetables={timetables}
            currentSequence={currentSequence}
            isCreator={isCreator}
            session={session}
            handleFetchQuiz={handleFetchQuiz}
            handleReveal={handleReveal}
            handleRank={handleRank}
          />
          <VideoContainer
            publisher={publisher}
            subscribers={subscribers}
            isCreator={isCreator}
            toggleFanAudio={toggleFanAudio}
            fanAudioStatus={fanAudioStatus}
            focusedSubscriber={focusedSubscriber}
            focusOnSubscriber={focusOnSubscriber}
            userAnswers={userAnswers}
            currentSequence={currentSequence}
            timetables={timetables}
            currentQuiz={currentQuiz}
            isReveal={isReveal}
            ranks={ranks}
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
