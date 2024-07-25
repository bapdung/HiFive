import personIcon from "../../assets/icons/personIcon.png";
import pencilIcon from "../../assets/icons/pencilIcon.png";
import photoIcon from "../../assets/icons/photoIcon.png";
import faceIcon from "../../assets/icons/faceIcon.png";
import pointIcon from "../../assets/icons/pointIcon.png";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white pt-10">
      <div className="flex items-center h-20 pl-10">
        <img src={personIcon} alt="사람아이콘" className="w-4 h-4 mr-3.5" />
        <span className="text-h5">나의 활동</span>
      </div>
      <div className="flex items-center h-20 pl-10">
        <img src={pencilIcon} alt="연필아이콘" className="w-4 h-4 mr-3.5" />
        <span className="text-h5">개인 정보 수정</span>
      </div>
      <div className="flex items-center h-20 pl-10">
        <img src={photoIcon} alt="사진아이콘" className="w-4 h-4 mr-3.5" />
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
