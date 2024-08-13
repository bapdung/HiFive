import { useNavigate } from "react-router-dom";
import hifiveBird from "../../assets/img/dasut-hana.png";

const EndFanmeeting: React.FC = () => {
  const message = "이미 HiFive 한 팬미팅이에요.";
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full min-h-[1200px] bg-[#666666]">
      <div className="w-1/3 flex flex-col items-center">
        <img src={hifiveBird} alt="end-img" className="w-4/5 mb-6 my-60" />
        <p className="text-h4 text-white my-3">{message}</p>
        <div className="w-full flex justify-center">
          <button
            type="button"
            className="btn-light-md w-1/3 mr-2"
            onClick={() => navigate("/ticket")}
          >
            팬미팅 전체 목록 보기
          </button>
          <button
            type="button"
            className="creator-btn-light-md w-1/3"
            onClick={() => navigate("/mypage/gallery")}
          >
            팬미팅 추억하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndFanmeeting;
