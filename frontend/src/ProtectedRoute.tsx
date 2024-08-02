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
  const token = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          setIsLoading(false);
          return;
        }
        const response = await client(token).get("api/member");
        if (response.data.creator !== requiredCreator) {
          navigate(-1);
        }
      } catch (error) {
        console.error("Fetch User Error :", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [navigate, requiredCreator, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
