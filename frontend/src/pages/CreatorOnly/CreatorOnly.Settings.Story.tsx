import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

import StoryList from "./CreatorOnly.Settings.StoryList";

interface Story {
  storyId: number;
  title: string;
  nickname: string;
  totalPages: number;
  picked: boolean;
}

function Story() {
  const token = useAuthStore((state) => state.accessToken);
  const location = useLocation();
  const fanmeetingId = parseInt(location.pathname.split("/")[2], 10);
  const [typeOfStory, setTypeOfStory] = useState("all");
  const [allStory, setAllStory] = useState<Story[]>([]);
  const [page, setPage] = useState(0);

  const fetchStoryList = async () => {
    try {
      if (!token || typeOfStory !== "all") {
        return;
      }
      const response = await client(token).get(
        `/api/story/${fanmeetingId}?page=${page}`,
      );
      setAllStory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSelectedStoryList = async () => {
    try {
      if (!token || typeOfStory !== "selected") {
        return;
      }
      const response = await client(token).get(
        `/api/story/${fanmeetingId}/selected?page=${page}`,
      );
      setAllStory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUnselectedStoryList = async () => {
    try {
      if (!token || typeOfStory !== "unselected") {
        return;
      }
      const response = await client(token).get(
        `/api/story/${fanmeetingId}/unselected?page=${page}`,
      );
      setAllStory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStoryList();
    fetchSelectedStoryList();
    fetchUnselectedStoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, fanmeetingId, page, typeOfStory]);

  const handleTypeOfStory = (type: string) => {
    setTypeOfStory(type);
    if (type === "all") {
      setPage(0);
      return;
    }
    if (type === "selected") {
      setPage(0);
      return;
    }
    if (type === "unselected") {
      setPage(0);
    }
  };

  const handlePage = (pg: number) => {
    setPage(pg);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <p className="text-h4 w-1/3 flex justify-around my-10">
        <button
          type="button"
          onClick={() => handleTypeOfStory("all")}
          className="text-gray-900"
        >
          전체 사연
        </button>{" "}
        <span>|</span>
        <button
          type="button"
          onClick={() => handleTypeOfStory("selected")}
          className={
            typeOfStory === "selected" ? "text-gray-900" : "text-gray-500"
          }
        >
          선택한 사연
        </button>{" "}
        <span>|</span>
        <button
          type="button"
          onClick={() => handleTypeOfStory("unselected")}
          className={
            typeOfStory === "unselected" ? "text-gray-900" : "text-gray-500"
          }
        >
          미선택 사연
        </button>
      </p>
      <StoryList
        allStory={allStory}
        handlePage={handlePage}
        currentPage={page}
      />
    </div>
  );
}

export default Story;
