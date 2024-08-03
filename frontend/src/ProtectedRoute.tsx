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
      try {
        if (!accessToken) {
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        const response = await client(accessToken).get("api/member");
        if (response.data.creator !== requiredCreator) {
          navigate(-1);
        } else {
          setIsCreator(response.data.creator);
        }
      } catch (error) {
        console.error("Fetch User Error :", error);
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchUser();
    }
  }, [accessToken, requiredCreator, navigate, setIsCreator, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
