import { useState, MouseEvent, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import client from "../../client";

import FanmeetingInfo from "../../components/FanmeetingInfo";

type Fanmeeting = {
  fanmeetingId: number;
  title: string;
  posterImg: string;
  openDate: string;
  startDate: string;
  runningTime: number;
};

type FanmeetingList = Fanmeeting[];

function Reservation() {
  const token = useAuthStore((state) => state.accessToken);

  const [fanmeetingList, setFanmeetingList] = useState<FanmeetingList>([]);
  const [status, setStatus] = useState("scheduled");
  const [sort, setSort] = useState("desc");

  useEffect(() => {
    const getFanmeeting = async () => {
      const params: {
        sort: string;
      } = { sort };

      if (token) {
        const response = await client(token).get(
          `api/fanmeeting/${status}/fan`,
          {
            params,
          },
        );

        setFanmeetingList(response.data);
      }
    };

    getFanmeeting();
    // eslint-disable-next-line
  }, [token, status, sort]);

  const changeStatus = (e: MouseEvent<HTMLSpanElement>) => {
    const content = e.currentTarget.textContent;

    if (content === "예정 팬미팅") {
      setStatus("scheduled");
      setSort("asc");
    } else if (content === "지난 팬미팅") {
      setStatus("completed");
    }
    setFanmeetingList([]);
  };

  const changeSort = (e: MouseEvent<HTMLSpanElement>) => {
    const content = e.currentTarget.textContent;

    if (content === "최신순") {
      setSort("desc");
    } else if (content === "과거순") {
      setSort("asc");
    }
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
        {status === "scheduled" ? (
          ""
        ) : (
          <>
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
          </>
        )}
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
