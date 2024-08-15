import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import MyFanmeetingItem from "./CreatorOnly.MyFanmeetingItem";
import client from "../../client";
import formatDate from "../../utils/formatDate";
import useAuthStore from "../../store/useAuthStore";

interface MyFanmeetingDoneListProps {
  isRecent: boolean;
  userId: number | null;
}

interface Fanmeeting {
  title: string;
  posterImg: string;
  startDate: string;
  fanmeetingId: number;
}

interface FetchParams {
  sort: string;
  top?: number;
}

const MyFanmeetingDoneList: React.FC<MyFanmeetingDoneListProps> = ({
  isRecent,
  userId,
}) => {
  const [fanmeetings, setFanmeetings] = useState<Fanmeeting[]>([]);
  const [isEnd, setIsEnd] = useState(false);
  const [top, setTop] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAuthStore((state) => state.accessToken);

  const fetchFanmeetings = useCallback(
    async (reset = false) => {
      if (!userId) return;
      if (isEnd || !token || isLoading) return;

      try {
        setIsLoading(true);
        console.log("Fetching fanmeetings...");

        let newTop = top;
        if (fanmeetings.length > 0 && !reset) {
          newTop = fanmeetings[fanmeetings.length - 1].fanmeetingId;
        }

        const params: FetchParams = {
          sort: isRecent ? "desc" : "asc",
          top: newTop,
        };

        const response = await client(token).get(
          `/api/fanmeeting/completed/creator/${userId}`,
          { params },
        );

        if (response.data.length < 10) {
          setIsEnd(true); // 더 이상 불러올 데이터가 없음을 표시
        }

        setFanmeetings((prev) =>
          reset ? response.data : [...prev, ...response.data],
        );

        if (response.data.length > 0) {
          setTop(response.data[response.data.length - 1].fanmeetingId);
        }
      } catch (error) {
        console.error("Error fetching fanmeetings:", error);
      } finally {
        setIsLoading(false);
        console.log("Loading finished.");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token, userId, isRecent, isEnd, top, fanmeetings.length, isLoading],
  );

  // isRecent가 변경될 때 데이터를 다시 불러오기 위한 useEffect 훅
  useEffect(() => {
    console.log("isRecent changed, resetting data...");
    setFanmeetings([]);
    setTop(undefined);
    setIsEnd(false);
    fetchFanmeetings(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecent]);

  // 초기 렌더링 시 데이터를 불러오기 위한 useEffect 훅
  useEffect(() => {
    if (userId && token) {
      console.log("Initial load...");
      fetchFanmeetings(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token]);

  // 스크롤 이벤트를 감지하여 무한 스크롤 구현
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        console.log("Scroll detected, loading more...");
        fetchFanmeetings(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchFanmeetings, isEnd]);

  return (
    <div className="w-full flex flex-col items-center">
      {fanmeetings.length === 0 && !isLoading ? (
        <p className="mr-auto ml-auto text-xl my-5 text-gray-500">
          종료된 팬미팅이 없습니다.
        </p>
      ) : null}
      <div className="max-w-[1200px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-6 my-10">
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
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

MyFanmeetingDoneList.propTypes = {
  isRecent: PropTypes.bool.isRequired,
};

export default MyFanmeetingDoneList;
