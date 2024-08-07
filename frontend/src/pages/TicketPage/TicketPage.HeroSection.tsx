import waiting from "../../assets/img/waiting.png";

function HeroSection() {
  return (
    <div className="relative flex flex-col items-center w-full h-[240px] bg-waiting-gradient">
      <span className="text-h2 text-white font-bold text-center mt-12">
        HiFive 팬미팅 <br /> 전체 예매 페이지
      </span>
      <img
        src={waiting}
        alt="waiting"
        className="w-[250px] h-[43px] absolute bottom-0"
      />
    </div>
  );
}

export default HeroSection;
