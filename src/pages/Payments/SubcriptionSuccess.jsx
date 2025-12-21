import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const SubscriptionSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosInstance = useAxios();

  useEffect(() => {
    if (sessionId) {
      axiosInstance.post("/payments/confirm", { sessionId });
    }
  }, [sessionId, axiosInstance]);

  return (
    <div className="text-center my-20">
      <h1 className="text-2xl font-bold text-green-400">
        Subscription Activated!
      </h1>
      <p className="text-slate-400 mt-2">You are now a Premium user</p>
    </div>
  );
};

export default SubscriptionSuccess;
