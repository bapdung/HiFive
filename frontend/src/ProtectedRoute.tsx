import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import client from "./client";
import useAuthStore from "./store/useAuthStore";

interface ProtectedRouteProps {
  requiredCreator?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredCreator = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, setIsCreator } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        navigate("/"); // 로그인 페이지로 리다이렉트
        return;
      }

      try {
        const response = await client(accessToken).get("api/member");
        if (response.data.creator !== requiredCreator) {
          navigate("/error?code=UNAUTHORIZED&message=접근 권한이 없습니다.");
        } else {
          setIsCreator(response.data.creator);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          navigate(
            `/error?code=${error.response?.data.errorCode}&message=${encodeURIComponent(error.response?.data.errorMessage)}`,
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [accessToken, requiredCreator, navigate, setIsCreator]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
