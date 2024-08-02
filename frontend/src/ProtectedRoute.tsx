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
  const [isCreator, setIsCreator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("컴포넌트확인");
    const fetchUser = async () => {
      try {
        if (!token) {
          setIsLoading(false);
          return;
        }
        const response = await client(token).get("api/member");
        console.log("success : 유저 정보 Fetch");
        console.log(response.data);
        if (response.data.creator) {
          setIsCreator(true);
        }
      } catch (error) {
        console.error("Fetch User Error :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  useEffect(() => {
    if (!isLoading) {
      if (requiredCreator && !isCreator) {
        navigate(-1); // 이전 페이지로 이동
      }
    }
  }, [isLoading, requiredCreator, isCreator, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
