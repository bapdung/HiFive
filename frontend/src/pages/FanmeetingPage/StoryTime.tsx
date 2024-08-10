import { useState, useEffect } from "react";
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
}) => {
  const [isStoryTime, setIsStoryTime] = useState(false);
  const [storySequence, setStorySequence] = useState(0); // 나중에 1로 변경될 예정
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
    }
  }, [token, mySessionId, currentSequence, timetables]);

  const fetchAStory = async (nextsq: number) => {
    if (!token || (lastStorySequence && lastStorySequence <= storySequence)) {
      return;
    }
    try {
      const response = await client(token).get(
        `/api/sessions/story/${mySessionId}/${nextsq}`,
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
      (lastStorySequence && lastStorySequence < currentSequence)
    ) {
      const nextseq = storySequence + 1;
      setStorySequence(nextseq);
      fetchAStory(nextseq);
    }
  };

  const prevStory = () => {
    if (storySequence > 1) {
      const prevseq = storySequence - 1;
      setStorySequence(prevseq);
      fetchAStory(prevseq);
    }
  };
  return (
    <div>
      {isStoryTime && <p>사연전달 시간입니다.</p>}
      <p>사연전달 컴포넌트</p>
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
          <p>{currentStory.title}</p>
          <p>{currentStory.nickname}</p>
          <p>{currentStory.content}</p>
        </div>
      )}
    </div>
  );
};

export default StoryTime;
