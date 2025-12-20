import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";

const SubcriptionSuccess = () => {
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance
      .patch(`/users/${userId}/subscribe`)
      .then(() => {
        toast.success("Subscribe Succes");
      })
      .catch((err) => {
        toast.error("Errpr", err);
      });
  }, [userId, axiosInstance]);
  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-green-400">
        Subscription Activated!
      </h1>
      <p className="text-slate-400 mt-2">You are now a Premium user</p>
    </div>
  );
};

export default SubcriptionSuccess;
