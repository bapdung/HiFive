import { useState } from "react";

import CreatorInfo from "../../components/CreatorInfo";
import searchIcon from "../../assets/icons/searchIcon.png";

function CreatorList() {
  const [keyword, setKeyword] = useState("");

  const onSearch = () => {
    console.log(keyword);
  };

  const onInputKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onkeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="bg-white pb-20">
      <div className="absolute top-[80px] left-0 bg-page-background w-screen flex flex-col justify-center items-center p-16 ">
        <h1 className="text-h1 font-semibold">HiFive Creators</h1>
        <h3 className="text-h3 font-semibold text-gray-600">
          현재 HiFive에서 활동하고 있는 크리에이터 전체 목록입니다.
        </h3>
      </div>
      <div className="mt-72 w-screen flex flex-col items-center">
        <div className="flex relative items-center">
          <input
            className="w-[1200px] h-[75px] px-5 pr-20 rounded-full shadow-pink-shadow z-50 focus:outline-none text-h5"
            placeholder="어떤 크리에이터를 찾으시나요?"
            onChange={(e) => onInputKeyword(e)}
            onKeyDown={(e) => onkeydown(e)}
          />
          <img
            src={searchIcon}
            alt="검색"
            className="absolute w-[18px] h-[18px] z-50 right-10"
            onClick={() => onSearch()}
            role="presentation"
          />
        </div>
        <div className="mt-8">
          <div className="flex justify-center items-center mb-10">
            <h5 className="text-h5 font-semibold border-solid border-r-2 border-[#EEEEEE] pr-3 text-primary-text">
              가나다순
            </h5>
            <h5 className="text-h5 font-semibold border-solid border-r-2 border-[#EEEEEE] px-3">
              최신순
            </h5>
            <h5 className="text-h5 font-semibold pl-3">활동일순</h5>
          </div>
          <div className="flex flex-wrap w-[1200px] justify-start gap-12">
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorList;
