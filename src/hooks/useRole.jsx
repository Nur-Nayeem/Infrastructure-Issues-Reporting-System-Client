import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();

  const { isLoading: roleLoading, data: role = "citizen" } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(`/users/${user.email}/role`);

      return res.data?.role || "user";
    },
  });

  return { role, roleLoading };
};

export default useRole;
