// SuccessModal.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SuccessModalProps {
  memberId: number;
}

const SuccessModal: React.FC<SuccessModalProps> = () => {
  const location = useLocation();

  return (
    <div className="w-[50rem] bg-white flex flex-col items-center h-[26rem] justify-center rounded-3xl">
      <h1 className="text-primary-text text-h2 my-4">예매 완료되었습니다!</h1>
      <h2 className="text-small mb-4">
        팬미팅 입장 전에 신분증 등록을 진행해주세요!
      </h2>
      <div>
        <button
          type="button"
          className={`btn-outline-md ${location.pathname === "/mypage/reservation" ? "bg-gray-200" : ""}`}
        >
          <Link
            to="/mypage/reservation"
            className="no-underline text-primary-text"
          >
            예매 확인하기
          </Link>
        </button>
        <button
          type="button"
          className={`btn-light-md ml-6 ${location.pathname === "/mypage/idcard" ? "bg-gray-200" : ""}`}
        >
          <Link to="/mypage/idcard" className="no-underline text-primary-text">
            신분증 등록하기
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
