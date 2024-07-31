import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MyFanmeetingItem from "./CreatorOnly.MyFanmeetingItem";
import client from "../../client";
import useOnMounted from "../../utils/useOnMounted";

interface MyFanmeetingDoneListProps {
  isRecent: boolean;
}
interface Fanmeeting {
  title: string;
  posterImg: string;
  startDate: string;
}

const MyFanmeetingDoneList: React.FC<MyFanmeetingDoneListProps> = ({
  isRecent,
}) => {
  const location = useLocation();
  const creatorId = parseInt(location.pathname.split("/")[3], 10);
  const [fanmeetings, setFanmeetings] = useState<Fanmeeting[]>([]);
  const fetchFanmeetings = async () => {
    const token = process.env.REACT_APP_AUTHORIZATION as string;
    const params = {
      sort: isRecent ? "desc" : "asc",
      top: 0,
    };
    try {
      if (!token) {
        return;
      }
      const response = await client(token).get(
        `/api/fanmeeting/completed/creator/${creatorId}`,
        { params },
      );
      setFanmeetings(response.data);
      console.log(fanmeetings);
    } catch (error) {
      console.error("Error sending post request:", error);
    }
  };
  useOnMounted(() => fetchFanmeetings);

  useEffect(() => {
    fetchFanmeetings();
  }, [creatorId, isRecent]);

  return (
    <div className="w-full flex flex-wrap">
      {fanmeetings.length === 0 ? (
        <p className="mr-auto ml-auto text-xl my-5 text-gray-500">
          종료된 팬미팅이 없습니다.
        </p>
      ) : null}
      {fanmeetings.map((fanmeeting) => (
        <MyFanmeetingItem
          key={fanmeeting.title}
          isDone
          title={fanmeeting.title}
          posterImg={fanmeeting.posterImg}
          startDate={fanmeeting.startDate}
        />
      ))}
    </div>
  );
};
MyFanmeetingDoneList.propTypes = {
  isRecent: PropTypes.bool.isRequired,
};

export default MyFanmeetingDoneList;
