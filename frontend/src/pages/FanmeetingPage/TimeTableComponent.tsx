// import { useEffect } from "react";
import client from "../../client";

interface Timetable {
  categoryName: string;
  sequence: number;
  detail: string;
}

interface TimeTableProps {
  token: string | null;
  mySessionId: string | null;
  currentSequence: number;
  setCurrentSequence: (seq: number) => void;
  isCreator: boolean | undefined;
  timetables: Timetable[];
  onSequenceChange: (newSequence: number) => void;
}

const TimeTableComponent: React.FC<TimeTableProps> = ({
  currentSequence,
  token,
  setCurrentSequence,
  mySessionId,
  isCreator,
  timetables,
  onSequenceChange,
}) => {
  // 현재 코너 바뀔때마다 백엔드로 api 호출
  const apiTimetable = async (seq: number) => {
    if (!token || !mySessionId) {
      return;
    }
    try {
      await client(token).post(`api/sessions/${mySessionId}`, {
        sequence: seq,
      });
      console.log(timetables[seq - 1]);
      console.log("성공적으로 전송--코너변경");
    } catch (error) {
      console.error(error);
    }
  };

  const nextSequence = () => {
    if (currentSequence < timetables.length) {
      const next = currentSequence + 1;
      setCurrentSequence(next);
      apiTimetable(next);
      onSequenceChange(next);
    }
  };

  const prevSequence = () => {
    if (currentSequence > 1) {
      const prev = currentSequence - 1;
      setCurrentSequence(prev);
      apiTimetable(prev);
      onSequenceChange(prev);
    }
  };

  return (
    <div
      className={`w-full flex ${isCreator ? "justify-between" : "justify-center"} items-center z-10`}
    >
      {/* <p>{currentCorner}</p> */}
      {isCreator && currentSequence !== 0 && (
        <button
          type="button"
          onClick={prevSequence}
          className="meetingroom-btn-light-md"
        >
          이전
        </button>
      )}
      {timetables && currentSequence > 0 && (
        <div className="flex flex-col justify-center items-center">
          {/* 코너 순서 */}
          <p className="text-small font-medium text-meetingroom-600">
            {currentSequence} / {timetables.length}
          </p>
          {/* 코너이름 */}
          <p className="text-large font-semibold text-meetingroom-800">
            {timetables[currentSequence - 1]?.categoryName}
          </p>{" "}
          {/* 코너설명 */}
          {/* <p>{timetables[currentSequence - 1]?.detail}</p> */}
        </div>
      )}
      {isCreator && currentSequence < timetables.length && (
        <button
          type="button"
          onClick={nextSequence}
          className="meetingroom-btn-light-md"
        >
          {currentSequence === 0 ? "팬미팅 시작" : "다음"}
        </button>
      )}
    </div>
  );
};

export default TimeTableComponent;
