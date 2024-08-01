import axios from "axios";

export const kakaoLogin = () => {
  const REDIRECT_URI = `${process.env.REACT_APP_END_POINT}/oauth2/authorization/kakao`;
  window.location.href = REDIRECT_URI;
};

export const getRefreshToken = () => {
  const refreshToken = document.cookie;
  return refreshToken;
};

export const getAccessToken = async (refreshToken: string) => {
  const response = await axios.post(
    `${process.env.REACT_APP_END_POINT}/api/auth/refresh`,
    refreshToken,
  );

  return response.data.accessToken;
};
