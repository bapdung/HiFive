import Meetup from "../../assets/img/description1.svg";
import Creatorfeed from "../../assets/img/description2.svg";

const Description = () => (
  <div className="flex flex-col items-center w-full bg-white">
    <div className="flex flex-col justify-center items-center py-20">
      <span className="text-h1 text-gray-900 font-bold">
        Let&apos;s HiFive!
      </span>
      <span className="text-h4 text-gray-900">
        하이파이브에선 이러고 놀아요.
      </span>
    </div>
    <div className="flex justify-center items-center w-[1144px] gap-20 mt-10">
      <img src={Meetup} alt="Meetup" />
      <div className="flex  flex-col items-start">
        <span className="text-h5 text-primary-text font-bold">MEET-UP</span>
        <span className="text-h1 text-gray-900 font-bold leading-tight">
          팬과 함께 하는 <br /> 하이파이브 미팅
        </span>
        <span className="text-large text-gray-900 mt-5">
          크리에이터와 온라인으로 만나는 미팅이에요. <br /> 다양한 활동과 소통의
          시간이 준비되어 있어요.
        </span>
      </div>
    </div>
    <div className="flex justify-center items-center w-[1144px] gap-20 mt-20">
      <div className="flex  flex-col items-start">
        <span className="text-h5 text-primary-text font-bold">
          CREATOR-FEED
        </span>
        <span className="text-h1 text-gray-900 font-bold leading-tight">
          한 층 더 가까워지는 <br /> 크리에이터 피드
        </span>
        <span className="text-large text-gray-900 mt-5">
          크리에이터 피드에서 최신 팬 미팅 정보와 게시글을 <br /> 놓치지 않고
          쉽게 받아볼 수 있어요.
        </span>
      </div>
      <img src={Creatorfeed} alt="Creatorfeed" />
    </div>
  </div>
);

export default Description;
