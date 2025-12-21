import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  // const axiosInstance = useAxios();
  const axiosSecureInstance = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecureInstance.post("/payments/confirm", { sessionId });
    }
  }, [sessionId, axiosSecureInstance]);

  return (
    <div className="text-center my-20">
      <h1 className="text-xl font-bold text-green-400">
        Issue Boosted Succefullly
      </h1>
    </div>
  );
};

export default PaymentSuccess;
