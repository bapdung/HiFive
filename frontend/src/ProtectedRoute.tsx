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
      setIsLoading(false);

      if (isLoading) {
        return;
      }

      if (!accessToken) {
        navigate("/"); // 로그인 안 했으면 랜딩 페이지로 리다이렉트
        return;
      }

      try {
        const response = await client(accessToken).get("api/member");
        if (requiredCreator && !response.data.creator) {
          navigate("/error?code=UNAUTHORIZED&message=접근 권한이 없습니다.");
        } else {
          setIsCreator(response.data.creator);
          setIsLoading(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          navigate(
            `/error?code=${error.response?.data.errorCode}&message=${encodeURIComponent(error.response?.data.errorMessage)}`,
          );
        }
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [accessToken, requiredCreator, navigate, setIsCreator, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
