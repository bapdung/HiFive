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
          className="p-5 bg-emerald-500"
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
        <div className="p-5 bg-emerald-500">
          <UserVideoComponent
            streamManager={publisher}
            userAnswers={userAnswers}
            isQuizTime={isQuizTime}
            currentQuiz={currentQuiz}
            isReveal={isReveal}
            rank={null}
          />
          <div>
            <span>
              My Mic:{" "}
              {fanAudioStatus[publisher.stream.connection.connectionId]
                ? "Mic ON"
                : "Mic OFF"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorCamera;
