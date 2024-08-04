import { useState, useEffect, useCallback, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const token = useAuthStore((state) => state.accessToken);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // 팬미팅 데이터를 불러오는 함수
  const fetchFanmeetings = useCallback(
    async (reset = false) => {
      if (!userId) {
        return;
      }
      if (isLoading || isEnd || !token) return;

      try {
        setIsLoading(true);

        const params: FetchParams = {
          sort: isRecent ? "desc" : "asc",
        };
        console.log(fanmeetings.length);
        if (fanmeetings.length !== 0) {
          params.top = fanmeetings[fanmeetings.length - 1].fanmeetingId;
          console.log("top설정");
        }
        console.log(params);
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
      } catch (error) {
        console.error("Error fetching fanmeetings:", error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token, isRecent, userId],
  );

  // Intersection Observer 설정
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !isEnd) {
          fetchFanmeetings(false);
        }
      },
      { threshold: 1 },
    );

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [fetchFanmeetings, isLoading, isEnd]);

  // isRecent가 변경될 때 데이터를 다시 불러오기 위한 useEffect 훅
  useEffect(() => {
    setFanmeetings([]);
    setIsEnd(false);
    fetchFanmeetings(true);
  }, [isRecent, fetchFanmeetings]);

  // 초기 렌더링 시 데이터를 불러오기 위한 useEffect 훅
  useEffect(() => {
    if (userId && token) {
      fetchFanmeetings(true);
    }
  }, [userId, token, fetchFanmeetings]);

  return (
    <div className="w-full flex flex-wrap">
      {fanmeetings.length === 0 && !isLoading ? (
        <p className="mr-auto ml-auto text-xl my-5 text-gray-500">
          종료된 팬미팅이 없습니다.
        </p>
      ) : null}
      {fanmeetings.map((fanmeeting, index) => (
        <MyFanmeetingItem
          key={fanmeeting.fanmeetingId}
          isDone
          fanmeetingId={fanmeeting.fanmeetingId}
          title={fanmeeting.title}
          posterImg={fanmeeting.posterImg}
          startDate={formatDate(fanmeeting.startDate)}
          ref={index === fanmeetings.length - 1 ? lastElementRef : null}
        />
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

MyFanmeetingDoneList.propTypes = {
  isRecent: PropTypes.bool.isRequired,
};

export default MyFanmeetingDoneList;
