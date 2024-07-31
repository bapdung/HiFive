import { useLocation } from "react-router-dom";
import { useState } from "react";

import MyFanmeetingItem from "./CreatorOnly.MyFanmeetingItem";
import client from "../../client";
import useOnMounted from "../../utils/useOnMounted";

interface Fanmeeting {
  title: string;
  posterImg: string;
  startDate: string;
}

function MyFanmeetingPreList() {
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
        `/api/fanmeeting/completed/creator/${creatorId}`,
      );
      setFanmeetings(response.data);
      console.log(fanmeetings);
    } catch (error) {
      console.error("Error sending post request:", error);
    }
  };
  useOnMounted(() => fetchFanmeetings);
  return (
    <div className="w-full flex flex-wrap">
      {fanmeetings.length === 0 ? (
        <p className="text-xl text-gray-500 mr-auto ml-auto my-5">
          생성한 팬미팅이 없습니다.
        </p>
      ) : null}
      {fanmeetings.map((fanmeeting) => (
        <MyFanmeetingItem
          key={fanmeeting.title}
          title={fanmeeting.title}
          posterImg={fanmeeting.posterImg}
          startDate={fanmeeting.startDate}
          isDone={false}
        />
      ))}
    </div>
  );
}

export default MyFanmeetingPreList;
