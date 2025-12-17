import React, { useState } from "react";
import { FaCamera, FaSave, FaIdCard } from "react-icons/fa";

export const StaffProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    employeeId: "STF-00123",
    department: "Public Works",
    position: "Civil Engineer",
    joiningDate: "2023-01-15",
    address: "456 Staff Street, City",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setTimeout(() => {
      setProfile((prev) => ({ ...prev, ...data }));
      setLoading(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 md:p-10 bg-slate-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Staff Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 rounded-2xl p-6 shadow-lg space-y-6 border border-slate-700"
        >
          {/* Profile Image */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-linear-to-br from-primary/70 to-primary/80 border-4 border-slate-700 overflow-hidden flex items-center justify-center text-white text-2xl font-bold">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full cursor-pointer transition"
              >
                <FaCamera className="w-4 h-4" />
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
              <p className="text-slate-300 font-medium">Upload Staff Photo</p>
              <p className="text-slate-400 text-sm">JPG, PNG up to 5MB</p>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <FaIdCard className="absolute left-3 top-4 text-slate-500" />
              <input
                name="name"
                defaultValue={profile.name}
                required
                className="input-box"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              <FaSave />
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-slate-700 rounded-lg hover:border-slate-500 text-slate-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Staff Info Card (Read-only) */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">
            Staff Information
          </h3>
          {[
            { label: "Employee ID", value: profile.employeeId },
            { label: "Joining Date", value: profile.joiningDate },
            { label: "Department", value: profile.department },
            { label: "Position", value: profile.position },
            { label: "Address", value: profile.address },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="text-white font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
