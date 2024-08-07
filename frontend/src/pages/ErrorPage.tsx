import { useLocation } from "react-router-dom";
import errorBird from "../assets/icons/errorBird.svg";

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
    <div className="flex justify-center items-center">
      <img src={errorBird} alt="error-img" />
      <div className="ml-[2rem]">
        <h1 className="text-[96px] font-bold text-gray-500">404 Error !</h1>
        {errorCode || errorMessage ? (
          <div>
            <p className="text-h5 my-2.5 text-gray-500">
              에러코드: {errorCode}
            </p>
            <p className="text-h5 text-gray-500">에러메세지: {errorMessage}</p>
          </div>
        ) : (
          <div>
            <p className="text-h5 my-2.5 text-gray-500">
              죄송합니다. 예상치 못 한 에러가 발생했습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
