type Fanmeeting = {
  fanmeetingId: number;
  title: string;
  posterImg: string;
  creatorName: string;
  startTime: string;
};

interface FanmeetingInfoProps {
  fanmeeting: Fanmeeting;
}

function FanmeetingInfo({ fanmeeting }: FanmeetingInfoProps) {
  const { title, posterImg, startTime } = fanmeeting;

  return (
    <div className="w-56 mb-5">
      <img
        src={posterImg}
        alt="팬미팅포스터"
        className="w-full h-72 bg-gray-300 rounded-xl"
      />
      <div className="flex flex-col items-center mt-2.5">
        <h4 className="text-h5">{title}</h4>
        <span className="text-h6 text-gray-600">{startTime}</span>
      </div>
    </div>
  );
}

export default FanmeetingInfo;
