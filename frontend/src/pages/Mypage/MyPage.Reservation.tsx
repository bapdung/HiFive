import { useState, MouseEvent, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import client from "../../client";

import FanmeetingInfo from "../../components/FanmeetingInfo";

type Fanmeeting = {
  fanmeetingId: number;
  title: string;
  posterImg: string;
  creatorName: string;
  startTime: string;
};

type FanmeetingList = Fanmeeting[];

function Reservation() {
  const token = useAuthStore((state) => state.accessToken);

  const [fanmeetingList, setFanmeetingList] = useState<FanmeetingList>([]);
  const [status, setStatus] = useState("scheduled");
  const [sort, setSort] = useState("desc");
  const [top, setTop] = useState(0);

  useEffect(() => {
    const getFanmeeting = async () => {
      const params: {
        sort: string;
        top?: number;
      } = { sort };

      if (top) {
        params.top = top;
      }

      if (token) {
        const response = await client(token).get(
          `api/fanmeeting/${status}/fan`,
          {
            params,
          },
        );

        setFanmeetingList([...fanmeetingList, ...response.data]);
        setTop(top + response.data.length);
      }
    };

    getFanmeeting();
    // eslint-disable-next-line
  }, [token, status, sort]);

  const changeStatus = (e: MouseEvent<HTMLSpanElement>) => {
    const content = e.currentTarget.textContent;

    if (content === "예정 팬미팅") {
      setStatus("scheduled");
    } else if (content === "지난 팬미팅") {
      setStatus("completed");
    }
    setTop(0);
    setFanmeetingList([]);
  };

  const changeSort = (e: MouseEvent<HTMLSpanElement>) => {
    const content = e.currentTarget.textContent;

    if (content === "최신순") {
      setSort("desc");
    } else if (content === "과거순") {
      setSort("asc");
    }
    setTop(0);
    setFanmeetingList([]);
  };

  return (
    <>
      <div className="mt-6">
        <span
          className={`pr-5 mr-5 border-r-2 border-gray-200 text-h4 ${status === "scheduled" ? "text-primary-text" : ""}`}
          onClick={(e) => changeStatus(e)}
          role="presentation"
        >
          예정 팬미팅
        </span>
        <span
          className={`text-h4 ${status === "completed" ? "text-primary-text" : ""}`}
          onClick={(e) => changeStatus(e)}
          role="presentation"
        >
          지난 팬미팅
        </span>
      </div>
      <div className="flex w-full justify-end mr-28 mt-6">
        <span
          className={`mr-2.5 text-medium ${sort === "desc" ? "text-primary-text" : ""}`}
          onClick={(e) => changeSort(e)}
          role="presentation"
        >
          최신순
        </span>
        <span
          className={`text-medium ${sort === "asc" ? "text-primary-text" : ""}`}
          onClick={(e) => changeSort(e)}
          role="presentation"
        >
          과거순
        </span>
      </div>
      <div className="mt-6 flex flex-wrap px-10 box-border justify-start gap-9">
        {fanmeetingList.map((fanmeeting) => (
          <FanmeetingInfo
            fanmeeting={fanmeeting}
            key={fanmeeting.fanmeetingId}
          />
        ))}
      </div>
    </>
  );
}

export default Reservation;
