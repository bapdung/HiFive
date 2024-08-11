import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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
  const { fanmeetingId } = useParams<{ fanmeetingId: string }>();

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
        const userResponse = await client(accessToken).get("api/member");
        const isCreator = userResponse.data.creator;
        const userId = userResponse.data.memberId;
        setIsCreator(isCreator);

        if (requiredCreator && !isCreator) {
          navigate("/error?code=UNAUTHORIZED&message=접근 권한이 없습니다.");
          return;
        }

        if (requiredCreator && fanmeetingId) {
          const fanmeetingResponse = await client(accessToken).get(
            `/api/fanmeeting/${fanmeetingId}`,
          );
          const fanmeetingCreator = fanmeetingResponse.data.creatorId;

          if (userId !== fanmeetingCreator) {
            navigate("/error?code=UNAUTHORIZED&message=접근 권한이 없습니다.");
          }
        }

        setIsLoading(false);
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
  }, [
    accessToken,
    requiredCreator,
    navigate,
    setIsCreator,
    isLoading,
    fanmeetingId,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
