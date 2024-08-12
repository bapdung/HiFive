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
    <div className="bg-white h-[409px] rounded-2xl p-2 flex flex-col items-center z-10">
      {/* <p>{currentCorner}</p> */}
      {isCreator && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={nextSequence}
            className="btn-gray hover:cursor-pointer"
          >
            다음 세션
          </button>
          <button
            type="button"
            onClick={prevSequence}
            className="btn-gray hover:cursor-pointer"
          >
            이전 세션
          </button>
        </div>
      )}
      {timetables && currentSequence > 0 && (
        <div>
          {/* 코너 순서 */}
          <p>{currentSequence} 번째 코너</p>
          {/* 코너이름 */}
          <p>{timetables[currentSequence - 1]?.categoryName} 코너</p>{" "}
          {/* 코너설명 */}
          <p>{timetables[currentSequence - 1]?.detail}</p>
        </div>
      )}
    </div>
  );
};

export default TimeTableComponent;
