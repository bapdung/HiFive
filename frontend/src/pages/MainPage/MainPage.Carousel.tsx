import { useState, useEffect } from "react";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

import Ticket from "./MainPage.Ticket";
import stamp from "../../assets/img/ticket-stamp.png";
import barcode from "../../assets/img/ticket-barcode.png";
import prev from "../../assets/icons/preIcon.svg";
import next from "../../assets/icons/nextIcon.svg";

type TicketData = {
  fanmeetingId: number;
  title: string;
  posterImg: string;
  openDate: string;
  startDate: string;
};

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the first actual ticket
  const [tickets, setTickets] = useState<TicketData[]>([]);

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
          }))
          .sort(
            (a: TicketData, b: TicketData) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
          );

        setTickets([
          {
            fanmeetingId: 0,
            title: "",
            posterImg: "",
            openDate: "",
            startDate: "",
          },
          ...fetchedTickets,
          {
            fanmeetingId: -2,
            title: "",
            posterImg: "",
            openDate: "",
            startDate: "",
          },
        ]);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };

    fetchTickets();
  }, [accessToken]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, tickets.length - 2));
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="flex w-full">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (ticketWidth + margin) - ticketWidth / 2}px)`,
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
          disabled={currentIndex === tickets.length - 2}
        >
          <span className="sr-only">Next</span>
          <img src={next} alt="Next" className=" ml-[2px]" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
