import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { BiLock } from "react-icons/bi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router"; // Use react-router-dom
import ErrorInput from "../../components/AuthComponents/ErrorComponent";
import { AuthContext } from "../../context/Contexts";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });
  const { loginUser, signWithGoogle, authLoading } = use(AuthContext);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const { email, password } = data;

    console.log({ email, password });
    try {
      await loginUser(email, password);
      navigate("/");
      toast.success("Login Successful");
    } catch (err) {
      setError(err);
      toast.error(err?.message);
    }

    //logic
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signWithGoogle();
      const userInfo = {
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };
      axiosInstance
        .post("/users", userInfo)
        .then((res) => {
          toast.success("login succefull");
          console.log("user data has been stored", res.data);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      setError(err);
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold font-display text-white tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-slate-300">
          Please enter your details to sign in.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>

            <div className="relative">
              <MdAlternateEmail className="absolute left-3 top-4 text-gray-500" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-8 py-3 bg-surface-dark border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-primary outline-none"
                {...register("email", {
                  required: "Email required",
                })}
              />
            </div>

            {errors.email && <ErrorInput error={errors.email.message} />}
          </div>

          {/* password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-slate-300">
                Password
              </label>
            </div>

            <div className="relative">
              <BiLock className="absolute left-3 top-4 text-gray-500" />

              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-8 py-3 bg-surface-dark border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-primary outline-none"
                {...register("password", {
                  required: "Password required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/,
                    message:
                      "Password must be at least 6 characters and include uppercase, lowercase, and special character",
                  },
                })}
              />

              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-4 cursor-pointer text-xl text-gray-500"
              >
                {showPass ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>

            {errors.password && <ErrorInput error={errors.password.message} />}
          </div>
        </div>

        <button
          type="submit"
          disabled={authLoading}
          className="w-full flex justify-center p-4 border border-transparent rounded-lg font-bold text-white bg-primary hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/30"
        >
          {authLoading ? "Signing in..." : "Sign in to account"}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background-dark text-slate-500 uppercase tracking-widest text-xs">
            Or continue with
          </span>
        </div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-600 rounded-lg bg-surface-dark hover:bg-slate-700 text-slate-200 transition-colors font-medium shadow-md"
      >
        <FcGoogle />
        Google
      </button>

      {error && <ErrorInput error={error} />}

      <p className="text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:text-white transition-colors"
        >
          Sign up for free
        </Link>
      </p>
    </div>
  );
};

export default Login;
