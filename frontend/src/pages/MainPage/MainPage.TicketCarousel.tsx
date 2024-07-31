import { useState } from "react";
import TicketActual from "./MainPage.TicketActual";
import poster from "../../assets/img/poster.jpg";
import stamp from "../../assets/img/ticket-stamp.png";
import barcode from "../../assets/img/ticket-barcode.png";

interface Ticket {
  id: number;
  poster: string;
  stamp: string;
  barcode: string;
  event: string;
  startTime: string;
}

const tickets: Ticket[] = [
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
];

const TicketCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tickets.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === tickets.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {tickets.map((ticket, index) => (
          <TicketActual
            key={ticket.id}
            poster={ticket.poster}
            stamp={ticket.stamp}
            barcode={ticket.barcode}
            event={ticket.event}
            startTime={ticket.startTime}
            isFocused={index === currentIndex}
          />
        ))}
      </div>
      <div>
        <button
          type="button"
          onClick={handlePrevClick}
          className="mx-2 p-2 bg-gray-200 rounded"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="mx-2 p-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TicketCarousel;
