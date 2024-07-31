import Photo from "./Mypage.Gallery.Photo";

function Gallery() {
  return (
    <>
      <div className="text-2xl font-semibold pt-10">나의 갤러리</div>
      <div>
        <span className="text-h6 text-primary-text mr-2.5">최신순</span>
        <span className="text-h6 text-gray-700 ml-2.5">과거순</span>
      </div>
      <div className="mt-10 bg-page-background pt-10 w-full mb-10">
        <Photo />
        <Photo />
        <Photo />
      </div>
    </>
  );
}

export default Gallery;
