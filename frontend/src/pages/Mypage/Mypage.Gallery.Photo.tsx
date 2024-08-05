import download from "../../assets/icons/download.png";

type PhotoType = {
  creatorName: string;
  title: string;
  fanmeetingStartDate: string;
  photoImg: string;
};

interface PhotoProps {
  photo: PhotoType;
}

function Photo({ photo }: PhotoProps) {
  const date = photo.fanmeetingStartDate.split("T")[0].replaceAll("-", ". ");

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div className="text-h5 mb-5">
        {date} - [{photo.creatorName}] {photo.title}
      </div>
      <div className="flex w-full justify-between px-10">
        <div className="w-[300px] h-[230px] bg-primary-300 relative">
          <img
            src={download}
            alt="다운로드 아이콘"
            className="absolute w-[52.65px] h-[63.93px] right-6 bottom-5"
          />
        </div>
        <div className="w-[300px] h-[230px] bg-secondary-300 relative">
          <img
            src={download}
            alt="다운로드 아이콘"
            className="absolute w-[52.65px] h-[63.93px] right-6 bottom-5"
          />
        </div>
        <div className="w-[300px] h-[230px] bg-primary-300 relative">
          <img
            src={download}
            alt="다운로드 아이콘"
            className="absolute w-[52.65px] h-[63.93px] right-6 bottom-5"
          />
        </div>
        <div className="w-[300px] h-[230px] bg-secondary-300 relative">
          <img
            src={download}
            alt="다운로드 아이콘"
            className="absolute w-[52.65px] h-[63.93px] right-6 bottom-5"
          />
        </div>
      </div>
    </div>
  );
}

export default Photo;
