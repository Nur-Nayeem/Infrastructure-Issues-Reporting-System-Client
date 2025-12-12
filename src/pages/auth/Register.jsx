import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { BiLock } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdAlternateEmail, MdOutlineFileUpload } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import ErrorInput from "../../components/AuthComponents/ErrorComponent";
import { imageUpload } from "../../lib";
import { AuthContext } from "../../context/Contexts";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const [showPass, setShowPass] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const { createUser, updateUserProfile } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Image preview only
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    const { name, image, email, password } = data;
    const imageFile = image && image.length > 0 ? image[0] : null;

    if (!imageFile) {
      toast.error("Please upload a profile photo");
      return;
    }

    try {
      const imageURL = await imageUpload(imageFile);

      await createUser(email, password);
      await updateUserProfile(name, imageURL);

      const userDetails = {
        email,
        displayName: name,
        photoURL: imageURL,
      };

      await axiosInstance.post("/users", userDetails);
      setLoading(false);
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      setError(err);
      setLoading(false);
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white font-display">
            Create Account
          </h2>
          <p className="text-slate-300 mt-2">Start reporting issues today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* image upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-slate-600 bg-surface-dark flex items-center justify-center shadow-lg">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <GoPerson className="text-slate-500 text-4xl" />
                )}
              </div>

              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-primary/90 text-white p-2 rounded-full cursor-pointer hover:bg-primary shadow-lg transition-transform hover:scale-110"
                title="Upload Photo"
              >
                <MdOutlineFileUpload />
              </label>

              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", {
                  onChange: (e) => handlePhoto(e),
                })}
              />
            </div>
            <span className="text-xs text-slate-400 mt-2">
              Upload Profile Photo
            </span>
          </div>

          {/* name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Name
            </label>

            <div className="relative">
              <BsPerson className="absolute left-3 top-4 text-gray-500" />

              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full px-8 py-3 bg-surface-dark border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-primary outline-none"
                {...register("name", {
                  required: "Name required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
            </div>

            {errors.name && <ErrorInput error={errors.name.message} />}
          </div>

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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-lg bg-primary hover:bg-red-600 text-white font-bold shadow-lg shadow-primary/30 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {error && <ErrorInput error={error} />}

        <p className="mt-8 text-center text-slate-400 text-sm">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-white"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
