interface TimeTableProps {
  currentSequence: number;
  nextSequence: () => void;
  prevSequence: () => void;
  isCreator: boolean | undefined;
}

const TimeTableComponent: React.FC<TimeTableProps> = ({
  currentSequence,
  nextSequence,
  prevSequence,
  isCreator,
}) => {
  console.log(currentSequence);
  return (
    <div>
      <p>{currentSequence}</p>
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
