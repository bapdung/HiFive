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
  const fanmeetingId = parseInt(location.pathname.split("/")[2], 10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    if (allStory && allStory.length > 0) {
      setTotalPage(allStory[0].totalPages);
    }
  }, [allStory]);

  useEffect(() => {
    if (totalPage > 0) {
      setPageCount(totalPage >= 3 ? 3 : totalPage);
    }
  }, [totalPage]);

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
          <tbody className="border-b-2 border-secondary py-2">
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
          {currentPage !== 0 ? (
            <button type="button" onClick={() => handlePage(currentPage - 1)}>
              <img src={Prev} alt="prev" className="w-[1.5rem] opacity-50" />{" "}
            </button>
          ) : (
            <span>
              <img src={Prev} alt="prev" className="w-[1.5rem] opacity-50" />{" "}
            </span>
          )}

          {Array.from({ length: pageCount || 1 }, (_, index) => (
            <button
              key={index + 1}
              type="button"
              className="text-gray-500"
              onClick={() => handlePage(index)}
            >
              {index + 1}
            </button>
          ))}
          {totalPage > 4 ? <span className="text-gray-500">...</span> : null}
          {totalPage <= 3 ? null : (
            <button
              type="button"
              className="text-gray-500"
              onClick={() => handlePage(totalPage - 1)}
            >
              {totalPage}
            </button>
          )}
          {currentPage < totalPage - 1 ? (
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
