import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

import searchIcon from "../../assets/icons/searchIcon.png";

interface FanMeeting {
  fanmeetingId: number;
  title: string;
  posterImg: string;
  openDate: string;
  startDate: string;
  runningTime: number;
}

type Param = {
  name?: string;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function MeetingList() {
  const [fanMeetings, setFanMeetings] = useState<FanMeeting[]>([]);
  const accessToken = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();

  const [inputKeyword, setInputKeyword] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const onSearch = () => {
    setKeyword(inputKeyword);
  };

  const onInputKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.target.value);
  };

  const onkeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const getMeetingList = useCallback(async () => {
    const params: Param = {};
    if (keyword) {
      params.name = keyword;
    }

    if (accessToken) {
      const apiClient = client(accessToken);
      try {
        const response = await apiClient.get("api/fanmeeting", {
          params,
        });
        setFanMeetings(response.data);
      } catch (error) {
        console.error("팬미팅 목록을 불러오는 중 오류 발생", error);
      }
    }
  }, [accessToken, keyword]);

  useEffect(() => {
    getMeetingList();
  }, [accessToken, keyword, getMeetingList]);

  return (
    <div className="flex flex-col items-center my-10 mx-20">
      <span className="text-h4 text-gray-900 font-bold">팬미팅 둘러보기</span>
      <span className="text-small text-gray-600 mt-2">
        종료된 팬미팅은 크리에이터 프로필에서 확인하세요!
      </span>
      <div
        className="text-primary-text text-small font-bold"
        onClick={() => navigate("/creator/list")}
        role="presentation"
      >
        크리에이터 프로필 둘러보기 &rarr;
      </div>
      <div className="flex relative items-center">
        <input
          className="w-[500px] h-[50px] pl-10 pr-20 rounded-full border z-50 focus:outline-none text-medium mt-10"
          placeholder="크리에이터 이름으로 검색해보세요"
          onChange={onInputKeyword}
          onKeyDown={onkeydown}
        />
        <img
          src={searchIcon}
          alt="검색"
          className="absolute w-[18px] h-[18px] z-50 right-10 mt-10"
          onClick={onSearch}
          role="presentation"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-6 my-10">
        {fanMeetings.map((meeting) => (
          <div
            key={meeting.fanmeetingId}
            className="flex flex-col p-4 items-center"
            onClick={() => navigate(`/ticket/${meeting.fanmeetingId}`)}
            role="presentation"
          >
            <img
              src={meeting.posterImg}
              alt={meeting.title}
              className="w-[200px] h-[280px] min-w-44 object-cover rounded-lg"
            />
            <span className="mt-2 text-h6 font-bold text-gray-900">
              {meeting.title}
            </span>
            <p className="text-gray-600">{formatDate(meeting.startDate)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetingList;
