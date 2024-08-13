import { Publisher, Subscriber } from "openvidu-browser";
import UserVideoComponent from "./UserVideoComponent";

interface Quiz {
  problem: string;
  answer: boolean;
  totalQuizCount: number;
  detail: string;
}

interface CreatorCameraProps {
  publisher: Publisher | undefined;
  subscribers: Subscriber[];
  isCreator: boolean | undefined;
  userAnswers: { [key: string]: boolean };
  isQuizTime: boolean;
  currentQuiz: Quiz | null;
  isReveal: boolean;
  fanAudioStatus: { [key: string]: boolean };
}

const CreatorCamera: React.FC<CreatorCameraProps> = ({
  publisher,
  subscribers,
  isCreator,
  userAnswers,
  isQuizTime,
  currentQuiz,
  isReveal,
  fanAudioStatus,
}) => {
  const creatorSub = subscribers.find(
    (sub) => JSON.parse(sub.stream.connection.data).clientData === "##",
  );
  return (
    <div>
      {creatorSub && (
        <div
          key={JSON.parse(creatorSub.stream.connection.data).clientData}
          className="p-2 bg-meetingroom-100 rounded-2xl"
        >
          <UserVideoComponent
            streamManager={creatorSub}
            userAnswers={userAnswers}
            isQuizTime={isQuizTime}
            currentQuiz={currentQuiz}
            isReveal={isReveal}
            rank={null}
          />
        </div>
      )}

      {isCreator && publisher && (
        <div className="p-2 bg-meetingroom-100 rounded-2xl">
          <div className="relative">
            <UserVideoComponent
              streamManager={publisher}
              userAnswers={userAnswers}
              isQuizTime={isQuizTime}
              currentQuiz={currentQuiz}
              isReveal={isReveal}
              rank={null}
            />
            <span className="absolute bottom-2 left-2 bg-meetingroom-600 text-white py-2 px-4 rounded-full font-semibold">
              마이크 :{" "}
              {fanAudioStatus[publisher.stream.connection.connectionId]
                ? "ON"
                : "OFF"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorCamera;
