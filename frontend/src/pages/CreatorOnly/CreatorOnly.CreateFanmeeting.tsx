import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../custom-datepicker.css";
import { format, differenceInDays, addDays, isBefore, isAfter } from "date-fns"; // 날짜를 특정 형식으로 표시하는 라이브러리
import { ko } from "date-fns/locale"; // 날짜 한국어 패치
import {
  formatNumberWithCommas,
  parseNumberIntoInteger,
} from "../../utils/formatNumber";
import DownloadIcon from "../../assets/icons/download.svg";

function CreateFanmeeting() {
  const [peopleNumber, setPeopleNumber] = useState(0);
  const [isFanmeetingCalendarOpen, setIsFanmeetingCalendarOpen] =
    useState(false);
  const [isTicketCalendarOpen, setIsTicketCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [ticketDate, setTicketDate] = useState<Date | null>(null);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [ticketPrice, setTicketPrice] = useState<number | "">("");

  const durations = [
    "1:00",
    "1:30",
    "2:00",
    "2:30",
    "3:00",
    "3:30",
    "4:00",
    "4:30",
    "5:00",
  ];

  const handlePeopleNumber = (num: number) => {
    setPeopleNumber(num);
  };
  const toggleFanmeetingCalendar = () => {
    setIsFanmeetingCalendarOpen(!isFanmeetingCalendarOpen);
  };
  const toggleTicketCalendar = () => {
    setIsTicketCalendarOpen(!isTicketCalendarOpen);
  };
  const toggleTimeOpen = () => {
    setIsTimeOpen(!isTimeOpen);
  };

  const checkStartDateValidation = (date: Date) => {
    const today = new Date();
    const difference = differenceInDays(date, today);
    if (difference <= 7) {
      alert("일주일 뒤 날짜만 선택 가능합니다.");
      return false;
    }
    return true;
  };
  const checkTicketDateValidation = (date: Date) => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    if (!startDate) {
      alert("팬미팅 날짜를 먼저 정해주세요.");
      return false;
    }
    const dayBeforeTicketDate = addDays(startDate, -1);
    if (isBefore(date, tomorrow) || isAfter(date, dayBeforeTicketDate)) {
      alert("잘못된 날짜를 선택하셨습니다.");
      return false;
    }
    return true;
  };

  const handleStartDateChange = (date: Date) => {
    if (checkStartDateValidation(date)) {
      setStartDate(date);
      if (startDate) {
        setIsFanmeetingCalendarOpen(false);
      }
    } else {
      setStartDate(null);
      setIsFanmeetingCalendarOpen(false);
    }
  };
  const handleTicketDateChange = (date: Date) => {
    if (checkTicketDateValidation(date)) {
      setTicketDate(date);
      if (ticketDate) {
        setIsTicketCalendarOpen(false);
        console.log(ticketDate);
      }
    } else {
      setTicketDate(null);
      setIsTicketCalendarOpen(false);
    }
  };

  const handleDurationSelect = (duration: string) => {
    setSelectedDuration(duration);
    setIsTimeOpen(false);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseNumberIntoInteger(e.target.value);
    setTicketPrice(intValue);
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
      <div className="my-10 flex flex-col bg-white w-[60%] rounded-[25px] py-10 px-14 items-center">
        <p className="text-h5">나만의 팬미팅 설정</p>
        <div className="w-full flex flex-col">
          <div className="flex my-10 justify-between">
            <div className="flex flex-col w-[40%]">
              <p className="text-small">타이틀</p>
              <input
                type="text"
                className="creator-btn-outline-md mt-1 focus:outline-none text-gray-900 mb-5 text-center"
                style={{ borderWidth: "1px" }}
                placeholder="이 곳에 팬미팅 제목을 입력하세요."
              />
              <p className="text-small">참가 인원</p>
              <div className="w-full flex justify-around mt-1 mb-5">
                <button
                  onClick={() => handlePeopleNumber(5)}
                  type="button"
                  style={{ borderWidth: "1px" }}
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
                  style={{ borderWidth: "1px" }}
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
                  style={{ borderWidth: "1px" }}
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
                  style={{ borderWidth: "1px" }}
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
                onClick={() => toggleFanmeetingCalendar()}
                type="button"
                className="creator-btn-outline-md w-full mb-5 focus:outline-none"
                style={{ borderWidth: "1px" }}
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
              {isFanmeetingCalendarOpen && (
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleStartDateChange(date as Date)}
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
                  <button
                    type="button"
                    className="creator-btn-outline-md px-6 focus:outline-none"
                    style={{ borderWidth: "1px" }}
                    onClick={() => toggleTimeOpen()}
                  >
                    {selectedDuration || (
                      <>
                        시간 선택&nbsp;{" "}
                        <span className="text-[9px] text-secondary">▼</span>
                      </>
                    )}
                  </button>
                  {isTimeOpen ? (
                    <div className="bg-white mt-4 w-full grid grid-cols-3 gap-5 p-2 px-2">
                      {durations.map((duration) => (
                        <button
                          type="button"
                          key={duration}
                          className="cursor-pointer rounded-3xl hover:bg-secondary-300 w-fit p-2 px-3"
                          onClick={() => handleDurationSelect(duration)}
                        >
                          {duration}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="w-1/2">
                  <p className="text-small mb-1">티켓 가격</p>
                  <div
                    style={{ borderWidth: "1px" }}
                    className="creator-btn-outline-md w-full flex justify-between"
                  >
                    <input
                      type="text"
                      className="focus:outline-none w-3/4"
                      value={
                        ticketPrice !== ""
                          ? formatNumberWithCommas(ticketPrice as number)
                          : ""
                      }
                      onChange={handlePriceChange}
                    />
                    <span className="text-secondary">원</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full my-5">
                <p className="text-small mb-1">예매 오픈일</p>
                <button
                  onClick={() => toggleTicketCalendar()}
                  type="button"
                  style={{ borderWidth: "1px" }}
                  className="creator-btn-outline-md w-full mb-5 focus:outline-none"
                >
                  {ticketDate ? (
                    <p className="text-secondary">
                      {format(ticketDate, "yyyy.MM.dd (EEE) HH:mm", {
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
                {isTicketCalendarOpen && (
                  <DatePicker
                    selected={ticketDate}
                    onChange={(date) => handleTicketDateChange(date as Date)}
                    showTimeSelect
                    inline
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy.MM.dd (EEE) HH:mm"
                    locale={ko}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col w-[40%]">
              <p>포스터</p>
              <div className="relative w-full h-full bg-gray-300 flex justify-center items-center">
                <button type="button">
                  <img src={DownloadIcon} alt="upload" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[40%]">
              <p className="text-small mb-1">팬미팅 상세 설명</p>
              <textarea
                placeholder="팬미팅에 대한 나만의 설명을 추가해주세요.
예시)
안녕하세요, ㅇㅇㅇ입니다!
여러분과 함께하는 온라인 팬미팅이 열릴 예정입니다! 🥳
팬미팅에서 특별한 이야기와 깜짝 이벤트를 준비했으니 많이 기대해 주세요! 여러분과 함께 소중한 시간을 보낼 수 있기를 기대합니다. 💖"
                className="focus:outline-none w-full h-[20rem] rounded-[10px] border border-secondary resize-none p-3"
              />
            </div>
            <div className="w-2/5">
              <p className="text-small mb-1">타임 테이블 설정</p>
            </div>
          </div>
        </div>
        <button type="button" className="w-2/3 creator-btn-md mt-10">
          팬미팅 생성하기
        </button>
      </div>
    </div>
  );
}

export default CreateFanmeeting;
