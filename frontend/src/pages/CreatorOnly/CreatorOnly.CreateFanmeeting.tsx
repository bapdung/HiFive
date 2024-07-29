import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../custom-datepicker.css";
import { format, differenceInDays } from "date-fns"; // 날짜를 특정 형식으로 표시하는 라이브러리
import { ko } from "date-fns/locale"; // 날짜 한국어 패치

function CreateFanmeeting() {
  const [peopleNumber, setPeopleNumber] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handlePeopleNumber = (num: number) => {
    setPeopleNumber(num);
  };
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const checkDateValidation = (date: Date) => {
    const today = new Date();
    const difference = differenceInDays(date, today);
    if (difference <= 7) {
      alert("일주일 뒤 날짜만 선택 가능합니다.");
      return false;
    }
    return true;
  };

  const handleDateChange = (date: Date) => {
    if (checkDateValidation(date)) {
      setStartDate(date);
      setIsCalendarOpen(false);
    } else {
      setStartDate(null);
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[100vw] bg-white py-8 flex flex-col items-center">
        <h1 className="text-secondary text-h3 mb-5">팬 미팅 생성하기</h1>
        <div className="bg-gray-100 rounded-lg py-[1rem] px-[2rem] text-center w-[30rem]">
          <h1 className="text-gray-700 text-large">
            팬 미팅을 생성하고 팬들과의 소중한 추억을 만들어보세요. 입력한
            정보는 현재 페이지 이후 수정할 수 없습니다.
          </h1>
        </div>
      </div>
      <div className="my-10 flex flex-col bg-white w-1/2 rounded-[25px] py-10 px-14 items-center">
        <p className="text-h5">나만의 팬미팅 설정</p>
        <div className="w-full flex flex-col">
          <div className="flex my-10 justify-between">
            <div className="flex flex-col w-[40%]">
              <p className="text-small">타이틀</p>
              <input
                type="text"
                className="creator-btn-outline-md mt-1 focus:outline-none text-gray-900 mb-5 text-center"
                placeholder="이 곳에 팬미팅 제목을 입력하세요."
              />
              <p className="text-small">참가 인원</p>
              <div className="w-full flex justify-around mt-1 mb-5">
                <button
                  onClick={() => handlePeopleNumber(5)}
                  type="button"
                  className={
                    peopleNumber === 5
                      ? "creator-btn-md"
                      : "creator-btn-outline-md"
                  }
                >
                  5명
                </button>
                <button
                  onClick={() => handlePeopleNumber(10)}
                  type="button"
                  className={
                    peopleNumber === 10
                      ? "creator-btn-md"
                      : "creator-btn-outline-md"
                  }
                >
                  10명
                </button>
                <button
                  onClick={() => handlePeopleNumber(30)}
                  type="button"
                  className={
                    peopleNumber === 30
                      ? "creator-btn-md"
                      : "creator-btn-outline-md"
                  }
                >
                  30명
                </button>
                <button
                  onClick={() => handlePeopleNumber(50)}
                  type="button"
                  className={
                    peopleNumber === 50
                      ? "creator-btn-md"
                      : "creator-btn-outline-md"
                  }
                >
                  50명
                </button>
              </div>
              <p className="text-small mb-1">행사 날짜</p>
              <button
                onClick={() => toggleCalendar()}
                type="button"
                className="creator-btn-outline-md w-full mb-5 focus:outline-none"
              >
                {startDate ? (
                  <p className="text-secondary">
                    {format(startDate, "yyyy.MM.dd (EEE) HH:mm", {
                      locale: ko,
                    })}
                  </p>
                ) : (
                  <>
                    날짜 선택 &nbsp;{" "}
                    <span className="text-[9px] text-secondary">▼</span>
                  </>
                )}
              </button>
              {isCalendarOpen && (
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleDateChange(date as Date)}
                  showTimeSelect
                  inline
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy.MM.dd (EEE) HH:mm"
                  locale={ko}
                />
              )}
              <div className="flex w-full justify-between">
                <div className="w-1/2">
                  <p className="text-small mb-1">진행 시간</p>
                  <button type="button" className="creator-btn-outline-md px-6">
                    시간 선택&nbsp;{" "}
                    <span className="text-[9px] text-secondary">▼</span>
                  </button>
                </div>
                <div className="w-1/2">
                  <p className="text-small mb-1">티켓 가격</p>
                  <input
                    type="number"
                    className="creator-btn-outline-md px-6"
                  />
                  시간 선택&nbsp;{" "}
                  <span className="text-[9px] text-secondary">▼</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[40%]">
              <p>포스터</p>
            </div>
          </div>
          <div className="flex">
            <div>
              <p>팬미팅 상세 설명</p>
            </div>
            <div>
              <p>타임 테이블 설정</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFanmeeting;
