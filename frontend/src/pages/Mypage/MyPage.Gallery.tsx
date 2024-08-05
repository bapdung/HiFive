import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import Photo from "./Mypage.Gallery.Photo";
import client from "../../client";

type PhotoType = {
  creatorName: string;
  title: string;
  fanmeetingStartDate: string;
  photoImg: string[];
};

function Gallery() {
  const token = useAuthStore((state) => state.accessToken);

  const [photoList, setPhotoList] = useState<PhotoType[]>();

  useEffect(() => {
    const getPhoto = async () => {
      if (token) {
        const response = await client(token).get("/api/photo");

        if (response.status === 400) {
          setPhotoList([]);
        } else if (response.status === 200) {
          setPhotoList(response.data);
        }
      }
    };

    getPhoto();
  }, [token]);

  return (
    <>
      <div className="text-2xl font-semibold pt-10">나의 갤러리</div>
      <div>
        <span className="text-h6 text-primary-text mr-2.5">최신순</span>
        <span className="text-h6 text-gray-700 ml-2.5">과거순</span>
      </div>
      <div className="mt-10 bg-page-background pt-10 w-full mb-10">
        {photoList?.map((photo: PhotoType) => (
          <Photo photo={photo} key={photo.photoImg[0]} />
        ))}
      </div>
    </>
  );
}

export default Gallery;
