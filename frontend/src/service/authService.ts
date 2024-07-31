const kakaoLogin = () => {
  const REDIRECT_URI = `${process.env.REACT_APP_END_POINT}/oauth2/authorization/kakao`;
  window.location.href = REDIRECT_URI;
};

export default kakaoLogin;
