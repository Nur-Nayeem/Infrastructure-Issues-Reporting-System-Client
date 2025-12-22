import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://server-public-infrastructure-issue-gold.vercel.app",
  baseURL: "http://localhost:5000",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
