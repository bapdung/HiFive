import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <div className="flex w-full justify-between items-center h-20 px-7 py-2">
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <div className="flex items-center">
        <div className="text-primary-text text-medium m-7">마이페이지</div>
        <div className="btn-light-lg">로그아웃</div>
      </div>
    </div>
  );
}

export default Navbar;
