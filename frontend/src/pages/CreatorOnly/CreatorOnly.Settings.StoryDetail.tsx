import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

function StoryDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const storyId = parseInt(location.pathname.split("/")[4], 10);
  const token = useAuthStore((state) => state.accessToken);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [isPicked, setIsPicked] = useState<boolean | null>();

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!token || !storyId) {
        return;
      }
      try {
        const response = await client(token).get(`api/story/detail/${storyId}`);
        const { data } = response;
        setTitle(data.title);
        setContent(data.content);
        setNickname(data.nickname);
        setIsPicked(data.picked);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestion();
  }, [token, storyId, isPicked]);

  const toggleIsPicked = async () => {
    if (!token) {
      return;
    }
    await client(token).patch(`api/story/${storyId}/toggle`);
    setIsPicked((prevIsPicked) => !prevIsPicked);
  };

  return (
    <div className="bg-white rounded-[25px] w-[60%] p-10 my-10 flex flex-col min-h-[25rem]">
      <p className="text-h6 mb-2">제목 : {title}</p>
      <p className="text-h6 mb-6">작성자 : {nickname}</p>
      <p className="mb-10">{content}</p>
      <div className="mr-auto ml-auto mt-auto">
        <button
          type="button"
          className="creator-btn-md mr-10 w-[12rem] bg-gray-500"
          onClick={() => navigate(-1)}
        >
          목록으로 돌아가기
        </button>
        {isPicked ? (
          <button
            type="button"
            className="creator-btn-light-md w-[12rem]"
            onClick={toggleIsPicked}
          >
            선택 취소하기
          </button>
        ) : (
          <button
            type="button"
            className="creator-btn-md w-[12rem]"
            onClick={toggleIsPicked}
          >
            사연 선택하기
          </button>
        )}
      </div>
    </div>
  );
}

export default StoryDetail;
