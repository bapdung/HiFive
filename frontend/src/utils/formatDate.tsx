const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, "0");

  const weekDayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const weekDay = weekDayNames[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${weekDay})`;
};

export default formatDate;
