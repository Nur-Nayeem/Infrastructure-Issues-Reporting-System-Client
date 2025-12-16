import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useUser = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const {
    isLoading: userLoading,
    data: currentUser = null,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["current-user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      console.log(user.email);

      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data.user || null;
    },
  });

  return { currentUser, userLoading, refetchUser };
};

export default useUser;
