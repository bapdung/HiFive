import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FaceVerification from "../../service/FaceVerification";

interface TicketProps {
  key: number;
  poster: string;
  stamp: string;
  barcode: string;
  event: string;
  startTime: string;
  isActive: boolean;
}

const Ticket: React.FC<TicketProps> = ({
  key,
  poster,
  stamp,
  barcode,
  event,
  startTime,
  isActive,
}) => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);

  if (!event && !startTime) {
    if (key) {
      return <div className="w-[762px] h-[544px]" />;
    }
    return <div className="w-[762px] h-[544px] mr-8" />; // Empty ticket
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      setVerifying(true);
    }
  };

  return (
    <div
      className={`flex mb-8 mr-8 transition-transform duration-500 ${isActive ? "opacity-100" : "opacity-40 scale-95"}`}
    >
      <div className="w-[414px] h-[544px] flex flex-col bg-primary-100 rounded-2xl py-8 items-center justify-center shadow-ticket-shadow">
        <img
          src={poster}
          alt="poster"
          className="rounded-2xl"
          onClick={() => navigate("/ticket/1")}
          role="presentation"
        />
      </div>
      <div className="relative w-[348px] h-[544px] flex flex-col bg-white rounded-2xl items-center shadow-ticket-shadow">
        <img src={stamp} alt="stamp" className="mt-3" />
        <div className="mx-10 my-5">
          <div className="flex flex-start flex-col justify-center mb-5">
            <span className="text-medium text-gray-500 font-bold">EVENT</span>
            <span className="text-large text-gray-900 font-bold">{event}</span>
          </div>
          <div className="flex flex-start flex-col justify-center">
            <span className="text-medium text-gray-500 font-bold">
              START TIME (Est.)
            </span>
            <span className="text-large text-gray-900 font-bold">
              {startTime}
            </span>
          </div>
        </div>
        <button
          type="button" // 버튼 타입 명시
          className="btn-lg absolute bottom-12 px-16 text-white"
          onClick={() => setVerifying(true)}
          onKeyDown={handleKeyDown}
          aria-label="팬 미팅 입장하기"
        >
          팬 미팅 입장하기
        </button>
        <img src={barcode} alt="barcode" className="absolute bottom-[5px]" />
      </div>
      {verifying && (
        <FaceVerification
          isOpen={verifying}
          onRequestClose={() => setVerifying(false)}
          onSuccess={() => {
            setVerifying(false);
            navigate("/ticket/1");
          }}
        />
      )}
    </div>
  );
};

export default Ticket;
