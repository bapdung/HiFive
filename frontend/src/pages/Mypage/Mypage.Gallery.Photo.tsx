import download from "../../assets/icons/download.png";

type Photo = {
  creatorName: string;
  title: string;
  fanmeetingStartDate: string;
  photoImg: string[];
};

interface PhotoProps {
  photo: Photo;
}

function Photo({ photo }: PhotoProps) {
  const date = photo.fanmeetingStartDate.split("T")[0].replaceAll("-", ". ");

  const handleDownload = async (imgSrc: string) => {
    try {
      const response = await fetch(imgSrc, { mode: "cors" });
      const blob = await response.blob();
      const blobURL = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobURL;
      link.download = "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error("다운로드 중 문제 발생 :", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div className="text-h5 mb-5">
        {date} - [{photo.creatorName}] {photo.title}
      </div>
      <div className="flex w-full justify-between px-10">
        {photo.photoImg.map((img: string) => (
          <div key={img + Date.now() + Math.random()} className="relative">
            <img
              src={img}
              alt="사진"
              className="w-[300px] h-[230px] bg-primary-300"
            />
            <img
              src={download}
              alt="다운로드 아이콘"
              className="absolute w-[52.65px] h-[63.93px] right-6 bottom-5 z-30 hover:cursor-pointer"
              onClick={() => handleDownload(img)}
              role="presentation"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photo;
