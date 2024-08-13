import { useState, useEffect } from "react";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

import Ticket from "./MainPage.Ticket";
import stamp from "../../assets/img/ticket-stamp.png";
import barcode from "../../assets/img/ticket-barcode.png";
import prev from "../../assets/icons/preIcon.svg";
import next from "../../assets/icons/nextIcon.svg";
import noContent from "../../assets/img/nocontent.png";

type TicketData = {
  fanmeetingId: number;
  title: string;
  posterImg: string;
  openDate: string;
  startDate: string;
  runningTime: number;
  creatorName: string;
};

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = useAuthStore((state) => state.accessToken);

  const ticketWidth = 660;
  const margin = 60.5;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const apiClient = client(accessToken || "");
        const response = await apiClient.get("/api/fanmeeting/scheduled/fan");
        const fetchedTickets = response.data
          .map((ticket: TicketData) => ({
            fanmeetingId: ticket.fanmeetingId,
            title: ticket.title,
            posterImg: ticket.posterImg,
            openDate: ticket.openDate,
            startDate: ticket.startDate,
            runningTime: ticket.runningTime,
            creatorName: ticket.creatorName,
          }))
          .sort(
            (a: TicketData, b: TicketData) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
          );

        setTickets(fetchedTickets);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [accessToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col w-full items-center justify-center mt-12">
        <img src={noContent} alt="nocontent" className="w-72" />
        <span className="text-medium my-8 text-center text-white">
          높이 날며 찾아 봤지만, 아무 것도 찾지 못했어요...
        </span>
      </div>
    );
  }

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, tickets.length - 1));
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="flex w-full">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${
              currentIndex * (ticketWidth + margin) - ticketWidth / 2
            }px)`,
          }}
        >
          {tickets.map((ticket, index) => (
            <Ticket
              key={ticket.fanmeetingId}
              fanmeetingId={ticket.fanmeetingId}
              poster={ticket.posterImg || ""}
              stamp={stamp}
              barcode={barcode}
              event={ticket.title}
              startTime={ticket.startDate}
              isActive={index === currentIndex}
              runningTime={ticket.runningTime}
              creatorName={ticket.creatorName}
            />
          ))}
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={handlePrevClick}
          className=" bg-gray-100 text-gray-900 px-[1px] py-[1px] rounded-full mr-5"
          disabled={currentIndex === 1}
        >
          <span className="sr-only">Previous</span>
          <img src={prev} alt="Previous" className=" mr-[2px]" />
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className=" bg-gray-100 text-gray-900 px-[1px] py-[1px] rounded-full"
          disabled={currentIndex === tickets.length}
        >
          <span className="sr-only">Next</span>
          <img src={next} alt="Next" className=" ml-[2px]" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
