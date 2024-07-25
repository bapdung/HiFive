import personIcon from "../../assets/icons/sidebar/personIcon.png";
import pencilIcon from "../../assets/icons/sidebar/pencilIcon.png";
import galleryIcon from "../../assets/icons/sidebar/galleryIcon.png";
import faceIcon from "../../assets/icons/sidebar/faceIcon.png";
import pointIcon from "../../assets/icons/sidebar/pointIcon.png";

function Sidebar() {
  return (
    <div className="w-64 h-full bg-white pt-10 absolute left-0 shadow-side-shadow">
      <div className="flex items-center h-20 pl-10">
        <img src={personIcon} alt="사람아이콘" className="w-4 h-4 mr-3.5" />
        <span className="text-h5">나의 활동</span>
      </div>
      <div className="flex items-center h-20 pl-10">
        <img src={pencilIcon} alt="연필아이콘" className="w-4 h-4 mr-3.5" />
        <span className="text-h5">개인 정보 수정</span>
      </div>
      <div className="flex items-center h-20 pl-10">
        <img src={galleryIcon} alt="사진아이콘" className="w-4 h-4 mr-3.5" />
        <span className="text-h5">추억 갤러리</span>
      </div>
      <div className="flex items-center h-20 pl-10">
        <img src={faceIcon} alt="얼굴아이콘" className="w-4 h-4 mr-3.5" />
        <span className="text-h5">신분증 등록</span>
      </div>
      <div className="flex items-center h-20 pl-10">
        <img src={pointIcon} alt="포인트아이콘" className="w-4 h-4 mr-3.5" />
        <span className="text-h5">충전 및 내역 조회</span>
      </div>
    </div>
  );
}

export default Sidebar;
