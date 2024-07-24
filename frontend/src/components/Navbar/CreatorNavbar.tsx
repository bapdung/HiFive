import creatorLogo from "../../assets/creator-logo.png";

function CreatorNavbar() {
  return (
    <div className="bg-white flex w-screen justify-between items-center h-20 px-10 py-2 shadow-nav-shadow">
      <div>
        <img src={creatorLogo} alt="Logo" className="w-[265.27px] h-[44px]" />
      </div>
      <div className="flex items-center">
        <div className="text-secondary text-medium m-7">마이페이지</div>
        <div className="creator-btn-light-lg">로그아웃</div>
      </div>
    </div>
  );
}

export default CreatorNavbar;
