import axios, { AxiosInstance } from "axios";
import { AppError } from "../utils/AppError";
import { useAuth } from "../hooks/useAuth";
import { storageTokenGet } from "../storage/storageToken";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
}) as APIInstanceProps;

api.registerInterceptTokenManager = (singOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      const token = await storageTokenGet();

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }g

      if (requestError.response?.status === 401) {
        if (
          requestError.response.data?.message === "Formato de token inválido" ||
          requestError.response.data?.message === "Token inválido"
        ) {
          singOut();
        }
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
