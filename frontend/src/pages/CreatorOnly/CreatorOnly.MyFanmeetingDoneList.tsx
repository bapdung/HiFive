import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MyFanmeetingItem from "./CreatorOnly.MyFanmeetingItem";
import client from "../../client";
import formatDate from "../../utils/formatDate";
import useAuthStore from "../../store/useAuthStore";

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
  const params = {
    sort: isRecent ? "desc" : "asc",
  };
  const location = useLocation();
  const creatorId = parseInt(location.pathname.split("/")[3], 10);
  const [fanmeetings, setFanmeetings] = useState<Fanmeeting[]>([]);
  const token = useAuthStore((state) => state.accessToken);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchFanmeetings = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await client(token).get(
        `/api/fanmeeting/completed/creator/2`,
        { params },
      );
      setFanmeetings(response.data);
    } catch (error) {
      console.error("Error sending post request:", error);
    }
  };

  useEffect(() => {
    fetchFanmeetings();
  }, [creatorId, fetchFanmeetings, isRecent]);

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
