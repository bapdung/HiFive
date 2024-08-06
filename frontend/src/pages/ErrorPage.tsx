import { useLocation } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const location = useLocation();

  // 쿼리 파라미터를 추출하는 함수
  const getQueryParam = (param: string): string | null => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  const errorCode = getQueryParam("code");
  const errorMessage = getQueryParam("message");

  return (
    <div>
      <h1>에러페이지입니다요</h1>
      <p>에러코드: {errorCode}</p>
      <p>에러메세지: {errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
