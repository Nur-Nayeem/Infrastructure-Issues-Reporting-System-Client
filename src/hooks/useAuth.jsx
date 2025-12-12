import { use } from "react";
import { AuthContext } from "../context/Contexts";

const useAuth = () => {
  const userInfo = use(AuthContext);
  return userInfo;
};
export default useAuth;
