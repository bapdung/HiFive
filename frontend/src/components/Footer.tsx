import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo/gray-logo.png";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="z-30 bg-gray-500 w-full h-28 text-small flex justify-center items-center">
      <div className="w-[1200px] flex justify-between text-[12px]">
        <div className="flex flex-col justify-end">
          <img src={logo} alt="logo" className="w-[164.72px] h-[44px]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[#F1F5F9]">개인정보방침 | 이용약관</span>
          <span className="text-[#F1F5F9]">주식회사 하이파이브</span>
          <span className="text-[#F1F5F9]">
            Copyright © 2024 HiFive. All Rights Reserved.
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#F1F5F9]">
            대표자: 김혁진 | 대표전화: 0702-0816
          </span>
          <span className="text-[#F1F5F9]">이메일: contact@hifive.com</span>
          <span className="text-[#F1F5F9]">
            찾아오시는 길: (04799) 서울 강남대로 역삼 멀티캠퍼스
          </span>
        </div>
        <div className="flex flex-col justify-end">
          <span className="text-gray-200 text-[12px]">
            크리에이터 이신가요? 여기서 등록하세요
          </span>
          <span
            className="text-white hover:cursor-pointer"
            onClick={() => navigate("/partner")}
            role="presentation"
          >
            크리에이터 등록하기
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
