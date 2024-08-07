import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import client from "../../client";
import creatorLogo from "../../assets/icons/logo/creator-logo.png";

function CreatorNavbar() {
  const token = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (token) {
      const response = await client(token).get("/api/member/logout");

      if (response.status === 200) {
        useAuthStore.getState().setAccessToken(null);
        localStorage.removeItem("accessToken");
        document.cookie = "refresh_token=; path=/; max-age=0;";
        navigate("/");
        window.location.reload();
      }
    }
  };

  return (
    <div className="bg-white flex w-screen justify-between items-center h-20 px-10 py-2 shadow-nav-shadow">
      <div>
        <img
          src={creatorLogo}
          alt="Logo"
          className="w-[265.27px] h-[44px] hover:cursor-pointer"
          onClick={() => navigate("/main")}
          role="presentation"
        />
      </div>
      <div className="flex items-center">
        <div
          className="text-secondary text-medium font-semibold m-10 hover:cursor-pointer"
          onClick={() => navigate("/creator-only")}
          role="presentation"
        >
          마이페이지
        </div>
        <button
          type="button"
          className="creator-btn-light-lg"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default CreatorNavbar;
