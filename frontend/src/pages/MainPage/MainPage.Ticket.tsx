import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FaceVerification from "../../service/FaceVerification";
import defaultPoster from "../../assets/img/poster.jpg";

interface TicketProps {
  fanmeetingId: number;
  poster: string;
  stamp: string;
  barcode: string;
  event: string;
  startTime: string;
  isActive: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const isWithin30Minutes = (startTime: string) => {
  const now = new Date();
  const eventTime = new Date(startTime);
  const timeDiff = (eventTime.getTime() - now.getTime()) / (1000 * 60); // Time difference in minutes
  return timeDiff <= 30;
};

const Ticket: React.FC<TicketProps> = ({
  fanmeetingId,
  poster,
  stamp,
  barcode,
  event,
  startTime,
  isActive,
}) => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);
  const canEnter = isWithin30Minutes(startTime);

  if (!event && !startTime) {
    if (fanmeetingId) {
      return <div className="w-[660px] h-[500px]" />;
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
      className={`flex mb-8 mr-8 transition-transform duration-500 ${
        isActive ? "opacity-100" : "opacity-40 scale-95"
      }`}
    >
      <div className="w-[360px] h-[500px] flex flex-col bg-primary-100 rounded-2xl py-6 items-center justify-center shadow-ticket-shadow-left z-10">
        <img
          src={poster || defaultPoster}
          alt="poster"
          className="rounded-2xl"
          onClick={() => navigate(`/ticket/${fanmeetingId}`)}
          role="presentation"
        />
      </div>
      <div className="relative w-[300px] h-[500px] flex flex-col bg-white rounded-2xl items-center shadow-ticket-shadow">
        <img src={stamp} alt="stamp" className="mt-3" />
        <div className="mx-10 my-5 w-full">
          <div className="flex flex-start flex-col justify-start mb-5 ml-10 w-full">
            <span className="text-medium text-gray-500 font-bold">EVENT</span>
            <span className="text-large text-gray-900 font-bold w-full">
              {event}
            </span>
          </div>
          <div className="flex flex-start flex-col justify-start ml-10 w-full">
            <span className="text-medium text-gray-500 font-bold">
              START TIME
            </span>
            <span className="text-large text-gray-900 font-bold w-full">
              {formatDate(startTime)}
            </span>
          </div>
        </div>
        <div className="btn-lg absolute bottom-12">
          <span className="px-16 text-white">팬 미팅 입장하기</span>
        </div>
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
