import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../custom-datepicker.css";
import { useNavigate } from "react-router-dom";

import { format, differenceInDays, addDays, isBefore, isAfter } from "date-fns"; // 날짜를 특정 형식으로 표시하는 라이브러리
import { ko } from "date-fns/locale"; // 날짜 한국어 패치
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "@hello-pangea/dnd";
import {
  formatNumberWithCommas,
  parseNumberIntoInteger,
} from "../../utils/formatNumber";
import Modal from "./CreatorOnly.CreateFanmeeting.Modal";
// import axios from "axios";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

// drag and drop 할 때 형식
interface Corner {
  id: string;
  content: string;
}

// backend 로 보낼때 형식
interface CornerIndex {
  categoryId: number;
  sequence: number;
}

function CreateFanmeeting() {
  const token = useAuthStore((state) => state.accessToken);
  const [title, setTitle] = useState("");
  const [peopleNumber, setPeopleNumber] = useState(0);
  const [isFanmeetingCalendarOpen, setIsFanmeetingCalendarOpen] = // 팬미팅 날짜 캘린더 토글
    useState(false);
  const [isTicketCalendarOpen, setIsTicketCalendarOpen] = useState(false); // 티켓팅 날짜 캘린더 토글
  const [isTimeOpen, setIsTimeOpen] = useState(false); // 진행 시간 선택 버튼 토글
  const [startDate, setStartDate] = useState<Date | null>(null); // 팬미팅 날짜
  const [ticketDate, setTicketDate] = useState<Date | null>(null); // 티켓팅 날짜
  const [selectedDuration, setSelectedDuration] = useState(""); // 팬미팅 진행 시간
  const [ticketPrice, setTicketPrice] = useState<number | "">("");
  const [corners, setCorners] = useState<Corner[]>([]); // 최종 선택된 코너(타임테이블)
  const [customCorner, setCustomCorner] = useState<{ [key: string]: string }>( // drag 에 사용
    {},
  );
  const [description, setDescription] = useState(""); // 팬미팅 상세설명(공지)
  // const [imagePreview, setImagePreview] = useState<string | null>(null); // 팬미팅 포스터
  const [showModal, setShowModal] = useState(false);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterSrc, setPosterSrc] = useState<string | ArrayBuffer | null>(null);
  const [posterName, setPosterName] = useState<string | null>(null);
  const naviate = useNavigate();

  // 진행시간
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

  // 타임테이블
  const typeOfCorners = [
    "소통",
    "공연",
    "포토 타임",
    "Q&A",
    "사연 전달",
    "O/X게임",
    "직접 입력",
  ];

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 제목 받아옴
    setTitle(e.target.value);
  };
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 설명 받아옴
    setDescription(e.target.value);
  };
  const handlePeopleNumber = (num: number) => {
    // 인원수 받아옴
    setPeopleNumber(num);
  };
  const toggleFanmeetingCalendar = () => {
    // 팬미팅 달력 토글
    setIsFanmeetingCalendarOpen(!isFanmeetingCalendarOpen);
  };
  const toggleTicketCalendar = () => {
    // 티켓 달력 토글
    setIsTicketCalendarOpen(!isTicketCalendarOpen);
  };
  const toggleTimeOpen = () => {
    // 진행시간 토글
    setIsTimeOpen(!isTimeOpen);
  };
  // 팬미팅 생성 모달 닫기
  const handleModalClose = () => {
    setShowModal(false);
  };
  // 팬미팅 생성 모달 열기
  const handleModalOpen = () => {
    setShowModal(true);
  };

  // 팬미팅 날짜 유효한지 확인
  const checkStartDateValidation = (date: Date) => {
    const today = new Date();
    const difference = differenceInDays(date, today);
    if (difference < 7) {
      alert("일주일 뒤 날짜만 선택 가능합니다.");
      return false;
    }
    return true;
  };

  // 티켓팅 날짜 유효한지 확인
  const checkTicketDateValidation = (date: Date) => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    if (!startDate) {
      alert("팬미팅 날짜를 먼저 정해주세요.");
      return false;
    }
    const dayBeforeTicketDate = addDays(startDate, -1); // 팬미팅 하루전
    if (isBefore(date, tomorrow) || isAfter(date, dayBeforeTicketDate)) {
      alert("잘못된 날짜를 선택하셨습니다.");
      return false;
    }
    return true;
  };

  // 팬미팅 날짜 변경
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

  // 티켓팅 날짜 변경
  const handleTicketDateChange = (date: Date) => {
    if (checkTicketDateValidation(date)) {
      setTicketDate(date);
      if (ticketDate) {
        setIsTicketCalendarOpen(false);
      }
    } else {
      setTicketDate(null);
      setIsTicketCalendarOpen(false);
    }
  };

  // 진행 시간 선택
  const handleDurationSelect = (duration: string) => {
    setSelectedDuration(duration);
    setIsTimeOpen(false);
  };

  // 티켓 가격 받아옴
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseNumberIntoInteger(e.target.value);
    setTicketPrice(intValue);
  };

  const inputImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!token) {
      return;
    }
    const file = event.target.files?.[0];
    if (file) {
      // 이미지 Blob 미리보기 설정
      // const imageBlobUrl = URL.createObjectURL(file);
      // setImagePreview(imageBlobUrl);
      // S3로 이미지 업로드
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPosterSrc(reader.result);
          // console.log(posterSrc); // 테스트용으로 출력
        } else {
          console.error("FileReader result is null");
        }
      };
      reader.readAsDataURL(file);
      setPosterName(file.name);
      setPosterFile(file);
    }
  };

  const uploadS3 = async (path: string, file: File) => {
    const response = await fetch(
      new Request(path, {
        method: "PUT",
        body: file,
        headers: new Headers({
          "Content-Type": file.type,
        }),
      }),
    );

    return response.url;
  };

  // S3 URL 가져오기
  const getS3url = async () => {
    if (posterName && token && posterFile) {
      const response = await client(token).post(
        `/api/s3/upload/${posterName}`,
        {
          prefix: "test",
        },
      );
      const { path } = response.data;
      const url = uploadS3(path, posterFile);
      return url;
    }
    return null;
  };

  // 코너를 drag 공간에 추가
  const handleAddCorner = () => {
    setCorners([
      ...corners,
      { id: `corner-${corners.length}`, content: "코너 선택" },
    ]);
  };

  // drag 공간에서 제거
  const handleRemoveCorner = (index: number) => {
    setCorners(corners.filter((_, i) => i !== index));
  };

  // 특정 코너 선택
  const handleSelectCorner = (index: number, corner: string) => {
    const newCorners = [...corners];
    newCorners[index] = { ...newCorners[index], content: corner };
    setCorners(newCorners);
  };

  // 직접 입력 코너
  const handleCustomCornerChange = (index: number, value: string) => {
    setCustomCorner({ ...customCorner, [`corner-${index}`]: value });
  };

  // 직접 입력 코너 제출
  const handleCustomCornerSubmit = (index: number) => {
    const newCorners = [...corners];
    newCorners[index] = {
      ...newCorners[index],
      content: customCorner[`corner-${index}`] || "직접 입력",
    };
    setCorners(newCorners);
  };

  // drag and drop
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newCorners = Array.from(corners);
    const [movedCorner] = newCorners.splice(result.source.index, 1);
    newCorners.splice(result.destination.index, 0, movedCorner);

    setCorners(newCorners);
  };

  // 코너 선택하는 곳 렌더링
  const renderCornerContent = (corner: Corner, index: number) => {
    if (corner.content === "코너 선택") {
      return (
        <select
          onChange={(e) => handleSelectCorner(index, e.target.value)}
          className="creator-btn-md"
          style={{ borderWidth: "1px" }}
        >
          <option value="코너 선택" className="bg-white">
            코너 선택
          </option>
          {typeOfCorners.map((type) => (
            <option key={type} value={type} className="bg-white">
              {type}
            </option>
          ))}
        </select>
      );
    }
    if (corner.content === "직접 입력") {
      return (
        <div className="flex">
          <input
            type="text"
            value={customCorner[`corner-${index}`] || ""}
            onChange={(e) => handleCustomCornerChange(index, e.target.value)}
            className="focus:outline-none creator-btn-outline-md mr-2 text-small w-1/2"
            style={{ borderWidth: "1px" }}
          />
          <button
            onClick={() => handleCustomCornerSubmit(index)}
            type="button"
            className="creator-btn-md"
          >
            추가
          </button>
        </div>
      );
    }
    return (
      <span className="creator-btn-outline-md" style={{ borderWidth: "1px" }}>
        {corner.content}
      </span>
    );
  };

  // 코너 선택이 아직 안 됨
  const isCornerSelectionIncomplete = corners.some(
    (corner) => corner.content === "코너 선택",
  );

  // backend 에 제출하기 위해 데이터 형식 변경 (코너)
  const convertCornersToIndices = (cornerArray: Corner[]): CornerIndex[] =>
    cornerArray.map((corner, index) => ({
      categoryId: typeOfCorners.indexOf(corner.content) + 1,
      sequence: index + 1,
      detailName: "fdsfdsfd",
    }));

  // 팬미팅 생성시 유효성 확인
  const validateCreateFanmeeting = () => {
    if (
      title === "" ||
      description === "" ||
      selectedDuration === "" ||
      ticketPrice === "" ||
      isCornerSelectionIncomplete ||
      corners.length === 0 ||
      !peopleNumber ||
      !startDate ||
      !ticketDate ||
      !selectedDuration ||
      !posterSrc
    ) {
      alert("미입력한 항목이 있습니다.");
      return false;
    }
    handleModalOpen();
    return true;
  };

  // 해당 결과를 back으로 전송
  const submitCreateFanmeeting = async () => {
    const [hours, minutes] = selectedDuration.split(":").map(Number);
    const url = await getS3url();
    if (!url || !token) {
      return;
    }
    const [posterImg] = url.split("?");
    const result = {
      title,
      posterImg,
      notice: description,
      participant: peopleNumber,
      runningtime: hours * 60 + minutes,
      startDate: startDate?.toISOString(),
      openDate: ticketDate?.toISOString(),
      price: ticketPrice,
      timetable: convertCornersToIndices(corners),
    };

    // console.log(result);
    // console.log(token);
    try {
      if (!token) {
        return;
      }
      const response = await client(token).post("/api/fanmeeting", result);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error sending post request:", error);
    }

    handleModalClose();
    naviate("/creator-only");
    window.scrollTo(0, 0);
  };
  return (
    <div className="w-full flex flex-col items-center relative">
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
              <p className="text-small mb-1.5">타이틀</p>
              <input
                type="text"
                className="creator-btn-outline-md mt-1 focus:outline-none text-gray-900 mb-5 text-center"
                style={{ borderWidth: "1px" }}
                placeholder="이 곳에 팬미팅 제목을 입력하세요."
                value={title}
                onChange={handleTitle}
              />
              <p className="text-small mb-1.5">참가 인원</p>
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
              <p className="text-small mb-1.5">행사 날짜</p>
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
                  <p className="text-small mb-1.5">진행 시간</p>
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
                  <p className="text-small mb-1.5">티켓 가격</p>
                  <div
                    style={{ borderWidth: "1px" }}
                    className="creator-btn-outline-md w-full flex justify-between"
                  >
                    <input
                      type="text"
                      className="focus:outline-none w-3/4 text-end"
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
                <p className="text-small mb-1.5">예매 오픈일</p>
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
              <p className="text-small mb-1.5">포스터</p>
              <form action="" method="post" encType="multipart/form-data">
                <div>
                  <label htmlFor="photoFile">
                    <div
                      className="creator-btn-outline-md text-center mb-4 hover:cursor-pointer"
                      style={{ borderWidth: "1px" }}
                    >
                      파일 업로드
                    </div>
                    <input
                      type="file"
                      id="photoFile"
                      accept="image/*"
                      onChange={inputImageUpload}
                      className="hidden"
                    />
                  </label>
                  <div>
                    {posterSrc && (
                      <img
                        src={posterSrc as string}
                        alt="Preview"
                        className="max-w-full max-h-full"
                      />
                    )}
                  </div>
                  <div className="relative w-full h-full bg-gray-300 flex justify-center items-center" />
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[40%]">
              <p className="text-small mb-1.5">팬미팅 상세 설명</p>
              <textarea
                onChange={handleDescription}
                placeholder="팬미팅에 대한 나만의 설명을 추가해주세요.
예시)
안녕하세요, ㅇㅇㅇ입니다!
여러분과 함께하는 온라인 팬미팅이 열릴 예정입니다! 🥳
팬미팅에서 특별한 이야기와 깜짝 이벤트를 준비했으니 많이 기대해 주세요! 여러분과 함께 소중한 시간을 보낼 수 있기를 기대합니다. 💖"
                className="focus:outline-none w-full h-[20rem] rounded-[10px] border border-secondary resize-none p-3"
                value={description}
              >
                {description}
              </textarea>
            </div>
            <div className="w-2/5">
              <p className="text-small mb-1.5">타임 테이블 설정</p>
              <button
                onClick={handleAddCorner}
                className="creator-btn-outline-md text-small"
                type="button"
                style={{ borderWidth: "1px" }}
              >
                코너 생성 +
              </button>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="corners">
                  {(providedDroppable: DroppableProvided) => {
                    const {
                      innerRef: droppableInnerRef,
                      droppableProps,
                      placeholder,
                    } = providedDroppable;
                    return (
                      <div
                        ref={droppableInnerRef}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...droppableProps}
                        className="droppable-container"
                      >
                        {corners.map((corner, index) => (
                          <Draggable
                            key={corner.id}
                            draggableId={corner.id}
                            index={index}
                          >
                            {(providedDraggable: DraggableProvided) => {
                              const {
                                innerRef: draggableInnerRef,
                                draggableProps,
                                dragHandleProps,
                              } = providedDraggable;
                              return (
                                <div
                                  ref={draggableInnerRef}
                                  className="w-full flex items-center my-2"
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...draggableProps}
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...dragHandleProps}
                                >
                                  {renderCornerContent(corner, index)}
                                  <button
                                    onClick={() => handleRemoveCorner(index)}
                                    className="creator-btn-outline-md w-[1.2rem] rounded-full h-[1.2rem] ml-2"
                                    type="button"
                                    style={{
                                      padding: "0px",
                                      borderWidth: "1px",
                                    }}
                                  >
                                    -
                                  </button>
                                </div>
                              );
                            }}
                          </Draggable>
                        ))}
                        {placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </DragDropContext>
              {isCornerSelectionIncomplete && (
                <p style={{ color: "#CC3333" }}>
                  코너 선택을 완료해야 팬미팅을 생성할 수 있습니다.
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="w-2/3 creator-btn-md mt-10"
          onClick={validateCreateFanmeeting}
        >
          팬미팅 생성하기
        </button>
      </div>
      {showModal && (
        <Modal onClose={handleModalClose} onConfirm={submitCreateFanmeeting} />
      )}
    </div>
  );
}

export default CreateFanmeeting;
