import { useState } from "react";
import Ticket from "./MainPage.Ticket";
import poster from "../../assets/img/poster.jpg";
import stamp from "../../assets/img/ticket-stamp.png";
import barcode from "../../assets/img/ticket-barcode.png";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the first actual ticket
  const ticketWidth = 762;
  const margin = 32;

  const tickets = [
    {
      id: 0,
      poster: "",
      stamp: "",
      barcode: "",
      event: "",
      startTime: "",
    },
    {
      id: 1,
      poster,
      stamp,
      barcode,
      event: "하이파이브 한 번 해요! by Dasut and Hana",
      startTime: "2024.07.31 20:00 (2H)",
    },
    {
      id: 2,
      poster,
      stamp,
      barcode,
      event: "하이파이브 한 번 해요! by Dasut and Hana",
      startTime: "2024.07.31 20:00 (2H)",
    },
    {
      id: 3,
      poster,
      stamp,
      barcode,
      event: "하이파이브 한 번 해요! by Dasut and Hana",
      startTime: "2024.07.31 20:00 (2H)",
    },
    {
      id: 3,
      poster,
      stamp,
      barcode,
      event: "하이파이브 한 번 해요! by Dasut and Hana",
      startTime: "2024.07.31 20:00 (2H)",
    },
    {
      id: 4,
      poster: "",
      stamp: "",
      barcode: "",
      event: "",
      startTime: "",
    },
  ];

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, tickets.length - 2));
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="flex overflow-hidden w-[1524px]">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (ticketWidth + margin) - ticketWidth / 2}px)`,
          }}
        >
          {tickets.map((ticket, index) => (
            <Ticket
              key={ticket.id}
              poster={ticket.poster}
              stamp={ticket.stamp}
              barcode={ticket.barcode}
              event={ticket.event}
              startTime={ticket.startTime}
              isActive={index === currentIndex}
            />
          ))}
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={handlePrevClick}
          className=" bg-gray-200 text-gray-900 px-2 rounded-full mr-3"
          disabled={currentIndex === 1}
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className=" bg-gray-200 text-gray-900 px-2 rounded-full"
          disabled={currentIndex === tickets.length - 2}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
