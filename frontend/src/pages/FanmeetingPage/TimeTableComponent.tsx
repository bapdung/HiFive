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
}

const TimeTableComponent: React.FC<TimeTableProps> = ({
  currentSequence,
  token,
  setCurrentSequence,
  mySessionId,
  isCreator,
  timetables,
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
    }
  };

  const prevSequence = () => {
    if (currentSequence > 1) {
      const prev = currentSequence - 1;
      setCurrentSequence(prev);
      apiTimetable(prev);
    }
  };

  return (
    <div>
      {/* <p>{currentCorner}</p> */}
      {isCreator && (
        <>
          <button type="button" onClick={nextSequence}>
            다음 세션
          </button>
          <button type="button" onClick={prevSequence}>
            이전 세션
          </button>
        </>
      )}
    </div>
  );
};

export default TimeTableComponent;
