import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import Photo from "./Mypage.Gallery.Photo";
import client from "../../client";

type PhotoType = {
  creatorUrl: string;
  fanUrl: string;
};

type FanmeetingPhoto = {
  creatorName: string;
  title: string;
  fanmeetingId: number;
  fanmeetingDate: string;
  photoImg: PhotoType[];
};

function Gallery() {
  const token = useAuthStore((state) => state.accessToken);
  const [photoList, setPhotoList] = useState<FanmeetingPhoto[]>([]);

  useEffect(() => {
    const getPhoto = async () => {
      if (token) {
        const response = await client(token).get("/api/photo");
        if (response.status === 200) {
          setPhotoList(response.data);
        }
      }
    };
    getPhoto();
  }, [token]);

  return (
    <>
      <div className="text-h4 font-semibold py-6">추억 갤러리</div>
      <div className="flex bg-page-background w-full items-center overflow-x-scroll">
        <div className="flex px-4 relative">
          {photoList.map((fanmeetingPhoto) =>
            fanmeetingPhoto.photoImg.map((photo, index) => (
              <>
                {index === 0 && (
                  <p className="absolute px-4">
                    <span className="text-primary-text">
                      {fanmeetingPhoto.creatorName
                        ? fanmeetingPhoto.creatorName
                        : "크리에이터"}
                    </span>
                    &nbsp; 와/과의 팬미팅 추억
                  </p>
                )}
                <Photo key={photo.fanUrl} photo={photo} />
              </>
            )),
          )}
        </div>
      </div>
    </>
  );
}

export default Gallery;
