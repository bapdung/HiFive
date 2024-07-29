const kakaoLogin = () => {
  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/kakao/auth";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  window.location.href = kakaoURL;
  const token = new URL(window.location.href).searchParams.get("code");
};

export default kakaoLogin;
