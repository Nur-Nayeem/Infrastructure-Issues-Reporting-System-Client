import React, { useState } from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaLock,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import BlockedUser from "../../components/DashBoardComponents/BlockedUser/BlockedUser";
import useUser from "../../hooks/useUser";
import {
  PremiumUserCard,
  SubscribeCard,
} from "../../components/DashBoardComponents/ProfileComponents/SubscribeCard";
import StatsCard from "../../components/DashBoardComponents/ProfileComponents/StatsCard";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { imageUpload } from "../../lib";
import useAuth from "../../hooks/useAuth";

export const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [fileImg, setFileImg] = useState(null);

  const { currentUser, userLoading, refetchUser } = useUser();
  const axiosInstance = useAxios();
  const { updateUserProfile } = useAuth();

  const [user, setUser] = useState({
    name: currentUser?.displayName,
    email: currentUser?.email,
    photoURL: currentUser?.photoURL,
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
    isPremium: currentUser?.isPremium || false,
    isBlocked: currentUser?.isBlocked || false,
    subscriptionDate: currentUser?.subscriptionDate || null,
    totalPayments: currentUser?.totalPayments || "৳0",
  });
  const [profileImage, setProfileImage] = useState(user.photoURL);

  if (userLoading) return <p>Loading...</p>;
  if (!currentUser) return <p>No user found in DB</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      let img;
      if (fileImg) {
        img = await imageUpload(fileImg);
        if (!img) {
          toast.error("Image upload failed. Try again.");
          return;
        }
      }
      const finalData = {
        ...data,
        photoURL: img,
      };

      await updateUserProfile(data.name, img);

      await axiosInstance.patch(
        `/users/update/${currentUser.email}`,
        finalData
      );
      await refetchUser();

      setUser((prev) => ({ ...prev, ...finalData }));
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFileImg(file);
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-100 mb-8">
        Profile Settings
      </h1>

      {user.isBlocked && <BlockedUser />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-surface-dark rounded-2xl border border-slate-800 p-8 space-y-6 shadow-lg"
          >
            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Profile Photo
              </label>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden shadow-inner">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-slate-500 text-2xl">
                        <FaCamera />
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-1 right-1 bg-primary p-2 rounded-full cursor-pointer border border-slate-700 hover:bg-primary/80 transition"
                  >
                    <FaCamera className="w-4 h-4 text-white" />
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <p className="text-sm text-slate-400">
                    Click the camera icon to upload
                  </p>
                  <p className="text-xs text-slate-500">
                    Recommended: 256x256 px
                  </p>
                </div>
              </div>
            </div>

            {/* Text Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    name="name"
                    defaultValue={user.name}
                    required
                    className="input-box"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <MdAlternateEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    name="email"
                    type="email"
                    defaultValue={user.email}
                    required
                    className="input-box"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    name="phone"
                    placeholder="Phone Number"
                    defaultValue={user.phone}
                    className="input-box"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Address
                </label>
                <div className="relative">
                  <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    name="address"
                    placeholder="Address"
                    defaultValue={user.address}
                    className="input-box"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || user.isBlocked}
              className="btn-primary w-full py-3 mt-4"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>

        {/* Subscription / Stats */}
        <div className="space-y-6">
          {/* Subscription Card */}
          <div className="bg-surface-dark rounded-2xl border border-slate-800 p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`p-3 rounded-full ${
                  user.isPremium ? "bg-green-500/20" : "bg-slate-800"
                }`}
              >
                {user.isPremium ? (
                  <FaCheckCircle className="text-green-400" />
                ) : (
                  <FaLock className="text-slate-400" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-slate-100">Subscription</h3>
                <p
                  className={`text-sm ${
                    user.isPremium ? "text-green-400" : "text-slate-400"
                  }`}
                >
                  {user.isPremium ? "Premium User" : "Free User"}
                </p>
              </div>
            </div>

            {!user.isPremium && !user.isBlocked ? (
              <SubscribeCard user={user} />
            ) : user.isPremium ? (
              <PremiumUserCard user={user} />
            ) : null}
          </div>

          {/* Stats Card */}
          <StatsCard user={user} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};
