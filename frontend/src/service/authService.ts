import axios from "axios";

export const kakaoLogin = () => {
  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = "http://i11a107.p.ssafy.io:8080/login/oauth2/code/kakao";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  window.location.href = kakaoURL;
};

export const handleKakaoCallback = async () => {
  const code = new URL(window.location.href).searchParams.get("code");

  if (code) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_END_POINT}/auth/callback`,
        {
          code,
        },
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
};
