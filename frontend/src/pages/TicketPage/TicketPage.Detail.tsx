import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import TimeTable from "./TicketPage.DetailTimetable";
import Info from "./TicketPage.DetailInfo";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";
import webSocketService from "../../service/websocket";
import Payment from "./TicketPage.PaymentModal";
import WaitingModal from "./TicketPage.WaitingModal";
import SuccessModal from "./TicketPage.SuccessModal";
import FailureModal from "./TicketPage.FailureModal";
import { da } from "date-fns/locale";

interface TimeTableItem {
  categoryName: string;
  sequence: number;
  detail: string;
}

interface FanMeetingDetails {
  creatorId: number;
  memberId: number;
  creatorImg: string;
  creatorName: string;
  posterImg: string;
  title: string;
  notice: string;
  startDate: Date;
  openDate: Date;
  runningTime: number;
  price: number;
  participant: number;
  remainingTickets: number;
  reservation: boolean;
  timetable: TimeTableItem[];
}

interface ReservationMemberDto {
  nickname: string;
  email: string;
}

interface WebSocketMessage {
  message: string;
  event: string;
}

function Detail() {
  const { fanmeetingId } = useParams<{ fanmeetingId: string }>();
  const [isReserved, setIsReserved] = useState(false);
  const [fanMeetingDetails, setFanMeetingDetails] =
    useState<FanMeetingDetails | null>(null);
  const [reservationMember, setReservationMember] =
    useState<ReservationMemberDto | null>(null);
  const [currentQueueSize, setCurrentQueueSize] = useState<number | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showWaitingModal, setShowWaitingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchFanmeetingDetails = async () => {
      try {
        if (token && fanmeetingId) {
          const response = await client(token).get<FanMeetingDetails>(
            `/api/fanmeeting/${fanmeetingId}`,
          );
          const { data } = response;
          data.startDate = new Date(data.startDate);
          data.openDate = new Date(data.openDate);

          setFanMeetingDetails(data);
          setIsReserved(data.reservation);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchFanmeetingDetails();

    const handleWebSocketMessage = (data: WebSocketMessage) => {
      console.log("WebSocket Message Received:", data);
      if (data.event === "currentQueueSize") {
        console.log(data.event);
        const queueSize = parseInt(data.message.split(":")[1].trim(), 10);
        console.log(queueSize);
        setCurrentQueueSize(queueSize);
        setShowWaitingModal(true);
      } else if (data.event === "moveToPayment") {
        console.log(data.event);
        webSocketService.disconnect();
        setShowWaitingModal(false);
        setShowPaymentModal(true);
      } else if (data.event === "alreadyReserved") {
        console.log(data.event);
        alert(data.message);
      }
    };

    webSocketService.addListener("moveToPayment", handleWebSocketMessage);
    webSocketService.addListener("currentQueueSize", handleWebSocketMessage);
    webSocketService.addListener("alreadyReserved", handleWebSocketMessage);

    return () => {
      webSocketService.removeListener("moveToPayment", handleWebSocketMessage);
      webSocketService.removeListener(
        "currentQueueSize",
        handleWebSocketMessage,
      );
      webSocketService.removeListener(
        "alreadyReserved",
        handleWebSocketMessage,
      );
    };
  }, [token, fanmeetingId]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (fanMeetingDetails) {
      const updateRemainingTime = () => {
        const now = new Date().getTime();
        const openDate = new Date(fanMeetingDetails.openDate).getTime();
        const timeDiff = openDate - now;

        if (timeDiff > 0) {
          const hours = Math.floor(timeDiff / (1000 * 60 * 60));
          const day = Math.floor(hours / 24);
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          if (day > 0) {
            setTimeRemaining(`D-${day}`);
          } else {
            setTimeRemaining(`${hours}시간 ${minutes}분 ${seconds}초`);
          }
        } else {
          setTimeRemaining("");
        }
      };

      updateRemainingTime();
      const timer = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(timer);
    }
  }, [fanMeetingDetails]);

  async function toggleReserved() {
    if (!isReserved && fanMeetingDetails && token && fanmeetingId) {
      try {
        webSocketService.connect(
          fanMeetingDetails.memberId.toString(),
          fanmeetingId,
        );

        console.log(fanMeetingDetails.memberId.toString(), fanmeetingId);

        const response = await client(token).post<ReservationMemberDto>(
          `/api/reservation/${fanmeetingId}`,
        );

        const { nickname, email } = response.data;
        setReservationMember({ nickname, email });

        webSocketService.sendMessage(
          JSON.stringify({
            event: "reserve",
            memberId: fanMeetingDetails.memberId,
            fanMeetingId: fanmeetingId,
          }),
        );
      } catch (error) {
        console.error("Error during reservation:", error);
      }
    }
  }

  async function handlePayment() {
    try {
      // 결제 로직 추가
      setShowPaymentModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setShowPaymentModal(false);
      setShowFailureModal(true);
    }
  }

  if (!fanMeetingDetails) {
    return null;
  }

  const now = new Date();
  const isPastEvent = new Date(fanMeetingDetails.startDate) < now;

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "short" });
    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const startDate = new Date(fanMeetingDetails.startDate);
  const formattedStartDate = `${formatDate(startDate)} ${formatTime(startDate)}`;
  const cancelDeadline = new Date(startDate.getTime() - 23 * 60 * 60 * 1000);
  const formattedCancelDeadline = `${cancelDeadline.getFullYear()}년 ${cancelDeadline.getMonth() + 1}월 ${cancelDeadline.getDate()}일 ${cancelDeadline.getHours()}시`;

  const renderReservationButton = () => {
    if (fanMeetingDetails.remainingTickets === 0) {
      return (
        <button type="button" className="btn-gray w-full mt-5" disabled>
          매진
        </button>
      );
    }

    if (timeRemaining) {
      return (
        <button type="button" className="btn-light-lg w-full mt-5" disabled>
          예매 시작까지 {timeRemaining}
        </button>
      );
    }

    return (
      <button
        type="button"
        className="btn-lg w-full mt-5"
        onClick={toggleReserved}
      >
        예매하기
      </button>
    );
  };

  return (
    <div className="my-10 flex justify-center w-full">
      {showPaymentModal && reservationMember && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <Payment
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            fanmeetingId={fanmeetingId!}
            nickname={reservationMember.nickname}
            email={reservationMember.email}
            title={fanMeetingDetails.title}
            startDate={formattedStartDate}
            cancelDeadline={formattedCancelDeadline}
            onClose={() => setShowPaymentModal(false)}
            // eslint-disable-next-line react/jsx-no-bind
            onPayment={handlePayment}
          />
        </div>
      )}
      {showWaitingModal &&
        currentQueueSize !== null &&
        currentQueueSize > 0 && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <WaitingModal queueSize={currentQueueSize} />
          </div>
        )}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <SuccessModal memberId={fanMeetingDetails.memberId} />
        </div>
      )}
      {showFailureModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <FailureModal onClose={() => setShowFailureModal(false)} />
        </div>
      )}
      <div className="w-[60%] bg-white rounded-[25px] p-10">
        <div className="w-full flex">
          <img
            src={fanMeetingDetails.posterImg}
            alt="poster-img"
            className="w-[35%] mr-10 max-h-80 max-w-[30%]"
          />
          <div>
            <h1 className="text-h3 text-gray-900">{fanMeetingDetails.title}</h1>
            <p className="text-large text-gray-700 mb-6 mt-0.5">
              {fanMeetingDetails.creatorName} 님의 HiFive 온라인 팬미팅
            </p>
            <div className="bg-gray-100 px-8 py-6 rounded-[20px]">
              <div className="flex">
                <img
                  className="w-24 h-24 rounded-full"
                  src={fanMeetingDetails.creatorImg}
                  alt="profile-img"
                />
                <div className="ml-8 mt-auto mb-auto">
                  <p className="text-gray-700 text-large">
                    크리에이터{" "}
                    <span className="text-gray-800">
                      {fanMeetingDetails.creatorName}
                    </span>
                  </p>
                  <button className="btn-light-md mt-1.5" type="button">
                    <Link to={`/creator/${fanMeetingDetails.creatorId}`}>
                      프로필 보러가기
                    </Link>
                  </button>
                </div>
              </div>
              <p className="mt-6 text-gray-900 text-medium">
                {fanMeetingDetails.notice}
              </p>
            </div>
          </div>
        </div>
        <TimeTable timetable={fanMeetingDetails.timetable} />
        <Info />
      </div>
      <div className="bg-white rounded-[25px] p-10 ml-8 max-w-[23%] h-fit sticky top-4">
        {isPastEvent ? (
          <div className="text-center">
            <h3 className="text-h3 mb-12">{fanMeetingDetails.title}</h3>
            <div className="bg-gray-100 rounded-xl py-3">
              <h4 className="text-h4 mb-3">판매 종료</h4>
              <p className="text-large text-gray-700">
                본 상품은 판매 종료되었습니다.
              </p>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-h3 mb-12">{fanMeetingDetails.title}</h3>
            <div>
              <p className="flex mb-2.5">
                <span className="w-20 text-gray-700">행사일</span>
                <span>
                  {formatDate(fanMeetingDetails.startDate)}{" "}
                  {formatTime(fanMeetingDetails.startDate)}
                </span>
              </p>
              <p className="flex mb-2.5">
                <span className="w-20 text-gray-700">예매일</span>
                <span>
                  {formatDate(fanMeetingDetails.openDate)}{" "}
                  {formatTime(fanMeetingDetails.openDate)}
                </span>
              </p>
              <p className="flex mb-2.5">
                <span className="w-20 text-gray-700">진행시간</span>
                <span>{fanMeetingDetails.runningTime}분</span>
              </p>
              <p className="flex mb-2.5">
                <span className="w-20 text-gray-700">참가인원</span>
                <span>{fanMeetingDetails.participant}명</span>
              </p>
              <p className="flex mb-2.5">
                <span className="w-20 text-gray-700">가격</span>
                <span>{fanMeetingDetails.price}원</span>
              </p>
            </div>
            {isReserved ? (
              <div id="reserved" className="mt-10">
                <div className="bg-gray-100 rounded-[10px] flex flex-col items-center w-full p-2">
                  <p className="text-gray-500 my-2.5 text-sm">
                    아래 링크를 통해 질문과 사연을 남겨주세요.
                  </p>
                  <div className="mb-2.5">
                    <button
                      type="button"
                      className="mr-6 btn-outline-md"
                      onClick={() =>
                        navigate(`/fanmeeting/${fanmeetingId}/question`)
                      }
                    >
                      질문 작성
                    </button>
                    <button
                      type="button"
                      className="btn-outline-md"
                      onClick={() =>
                        navigate(`/fanmeeting/${fanmeetingId}/story`)
                      }
                    >
                      사연 작성
                    </button>
                  </div>
                </div>
                <button
                  onClick={toggleReserved}
                  type="button"
                  className="btn-light-lg w-full mt-8"
                >
                  예매완료
                </button>
              </div>
            ) : (
              <div id="notReserved" className="mt-20">
                <p className="text-gray-500 text-sm text-center mb-1">
                  잠깐! 예매 전 하단의 예매 안내 사항을 꼭 읽어주세요!
                </p>
                {renderReservationButton()}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Detail;
