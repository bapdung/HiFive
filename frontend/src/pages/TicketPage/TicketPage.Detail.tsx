import React from "react";

import ProfileImg from "../../assets/temp/profile.svg";
import PosterImg from "../../assets/temp/poster.svg";
import TimeTable from "./TicketPage.DetailTimetable";
import Info from "./TicketPage.DetailInfo";

function Detail() {
  return (
    <div className="my-10 flex justify-center">
      <div className="w-[60%] bg-white rounded-[25px] p-10">
        <div className="w-full flex">
          <img
            src={PosterImg}
            alt="poster-img"
            className="w-[35%] mr-10 max-h-80 max-w-[30%]"
          />
          <div>
            <h1 className="text-h3 text-gray-900">
              팬미팅제목팬미팅제목팬미팅제목팬미팅제목팬미팅제목팬미팅제목
            </h1>
            <p className="text-large text-gray-700 mb-6 mt-0.5">
              개복어 님의 HiFive 온라인 팬미팅
            </p>
            <div className="bg-gray-100 px-8 py-6 rounded-[20px]">
              <div className="flex">
                <img
                  className="w-24 h-24 rounded-full"
                  src={ProfileImg}
                  alt="profile-img"
                />
                <div className="ml-8 mt-auto mb-auto">
                  <p className="text-gray-700 text-large">
                    크리에이터 <span className="text-gray-800">개복어</span>
                  </p>
                  <button className="btn-light-md mt-1.5" type="button">
                    프로필 보러가기
                  </button>
                </div>
              </div>
              <p className="mt-6 text-gray-900 text-medium">
                팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개팬미팅소개
              </p>
            </div>
          </div>
        </div>
        <TimeTable />
        <Info />
      </div>
    </div>
  );
}

export default Detail;
