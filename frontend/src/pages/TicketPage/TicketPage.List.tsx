import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

interface FanMeeting {
  fanmeetingId: number;
  title: string;
  posterImg: string;
  openDate: string;
  startDate: string;
  runningTime: number;
}

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

  useEffect(() => {
    async function fetchFanmeetings() {
      try {
        const apiClient = client(accessToken || "");
        const response = await apiClient.get("/api/fanmeeting");
        setFanMeetings(response.data);
      } catch (error) {
        console.error("예매 가능한 팬미팅 로드 실패", error);
      }
    }

    fetchFanmeetings();
  }, [accessToken]);

  return (
    <div className="flex flex-col items-center my-10 mx-20">
      <span className="text-h4 text-gray-900 font-bold">팬미팅 둘러보기</span>
      <span className="text-small text-gray-600">
        종료된 팬미팅은 크리에이터 프로필에서 확인하세요!
      </span>
      <div
        className="text-primary-text text-small font-bold mt-3"
        onClick={() => navigate("/creator/list")}
        role="presentation"
      >
        크리에이터 검색하러 가기 &rarr;
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-y-6 my-10">
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
              className="w-[200px] h-[280px] object-cover rounded-lg"
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
