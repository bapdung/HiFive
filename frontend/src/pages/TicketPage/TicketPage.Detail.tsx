import React from "react";

import ProfileImg from "../../assets/temp/profile.svg";
import PosterImg from "../../assets/temp/poster.svg";
import TimeTable from "./TicketPage.DetailTimetable";
import Info from "./TicketPage.DetailInfo";

function Detail() {
  return (
    <div className="my-10 flex justify-center w-full">
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
      <div className="bg-white rounded-[25px] p-10 ml-8 max-w-[22%] h-fit sticky top-4">
        <h2 className="text-h2 mb-12">
          팬미팅제목팬미팅제목팬미팅제목팬미팅제목팬미팅제목팬미팅제목
        </h2>
        <div>
          <p className="flex mb-2.5">
            <span className="w-20 text-gray-700">날짜</span>
            <span>2024년 7월 15일 월요일</span>
          </p>
          <p className="flex mb-2.5">
            <span className="w-20 text-gray-700">시작시간</span>
            <span>18:00</span>
          </p>
          <p className="flex mb-2.5">
            <span className="w-20 text-gray-700">진행시간</span>
            <span>120분</span>
          </p>
          <p className="flex mb-2.5">
            <span className="w-20 text-gray-700">참가인원</span>
            <span>30명</span>
          </p>
          <p className="flex mb-2.5">
            <span className="w-20 text-gray-700">가격</span>
            <span>50,000원</span>
          </p>
        </div>
        <div className="mt-20">
          <p className="text-gray-500 text-sm text-center mb-1">
            잠깐! 예매 전 하단의 예매 안내 사항을 꼭 읽어주세요!
          </p>
          <button type="button" className="btn-lg w-full">
            예매하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
