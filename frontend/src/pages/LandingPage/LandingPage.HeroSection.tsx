import { useState, useEffect } from "react";
import { kakaoLogin } from "../../service/authService";
import LandingMain from "../../assets/img/landingmain.svg";

function HeroSection() {
  const words = ["추억", "응원", "손뼉", "영감", "행복"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setAnimate(false);
      }, 500);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [words.length]);

  return (
    <div className=" flex items-center justify-center w-full h-[1000px] bg-landing-gradient gap-[250px]">
      <div className="flex flex-col items-center gap-20">
        <div className="flex flex-col items-center justify-center">
          <span className="text-[64px] text-gray-900 font-bold">
            팬과 크리에이터가
          </span>
          <div className="flex gap-1">
            <div className="justify-center items-center rounded-full bg-primary px-5">
              <span
                className={`text-[64px] text-white font-bold ${animate ? "animate-slide-out" : "animate-slide-in"}`}
              >
                {words[currentWordIndex]}
              </span>
            </div>
            <span className="text-[64px] text-gray-900 font-bold">
              을 마주치는 곳.
            </span>
          </div>
        </div>
        <div>
          <p className="text-[28px] text-center font-semibold">
            평소에 응원하던 크리에이터와 <br /> 하이파이브에서 가볍고 즐겁게
            자주 만나요. <br /> 가까운 온라인이 먼 오프라인보다 나으니까요!
          </p>
        </div>
        <div
          className="inline-flex w-auto max-w-max py-4 px-10 justify-center items-center bg-vivid-gradient rounded-full shadow-lg"
          onClick={kakaoLogin}
          onKeyDown={kakaoLogin}
          role="presentation"
        >
          <span className="text-h4 text-white font-bold hover:cursor-pointer">
            카카오 계정으로 하이파이브 시작하기
          </span>
        </div>
      </div>
      <div>
        <img src={LandingMain} alt="LandingMain" />
      </div>
    </div>
  );
}

export default HeroSection;
