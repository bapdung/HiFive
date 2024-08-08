import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FaceVerification from "./FaceVerification";
import defaultPoster from "../../assets/img/poster.jpg";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

interface TicketProps {
  fanmeetingId: number;
  poster: string;
  stamp: string;
  barcode: string;
  event: string;
  startTime: string;
  isActive: boolean;
  runningTime: number;
  creatorName: string;
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
  runningTime,
  creatorName,
}) => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);
  const canEnter = isWithin30Minutes(startTime);
  const token = useAuthStore((state) => state.accessToken);

  const handleEnterClick = async () => {
    if (canEnter) {
      try {
        if (token) {
          const memberResponse = await client(token).get(
            `/api/member/identification`,
          );
          const { identificationImg } = memberResponse.data;
          if (identificationImg) {
            setVerifying(true);
          } else {
            alert("신분증이 등록되지 않았습니다. 신분증을 등록해주세요.");
          }
        }
      } catch (error) {
        alert("신분증 조회 중 오류가 발생했습니다.");
        console.error("Error fetching identification:", error);
      }
    }
  };
  if (!event && !startTime) {
    if (fanmeetingId) {
      return <div className="w-[737px] h-[500px]" />;
    }
    return <div className="w-[737px] h-[500px] mr-6" />; // Empty ticket
  }

  return (
    <div
      className={`flex mb-5 transition-transform duration-500 mr-[60.5px] ${
        isActive ? "opacity-100" : "opacity-40 scale-95"
      }`}
    >
      <div className="w-[360px] h-[500px] flex flex-col bg-primary-100 rounded-2xl items-center justify-center shadow-ticket-shadow-left z-10">
        <img
          src={poster || defaultPoster}
          alt="poster"
          className="rounded-xl w-[320px] h-[460px]"
          onClick={() => navigate(`/ticket/${fanmeetingId}`)}
          role="presentation"
        />
      </div>
      <div className="relative w-[300px] h-[500px] flex flex-col bg-white rounded-2xl items-center shadow-ticket-shadow">
        <img src={stamp} alt="stamp" className="mt-3" />
        <div className="mx-10 my-5 w-full">
          <div className="flex flex-start flex-col justify-start mb-5 ml-8 w-full">
            <span className="text-medium text-gray-500 font-bold">EVENT</span>
            <span className="text-large text-gray-900 font-bold w-full">
              {event}
            </span>
          </div>
          <div className="flex flex-start flex-col justify-start mb-5 ml-8 w-full">
            <span className="text-medium text-gray-500 font-bold">CREATOR</span>
            <span className="text-large text-gray-900 font-bold w-full">
              {creatorName}
            </span>
          </div>
          <div className="flex flex-start flex-col justify-start mb-5 ml-8 w-full">
            <span className="text-medium text-gray-500 font-bold">
              START TIME (Est.)
            </span>
            <span className="text-large text-gray-900 font-bold w-full">
              {formatDate(startTime)} ({runningTime}분)
            </span>
          </div>
        </div>
        <div
          className={`btn-lg absolute bottom-12 w-[80%] text-center ${canEnter ? "" : "bg-gray-200"}`}
          onClick={handleEnterClick}
          role="presentation"
        >
          <span
            className={`w-full ${canEnter ? "text-white" : "text-gray-700"}`}
          >
            {canEnter ? "팬 미팅 입장하기" : "입장 가능 시간이 아닙니다"}
          </span>
        </div>
        <img
          src={barcode}
          alt="barcode"
          className="absolute bottom-[5px] w-5/6"
        />
      </div>
      {verifying && (
        <FaceVerification
          isOpen={verifying}
          onRequestClose={() => setVerifying(false)}
          onSuccess={() => {
            setVerifying(false);
            navigate(`/ticket/${fanmeetingId}`);
          }}
          fanmeetingId={fanmeetingId}
        />
      )}
    </div>
  );
};

export default Ticket;
