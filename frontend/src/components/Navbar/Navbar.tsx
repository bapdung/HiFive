import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { kakaoLogin } from "../../service/authService";

import logo from "../../assets/icons/logo/logo.png";

function Navbar() {
  const [login, setLogin] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === "/";

  useEffect(() => {
    const localToken = localStorage.getItem("accessToken");

    if (localToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <div
      className={`z-10 bg-white flex w-screen justify-between items-center h-20 px-10 py-2 ${isLanding ? "bg-[rgba(255,255,255,0.6)] backdrop-blur-xl shadow-none sticky top-0" : "bg-white shadow-nav-shadow"}`}
    >
      <div>
        <img
          src={logo}
          alt="Logo"
          className="w-[164.72px] h-[44px]"
          onClick={() => navigate("/")}
          onKeyDown={() => navigate("/")}
          role="presentation"
        />
      </div>
      <div className="flex items-center">
        {login ? (
          <>
            <div className="text-primary-text text-medium m-7">마이페이지</div>
            <div className="btn-light-lg">로그아웃</div>
          </>
        ) : (
          <>
            <div
              className="text-primary-text text-large font-bold m-10"
              onClick={kakaoLogin}
              onKeyDown={kakaoLogin}
              role="presentation"
            >
              로그인
            </div>
            <div className="btn-lg">회원가입</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
