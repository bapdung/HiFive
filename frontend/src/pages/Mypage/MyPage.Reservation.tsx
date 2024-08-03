import { useState, MouseEvent } from "react";
import useAuthStore from "../../store/useAuthStore";
import client from "../../client";

import FanmeetingInfo from "../../components/FanmeetingInfo";

type FanmeetingInfo = {
  fanmeetingId: number;
  title: string;
  creatorName: string;
  startTime: string;
};

type FanmeetingList = FanmeetingInfo[];

function Reservation() {
  const token = useAuthStore((state) => state.accessToken);

  const [fanmeeting, setFanmeeting] = useState<FanmeetingList>([]);
  const [status, setStatus] = useState("scheduled");
  const [sort, setSort] = useState("desc");
  const [top, setTop] = useState(0);

  const getFanmeeting = async () => {
    const params: {
      sort: string;
      top?: number;
    } = { sort };

    if (token) {
      const response: FanmeetingList = await client(token).get(
        `api/fanmeeting/${status}/fan`,
        { params },
      );
      setFanmeeting(response);

      if (fanmeeting) {
        setTop(fanmeeting.length);
      }
      params.top = top;
      console.log(fanmeeting);
    }
  };

  const changeStatus = (e: MouseEvent<HTMLSpanElement>) => {
    const content = e.currentTarget.textContent;

    if (content === "예정 팬미팅") {
      setStatus("scheduled");
    } else if (content === "지난 팬미팅") {
      setStatus("completed");
    }

    getFanmeeting();
  };

  const changeSort = (e: MouseEvent<HTMLSpanElement>) => {
    const content = e.currentTarget.textContent;

    if (content === "최신순") {
      setSort("desc");
    } else if (content === "과거순") {
      setSort("asc");
    }

    getFanmeeting();
  };

  return (
    <>
      <div className="mt-6">
        <span
          className="text-primary-text pr-5 mr-5 border-r-2 border-gray-200 text-h4"
          onClick={(e) => changeStatus(e)}
          role="presentation"
        >
          예정 팬미팅
        </span>
        <span
          className="text-h4"
          onClick={(e) => changeStatus(e)}
          role="presentation"
        >
          지난 팬미팅
        </span>
      </div>
      <div className="flex w-full justify-end mr-28 mt-6">
        <span
          className="mr-2.5 text-primary-text text-medium"
          onClick={(e) => changeSort(e)}
          role="presentation"
        >
          최신순
        </span>
        <span
          className="text-medium"
          onClick={(e) => changeSort(e)}
          role="presentation"
        >
          과거순
        </span>
      </div>
      <div className="mt-6 flex flex-wrap px-10 box-border justify-start gap-9">
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
        <FanmeetingInfo />
      </div>
    </>
  );
}

export default Reservation;
