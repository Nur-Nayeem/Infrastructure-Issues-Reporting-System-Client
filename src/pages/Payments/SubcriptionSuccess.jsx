import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SubscriptionSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosSecureInstance = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecureInstance.post("/payments/confirm", { sessionId });
    }
  }, [sessionId, axiosSecureInstance]);

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
