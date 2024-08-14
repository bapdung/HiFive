import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React, { forwardRef } from "react";

interface MyFanmeetingItemProps {
  isDone: boolean;
  title: string;
  posterImg: string;
  startDate: string;
  fanmeetingId: number;
  // eslint-disable-next-line react/require-default-props
  realStartDate?: string;
}

const MyFanmeetingItem = forwardRef<HTMLDivElement, MyFanmeetingItemProps>(
  (
    { isDone, title, fanmeetingId, posterImg, startDate, realStartDate = "" },
    ref,
  ) => {
    const navigate = useNavigate();
    const navigateToSettings = () => {
      navigate(`/creator-only/${fanmeetingId}/question`);
    };
    const check30Minutes = () => {
      if (!realStartDate) {
        return false;
      }
      const startDateTime = new Date(realStartDate);
      const currentDateTime = new Date();

      const diffTime: number =
        startDateTime.getTime() - currentDateTime.getTime();
      const standardTime = 30 * 60 * 1000; // 30분
      console.log(diffTime);
      console.log(realStartDate);
      return diffTime > 0 && diffTime <= standardTime;
    };
    return (
      <div
        ref={ref}
        className="w-[18%] flex flex-col items-center m-3 flex-shrink-0"
      >
        <img
          src={posterImg}
          alt="poster-img"
          className={isDone ? "rounded-[10px] brightness-50" : "rounded-[10px]"}
        />

        <h1 className="text-h6 mt-1">{title}</h1>
        <h2 className="text-medium text-gray-500">{startDate}</h2>

        {check30Minutes() ? (
          <button
            type="button"
            className="creator-btn-md w-full mt-3"
            onClick={() => navigate(`/meet-up/${fanmeetingId}`)}
          >
            팬미팅 시작하기
          </button>
        ) : (
          <button
            type="button"
            className="creator-btn-light-md w-full mt-3"
            onClick={navigateToSettings}
          >
            팬미팅 관리
          </button>
        )}
      </div>
    );
  },
);

MyFanmeetingItem.displayName = "MyFanmeetingItem";

MyFanmeetingItem.propTypes = {
  isDone: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  posterImg: propTypes.string.isRequired,
  startDate: propTypes.string.isRequired,
  fanmeetingId: propTypes.number.isRequired,
};

export default MyFanmeetingItem;
