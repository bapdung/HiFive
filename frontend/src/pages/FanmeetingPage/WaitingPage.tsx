import WaitingVideo from "./WaitingVideo";
import TimeTableComponent from "./TimeTableComponent";
import BackGround from "../../assets/Fanmeeting/waitline.jpg";
import logo from "../../assets/Fanmeeting/logoroom.png";

interface Timetable {
  categoryName: string;
  sequence: number;
  detail: string;
}

interface WaitingProps {
  waitingUrl: string | null;
  token: string | null;
  mySessionId: string | null;
  currentSequence: number;
  setCurrentSequence: (seq: number) => void;
  isCreator: boolean | undefined;
  timetables: Timetable[];
  onSequenceChange: (newSequence: number) => void;
}

const WaitingPage: React.FC<WaitingProps> = ({
  waitingUrl,
  token,
  mySessionId,
  currentSequence,
  setCurrentSequence,
  isCreator,
  timetables,
  onSequenceChange,
}) => (
  <div className="bg-meetingroom-600 flex flex-col items-center w-full h-[100vh]">
    <img src={logo} alt="logo" className="w-[200px] mr-4 my-10" />
    <TimeTableComponent
      token={token}
      mySessionId={mySessionId}
      timetables={timetables}
      currentSequence={currentSequence}
      isCreator={isCreator}
      setCurrentSequence={setCurrentSequence}
      onSequenceChange={onSequenceChange}
    />
    <p className="text-h3 text-white mb-4">잠시 후 팬미팅이 시작됩니다!</p>
    <WaitingVideo waitingUrl={waitingUrl} />

    <div className="absolute bottom-0 left-0 w-full">
      <img src={BackGround} alt="background-img" className="w-full h-auto" />
    </div>
  </div>
);

export default WaitingPage;
