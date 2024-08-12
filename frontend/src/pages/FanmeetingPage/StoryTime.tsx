import { useState, useEffect } from "react";
import { Session } from "openvidu-browser";
import client from "../../client";

interface Timetable {
  categoryName: string;
  sequence: number;
  detail: string;
}

interface StoryTimeProps {
  token: string | null;
  mySessionId: string | null;
  currentSequence: number;
  isCreator: boolean | undefined;
  timetables: Timetable[];
  session: Session | undefined;
}

interface Story {
  storyId: number;
  nickname: string;
  title: string;
  content: string;
  totalStoryCount: number;
}

const StoryTime: React.FC<StoryTimeProps> = ({
  token,
  mySessionId,
  currentSequence,
  isCreator,
  timetables,
  session,
}) => {
  const [isStoryTime, setIsStoryTime] = useState(false);
  const [storySequence, setStorySequence] = useState(0);
  const [lastStorySequence, setLastStorySequence] = useState<number | null>(
    null,
  );
  const [currentStory, setCurrentStory] = useState<Story | null>(null);

  useEffect(() => {
    const storyStartApi = async () => {
      if (!token || !mySessionId) {
        return;
      }
      try {
        await client(token).post(`api/sessions/story/${mySessionId}`);
        console.log("성공적으로 전송!! 사연전달 시작!");
      } catch (error) {
        console.error(error);
      }
    };

    if (timetables[currentSequence - 1]?.categoryName === "사연 전달") {
      setIsStoryTime(true);
      storyStartApi();
    } else {
      setIsStoryTime(false);
      setStorySequence(0);
      setLastStorySequence(null);
      setCurrentStory(null);
    }
  }, [token, mySessionId, currentSequence, timetables]);

  const fetchAStory = async (seq: number) => {
    if (!token || (lastStorySequence && lastStorySequence < seq)) {
      return;
    }
    try {
      const response = await client(token).get(
        `/api/sessions/story/${mySessionId}/${seq}`,
      );
      setCurrentStory(response.data);
      setLastStorySequence(response.data.totalStoryCount);
    } catch (error) {
      console.error(error);
    }
  };

  const nextStory = () => {
    if (
      !lastStorySequence ||
      (lastStorySequence && lastStorySequence > storySequence)
    ) {
      const nextseq = storySequence + 1;
      setStorySequence(nextseq);
      fetchAStory(nextseq);

      if (isCreator && session) {
        session.signal({
          type: "nextStory",
          data: JSON.stringify({ storySequence: nextseq }),
        });
      }
    }
  };

  const prevStory = () => {
    if (storySequence > 1) {
      const prevseq = storySequence - 1;
      setStorySequence(prevseq);
      fetchAStory(prevseq);

      if (isCreator && session) {
        session.signal({
          type: "prevStory",
          data: JSON.stringify({ storySequence: prevseq }),
        });
      }
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (session) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleNextStorySignal = (event: any) => {
        if (event.data) {
          const data = JSON.parse(event.data);
          setStorySequence(data.storySequence);
          fetchAStory(data.storySequence);
        }
      };

      session.on("signal:nextStory", handleNextStorySignal);
      session.on("signal:prevStory", handleNextStorySignal);

      // 클린업 함수 반환
      return () => {
        session.off("signal:nextStory", handleNextStorySignal);
        session.off("signal:prevStory", handleNextStorySignal);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return isStoryTime ? (
    <div>
      {isCreator && (
        <div>
          <button type="button" onClick={prevStory}>
            이전 사연
          </button>
          <button type="button" onClick={nextStory}>
            다음 사연
          </button>
        </div>
      )}
      {currentStory && (
        <div>
          <p>{storySequence}번째 사연</p>
          <p>작성자 : {currentStory.nickname}</p>
          <p>제목 : {currentStory.title}</p>
          <p>{currentStory.content}</p>
        </div>
      )}
    </div>
  ) : null;
};

export default StoryTime;
