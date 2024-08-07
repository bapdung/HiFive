import logo from "../assets/icons/logo/gray-logo.png";

function Footer() {
  return (
    <div className="z-30 bg-gray-500 w-full h-36 text-small flex justify-center items-center">
      <div className="w-[1406px] flex justify-between">
        <img src={logo} alt="logo" className="w-[219.43px] h-[58.64px]" />
        <div className="flex flex-col">
          <span className="text-[#F1F5F9]">개인정보방침 | 이용약관</span>
          <span className="text-[#F1F5F9]">주식회사 하이파이브</span>
          <span className="text-[#F1F5F9]">
            Copyright © 2024 All Rights Reserved by HiFive
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
          <span className="text-gray-300">
            크리에이터 이신가요? 여기서 등록하세요
          </span>
          <span className="text-white">크리에이터 등록하기</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
