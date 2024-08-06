import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import client from "../../client";

import FanmeetingInfo from "../../components/FanmeetingInfo";
import preIcon from "../../assets/icons/preIcon.svg";
import nextIcon from "../../assets/icons/nextIcon.svg";

type FanmeetingInfo = {
  fanmeetingId: number;
  title: string;
  posterImg: string;
  openDate: string;
  startDate: string;
  runningTime: number;
};

function Fanmeeting() {
  const token = useAuthStore((state) => state.accessToken);
  const { creatorId } = useParams();

  const [status, setStatus] = useState<"scheduled" | "completed">("scheduled");
  const [fanmeetingList, setFanmeetingList] = useState<FanmeetingInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const changeStatus = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const content = e.currentTarget.textContent;

    if (content === "예정된 팬미팅") {
      setStatus("scheduled");
    } else if (content === "종료된 팬미팅") {
      setStatus("completed");
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < fanmeetingList.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const getFanmeetingList = async () => {
      if (token) {
        const response = await client(token).get(
          `/api/fanmeeting/${status}/creator/${creatorId}`,
        );
        setFanmeetingList(response.data);
        setCurrentPage(0);
      }
    };

    getFanmeetingList();
  }, [creatorId, token, status]);

  const startIndex = currentPage * itemsPerPage;
  const currentFanmeetingList = fanmeetingList.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <>
      <div className="flex justify-center mb-7">
        <span
          className={`text-h4 mr-5 hover:cursor-pointer ${
            status === "scheduled" ? "text-primary-text" : ""
          }`}
          onClick={(e) => changeStatus(e)}
          role="presentation"
        >
          예정된 팬미팅
        </span>
        <span
          className={`text-h4 hover:cursor-pointer ${
            status === "completed" ? "text-primary-text" : ""
          }`}
          onClick={(e) => changeStatus(e)}
          role="presentation"
        >
          종료된 팬미팅
        </span>
      </div>
      {fanmeetingList.length > 0 ? (
        <div className="flex w-full justify-start relative gap-8">
          <div
            className="w-12 h-12 bg-white text-h3 rounded-full flex justify-center items-center absolute left-[-30px] top-[120px] cursor-pointer"
            onClick={handlePrevPage}
            role="presentation"
          >
            <img src={preIcon} alt="이전버튼" />
          </div>
          {currentFanmeetingList.map((fanmeeting) => (
            <FanmeetingInfo
              fanmeeting={fanmeeting}
              key={fanmeeting.fanmeetingId}
            />
          ))}
          <div
            className="w-12 h-12 bg-white text-h3 rounded-full flex justify-center items-center absolute right-[-30px] top-[120px] cursor-pointer"
            onClick={handleNextPage}
            role="presentation"
          >
            <img src={nextIcon} alt="다음버튼" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">팬미팅 내역이 없습니다.</div>
      )}
    </>
  );
}

export default Fanmeeting;
