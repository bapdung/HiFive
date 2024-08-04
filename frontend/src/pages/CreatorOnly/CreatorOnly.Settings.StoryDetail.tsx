import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

function StoryDetail() {
  const location = useLocation();
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

  return (
    <div>
      <p>흠</p>
      <p>{title}</p>
      <p>{content}</p>
      <p>{nickname}</p>
    </div>
  );
}

export default StoryDetail;
