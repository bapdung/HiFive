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

  const [photoList, setPhotoList] = useState<PhotoType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const changeSort = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const content = e.currentTarget.textContent;

    if (content === "최신순") {
      setSort("desc");
    } else if (content === "과거순") {
      setSort("asc");
    }
  };

  useEffect(() => {
    const getPhoto = async () => {
      const params = { sort };

      if (token) {
        const response = await client(token).get("/api/photo", { params });

        if (response.status === 200) {
          setPhotoList(response.data);
        }
      }
    };

    getPhoto();
  }, [token, sort]);

  return (
    <>
      <div className="text-2xl font-semibold pt-10">나의 갤러리</div>
      <div>
        <span
          className={`text-h6  mr-2.5 ${sort === "desc" ? "text-primary-text" : "text-gray-700"} hover:cursor-pointer`}
          onClick={(e) => changeSort(e)}
          role="presentation"
        >
          최신순
        </span>
        <span
          className={`text-h6 ml-2.5 ${sort === "asc" ? "text-primary-text" : "text-gray-700"} hover:cursor-pointer`}
          onClick={(e) => changeSort(e)}
          role="presentation"
        >
          과거순
        </span>
      </div>
      <div className="mt-10 bg-page-background pt-10 w-full mb-10">
        {photoList?.map((photo: PhotoType) => (
          <Photo
            photo={photo}
            key={photo.creatorName + Date.now() + Math.random()}
          />
        ))}
      </div>
    </>
  );
}

export default Gallery;
