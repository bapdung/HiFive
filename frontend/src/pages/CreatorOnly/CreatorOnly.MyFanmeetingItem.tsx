import propTypes from "prop-types";

interface MyFanmeetingItemProps {
  isDone: boolean;
  title: string;
  posterImg: string;
  startDate: string;
}

const MyFanmeetingItem: React.FC<MyFanmeetingItemProps> = ({
  isDone,
  title,
  posterImg,
  startDate,
}) => (
  <div className="w-[18%] flex flex-col items-center m-3">
    <img
      src={posterImg}
      alt="poster-img"
      className={isDone ? "rounded-[10px] brightness-50" : "rounded-[10px]"}
    />

    <h1 className="text-h5 mt-1">{title}</h1>
    <h2 className="text-h6 text-gray-500">{startDate}</h2>
    <button type="button" className="creator-btn-light-md w-full mt-3">
      팬미팅 관리
    </button>
  </div>
);

MyFanmeetingItem.propTypes = {
  isDone: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  posterImg: propTypes.string.isRequired,
  startDate: propTypes.string.isRequired,
};
export default MyFanmeetingItem;
