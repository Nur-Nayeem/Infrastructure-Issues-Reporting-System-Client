import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const issueId = params.get("issueId");
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .patch(`/issues/${issueId}/boosted`)
      .then(() => {
        toast.success("Payment Succes");
      })
      .catch((err) => {
        toast.error("Errpr", err);
      });
  }, [axiosInstance, issueId]);

  return (
    <div className="h-screen flex justify-center items-center">
      <h1>Payment Successful 🎉 Issue Boosted!</h1>
    </div>
  );
};

export default PaymentSuccess;
