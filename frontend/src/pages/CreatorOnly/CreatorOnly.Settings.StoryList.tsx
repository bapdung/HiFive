import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Prev from "../../assets/icons/preIcon.svg";
import Next from "../../assets/icons/nextIcon.svg";

interface Story {
  storyId: number;
  nickname: string;
  title: string;
  totalPages: number;
  picked: boolean;
}

interface StoryListProps {
  allStory: Story[];
  handlePage: (pg: number) => void;
  currentPage: number;
}

const StoryList: React.FC<StoryListProps> = ({
  allStory,
  handlePage,
  currentPage,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fanmeetingId = parseInt(location.pathname.split("/")[2], 10); // 경로에서 팬미팅 ID를 추출
  const [totalPage, setTotalPage] = useState<number>(0); // 전체 페이지 수 상태
  const [pageRange, setPageRange] = useState<number[]>([]); // 페이지 범위 상태

  // 전체 페이지 수 설정
  useEffect(() => {
    if (allStory && allStory.length > 0) {
      setTotalPage(allStory[0].totalPages);
    }
  }, [allStory]);

  // 현재 페이지가 변경될 때마다 페이지 범위 업데이트
  useEffect(() => {
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPage);
    setPageRange(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    ); // 페이지 범위 설정
  }, [currentPage, totalPage]);

  return (
    <div className="bg-white rounded-[25px] w-[60%] p-10 pb-5">
      <div className="w-full flex flex-col items-center">
        <table className="w-full text-h6">
          <thead className="border-b-2 border-t-2 border-secondary">
            <tr>
              <td className="w-[10%] py-2.5 px-5 font-semibold">번호</td>
              <td className="w-[25%] py-2.5 px-5 font-semibold">작성자</td>
              <td className="w-[45%] py-2.5 px-5 font-semibold">사연 제목</td>
              <td className="w-[20%] py-2.5 px-5 font-semibold">선택 여부</td>
            </tr>
          </thead>
          <tbody className="border-b-2 border-secondary py-2 hover:cursor-pointer">
            {allStory.length > 0
              ? allStory.map((story) => (
                  <tr
                    key={story.storyId}
                    onClick={() =>
                      navigate(
                        `/creator-only/${fanmeetingId}/story/${story.storyId}`,
                      )
                    }
                  >
                    <td className="py-3 px-5">{story.storyId}</td>
                    <td className="py-3 px-5 ">{story.nickname}</td>
                    <td className="py-3 px-5 ">{story.title}</td>
                    {story.picked ? (
                      <td className="py-3 px-5 text-secondary font-semibold">
                        선택 완료
                      </td>
                    ) : (
                      <td className="py-3 px-5 text-primary font-semibold">
                        미선택
                      </td>
                    )}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <div className="flex row gap-10 my-5">
          {/* 이전 페이지 버튼 */}
          {currentPage > 1 ? (
            <button type="button" onClick={() => handlePage(currentPage - 1)}>
              <img src={Prev} alt="prev" className="w-[1.5rem] opacity-50" />{" "}
            </button>
          ) : (
            <span>
              <img src={Prev} alt="prev" className="w-[1.5rem] opacity-50" />{" "}
            </span>
          )}

          {/* 페이지 번호 버튼들 */}
          {pageRange.map((page) => (
            <button
              key={page}
              type="button"
              className={`text-gray-500 ${page === currentPage ? "font-bold" : ""}`}
              onClick={() => handlePage(page)}
            >
              {page}
            </button>
          ))}

          {/* 다음 페이지 버튼 */}
          {currentPage < totalPage ? (
            <button type="button" onClick={() => handlePage(currentPage + 1)}>
              <img src={Next} alt="next" className="w-[1.5rem] opacity-50" />
            </button>
          ) : (
            <span>
              <img src={Next} alt="next" className="w-[1.5rem] opacity-50" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryList;
