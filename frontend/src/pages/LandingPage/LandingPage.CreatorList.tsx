import { v4 as uuidv4 } from "uuid";
import proimg1 from "../../assets/img/minseo.png";
import proimg2 from "../../assets/img/hyukjin.png";
import proimg3 from "../../assets/img/minchae.png";
import proimg4 from "../../assets/img/jiheun.png";
import proimg5 from "../../assets/img/hee.png";
import proimg6 from "../../assets/img/me.png";
import proimg7 from "../../assets/img/bok.png";
import proimg8 from "../../assets/img/princess.png";

interface Creator {
  id: string;
  name: string;
  src: string;
}

const creators: Creator[] = [
  { id: uuidv4(), name: "크리에이터", src: proimg1 },
  { id: uuidv4(), name: "크리에이터", src: proimg2 },
  { id: uuidv4(), name: "크리에이터", src: proimg3 },
  { id: uuidv4(), name: "크리에이터", src: proimg4 },
  { id: uuidv4(), name: "크리에이터", src: proimg5 },
  { id: uuidv4(), name: "크리에이터", src: proimg6 },
  { id: uuidv4(), name: "크리에이터", src: proimg7 },
  { id: uuidv4(), name: "크리에이터", src: proimg8 },
];

const CreatorList: React.FC = () => {
  const repeatedCreators = [...creators, ...creators, ...creators];

  return (
    <div className="flex flex-col items-center w-full bg-white py-20">
      <div className="flex flex-col justify-center items-center py-20">
        <span className="text-h1 text-gray-900 font-bold">
          하이파이브 크리에이터
        </span>
        <span className="text-h5 text-gray-900">
          이외에도 많은 분들이 하이파이브에서 활동 중이에요.
        </span>
      </div>
      <div className="flex overflow-hidden w-full">
        <div className="flex animate-scroll">
          {repeatedCreators.map((creator) => (
            <div key={creator.id} className="flex flex-col items-center mx-5">
              <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                <img
                  src={creator.src}
                  alt={`Creator ${creator.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-2 text-h6 text-center">{creator.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorList;
