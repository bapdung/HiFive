// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import MyFanmeetingItem from "./CreatorOnly.MyFanmeetingItem";
import client from "../../client";
// import useOnMounted from "../../utils/useOnMounted";

interface Fanmeeting {
  title: string;
  fanmeetingId: number;
  posterImg: string;
  startDate: string;
}

function MyFanmeetingPreList() {
  // const location = useLocation();
  // const creatorId = parseInt(location.pathname.split("/")[3], 10);
  const [prevFanmeetings, setPrevFanmeetings] = useState<Fanmeeting[]>([]);
  const fetchPrevFanmeetings = async () => {
    const token = process.env.REACT_APP_AUTHORIZATION as string;
    try {
      if (!token) {
        return;
      }
      const response = await client(token).get(
        `/api/fanmeeting/scheduled/creator/2`,
      );
      console.log("확인");
      setPrevFanmeetings(response.data);
      console.log(prevFanmeetings);
    } catch (error) {
      console.error("Error sending post request:", error);
    }
  };
  useEffect(() => {
    fetchPrevFanmeetings();
  }, []);

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
      {prevFanmeetings.length === 0 ? (
        <p className="text-xl text-gray-500 mr-auto ml-auto my-5">
          생성한 팬미팅이 없습니다.
        </p>
      ) : null}
      {prevFanmeetings.map((fanmeeting) => (
        <MyFanmeetingItem
          key={fanmeeting.fanmeetingId}
          title={fanmeeting.title}
          fanmeetingId={fanmeeting.fanmeetingId}
          posterImg={fanmeeting.posterImg}
          startDate={formatDate(fanmeeting.startDate)}
          isDone={false}
        />
      ))}
    </div>
  );
}

export default MyFanmeetingPreList;
