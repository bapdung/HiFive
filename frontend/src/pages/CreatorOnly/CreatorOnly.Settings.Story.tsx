// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import client from "../../client";
// import useAuthStore from "../../store/useAuthStore";

import StoryList from "./CreatorOnly.Settings.StoryList";

// interface Story {

// }

function Story() {
  // const token = useAuthStore((state) => state.accessToken);
  // const location = useLocation();
  // const fanmeetingId = location.pathname.split("/")[2];
  // const [typeOfStory, setTypeOfStory] = useState("all");
  // const [allStory, setAllStory] = useState<Story[]>([]);
  // const [filteredStory, setFilteredStory] = useState<Story[]>([]);
  return (
    <div className="flex flex-col w-full items-center">
      <p className="text-h4 w-1/3 flex justify-around my-10">
        <button
          type="button"
          // onClick={() => handleTypeOfStory("all")}
          className="text-gray-900"
        >
          전체 사연
        </button>{" "}
        <span>|</span>
        <button
          type="button"
          // onClick={() => handleTypeOfStory("selected")}
          // className={
          //   typeOfStory === "selected" ? "text-gray-900" : "text-gray-500"
          // }
        >
          선택한 사연
        </button>{" "}
        <span>|</span>
        <button
          type="button"
          // onClick={() => handleTypeOfStory("unselected")}
          // className={
          //   typeOfStory === "unselected" ? "text-gray-900" : "text-gray-500"
          // }
        >
          미선택 사연
        </button>
      </p>
      <StoryList />
    </div>
  );
}

export default Story;
