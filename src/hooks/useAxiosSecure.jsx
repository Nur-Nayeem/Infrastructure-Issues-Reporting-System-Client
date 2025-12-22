import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
const axiosInstance = axios.create({
  // baseURL: "https://server-public-infrastructure-issue-gold.vercel.app",
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [user?.accessToken]);

  return axiosInstance;
};

export default useAxiosSecure;
