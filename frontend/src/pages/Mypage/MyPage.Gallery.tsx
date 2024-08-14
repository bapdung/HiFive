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
      <div className="flex flex-col bg-page-background w-full items-center">
        <div className="mt-10 pt-10 w-full mb-10">
          {photoList.map((fanmeetingPhoto) =>
            fanmeetingPhoto.photoImg.map((photo) => (
              <Photo key={photo.fanUrl} photo={photo} />
            )),
          )}
        </div>
      </div>
    </>
  );
}

export default Gallery;
