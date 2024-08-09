import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { kakaoLogin } from "../../service/authService";
import useAuthStore from "../../store/useAuthStore";

import logo from "../../assets/icons/logo/logo.png";
import client from "../../client";

function Navbar() {
  const token = useAuthStore((state) => state.accessToken);
  const [login, setLogin] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === "/";

  const handleLogout = async () => {
    if (token) {
      const response = await client(token).get("/api/member/logout");

      if (response.status === 200) {
        useAuthStore.getState().setAccessToken(null);
        localStorage.removeItem("accessToken");
        document.cookie = "refresh_token=; path=/; max-age=0;";
        setLogin(false);
        navigate("/");
        window.location.reload();
      }
    }
  };

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
      className={`z-10 bg-white flex w-full justify-between items-center h-20 px-10 py-2 ${isLanding ? "bg-white bg-opacity-85 backdrop-blur-md shadow-none sticky top-0" : "bg-white shadow-nav-shadow"}`}
    >
      <div>
        <img
          src={logo}
          alt="Logo"
          className="w-[164.72px] h-[44px] hover:cursor-pointer"
          onClick={() => navigate("/main")}
          role="presentation"
        />
      </div>
      <div className="flex items-center">
        {login ? (
          <>
            <div
              className="text-primary-text text-medium font-semibold m-10 hover:cursor-pointer"
              onClick={() => navigate("/mypage")}
              role="presentation"
            >
              마이페이지
            </div>
            <div
              className="btn-light-lg hover:cursor-pointer"
              onClick={handleLogout}
              role="presentation"
            >
              로그아웃
            </div>
          </>
        ) : (
          <>
            <div
              className="text-primary-text text-medium font-semibold m-10 hover:cursor-pointer"
              onClick={kakaoLogin}
              role="presentation"
            >
              로그인
            </div>
            <div
              className="btn-lg hover:cursor-pointer"
              onClick={kakaoLogin}
              role="presentation"
            >
              회원가입
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
