import axios, { AxiosInstance } from "axios";

const client = (token: string): AxiosInstance => {
  const ENDPOINT = process.env.REACT_APP_END_POINT;

  if (!ENDPOINT) {
    throw new Error("Endpoint is not exist");
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
