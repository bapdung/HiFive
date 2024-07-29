import PosterImg from "../../assets/temp/poster.svg";

interface MyFanmeetingItemProps {
  isDone: boolean;
}

function MyFanmeetingItem({ isDone }: MyFanmeetingItemProps) {
  const title = "팬미팅제목팬미팅제목팬미팅제목팬미팅제목팬미팅제목팬미팅제목";
  const date = "2024.07.14";
  return (
    <div className="w-[18%] flex flex-col items-center m-3">
      <img
        src={PosterImg}
        alt="poster-img"
        className={isDone ? "rounded-[10px] brightness-50" : "rounded-[10px]"}
      />

      <h1 className="text-h5 mt-1">{title}</h1>
      <h2 className="text-h6 text-gray-500">{date}</h2>
      <button type="button" className="creator-btn-light-md w-full mt-3">
        팬미팅 관리
      </button>
    </div>
  );
}
export default MyFanmeetingItem;
