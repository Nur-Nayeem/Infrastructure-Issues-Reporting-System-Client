import React, { useState } from "react";
import { FaEnvelope, FaLock, FaPhone, FaUserTie } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { MdOutlineFileUpload } from "react-icons/md";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../lib";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const defaultAvatar = "https://i.ibb.co.com/B26DPRzZ/avater.jpg";

const AddStaffModel = ({ setShowAddModal, staffRefetch }) => {
  const axiosSecureInstance = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* image preview */
  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const { name, email, password, phone, image } = data;
    const imageFile = image?.[0];

    try {
      let imageURL = defaultAvatar;

      // upload image if selected
      if (imageFile) {
        imageURL = await imageUpload(imageFile);
      }

      const staffData = {
        name,
        email,
        password,
        phone,
        photoURL: imageURL,
        role: "staff",
      };

      await axiosSecureInstance.post("/create-staff", staffData);
      staffRefetch();
      toast.success("Staff account created");
      setShowAddModal(false);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create staff";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-dark rounded-xl p-6 max-w-lg w-full border border-slate-800 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-slate-100 mb-6">
          Add New Staff Member
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* image upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <GoPerson className="text-4xl text-slate-500" />
                )}
              </div>

              <label
                htmlFor="staff-photo"
                className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer hover:bg-primary/90"
              >
                <MdOutlineFileUpload className="text-white" />
              </label>

              <input
                id="staff-photo"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", {
                  onChange: handlePhoto,
                })}
              />
            </div>
            <span className="text-xs text-slate-400 mt-2">
              Upload Photo (optional)
            </span>
          </div>

          <div className="space-y-4 mb-6">
            {/* NAME */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <FaUserTie className="inline mr-2" /> Full Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 text-slate-100"
                placeholder="Enter full name"
                {...register("name", {
                  required: "Name required",
                  minLength: { value: 3, message: "Min 3 characters" },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <FaPhone className="inline mr-2" /> Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 text-slate-100"
                placeholder="+880 1XXXXXXXXX"
                {...register("phone")}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <FaEnvelope className="inline mr-2" /> Email *
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 text-slate-100"
                placeholder="staff@example.com"
                {...register("email", { required: "Email required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                <FaLock className="inline mr-2" /> Password *
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 text-slate-100"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/,
                    message:
                      "Password must be at least 6 characters and include uppercase, lowercase, and special character",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-4 py-3 border border-slate-700 rounded-lg hover:border-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Staff Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModel;
