import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MyFanmeetingItem from "./CreatorOnly.MyFanmeetingItem";
import client from "../../client";

interface MyFanmeetingDoneListProps {
  isRecent: boolean;
}
interface Fanmeeting {
  title: string;
  posterImg: string;
  startDate: string;
  fanmeetingId: number;
}

const MyFanmeetingDoneList: React.FC<MyFanmeetingDoneListProps> = ({
  isRecent,
}) => {
  // const [lastFanmeeting, setLastFanmeeting] = useState<number | null>();
  const params = {
    sort: isRecent ? "desc" : "asc",
  };
  const location = useLocation();
  const creatorId = parseInt(location.pathname.split("/")[3], 10);
  const [fanmeetings, setFanmeetings] = useState<Fanmeeting[]>([]);
  const fetchFanmeetings = async () => {
    const token = process.env.REACT_APP_AUTHORIZATION as string;
    try {
      if (!token) {
        return;
      }
      const response = await client(token).get(
        `/api/fanmeeting/completed/creator/2`,
        { params },
      );
      setFanmeetings(response.data);
      if (response.data.length > 0) {
        // setLastFanmeeting(response.data[response.data.length - 1].fanmeetingId);
      }
    } catch (error) {
      console.error("Error sending post request:", error);
    }
  };

  useEffect(() => {
    fetchFanmeetings();
  }, [creatorId, isRecent]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0");

    const weekDayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const weekDay = weekDayNames[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${weekDay})`;
  };

  return (
    <div className="w-full flex flex-wrap">
      {fanmeetings.length === 0 ? (
        <p className="mr-auto ml-auto text-xl my-5 text-gray-500">
          종료된 팬미팅이 없습니다.
        </p>
      ) : null}
      {fanmeetings.map((fanmeeting) => (
        <MyFanmeetingItem
          key={fanmeeting.fanmeetingId}
          isDone
          fanmeetingId={fanmeeting.fanmeetingId}
          title={fanmeeting.title}
          posterImg={fanmeeting.posterImg}
          startDate={formatDate(fanmeeting.startDate)}
        />
      ))}
    </div>
  );
};
MyFanmeetingDoneList.propTypes = {
  isRecent: PropTypes.bool.isRequired,
};

export default MyFanmeetingDoneList;
