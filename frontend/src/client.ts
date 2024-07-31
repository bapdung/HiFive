import axios from "axios";

const client = (token: string) => {
  const ENDPOINT = process.env.REACT_APP_END_POINT;

  if (!ENDPOINT) {
    console.error("Endpoint is not exist");
    return null;
  }

  const config: {
    baseURL: string;
    headers: {
      "Content-Type": string;
      Authorization?: string;
    };
  } = {
    baseURL: ENDPOINT,
    headers: {
      "Content-Type": `application/json;charset=UTF-8`,
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return axios.create(config);
};

export default client;
