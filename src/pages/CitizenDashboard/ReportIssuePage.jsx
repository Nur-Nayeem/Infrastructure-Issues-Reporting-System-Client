import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { UpgradeNotice } from "../../components/DashBoardComponents/ReportIssues/UpgradeNotice";
import ImageComponent from "../../components/DashBoardComponents/ReportIssues/ImageComponent";
import toast from "react-hot-toast";

export const ReportIssuePage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  // Mocked user subscription
  const user = {
    isPremium: true,
    issuesReported: 2,
    maxFreeIssues: 3,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.isPremium && user.issuesReported >= user.maxFreeIssues) {
      toast.error(
        "Free users can only report 3 issues. Please upgrade to premium."
      );
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (image) data.image = image;

    console.log(data);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-slate-100 mb-8">
        Report New Issue
      </h1>

      {/* Subscription Notice */}
      {!user.isPremium && user.issuesReported >= user.maxFreeIssues && (
        <UpgradeNotice />
      )}

      {!user.isPremium && user.issuesReported < user.maxFreeIssues && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8">
          <p className="text-blue-300 text-sm">
            Free issues used: {user.issuesReported} / {user.maxFreeIssues}
          </p>
        </div>
      )}

      {/* Report Issue Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-dark backdrop-blur-sm rounded-xl border border-slate-700 p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Section: Text Fields */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="text-sm text-slate-300 mb-1 block">
                Issue Title *
              </label>
              <input
                name="title"
                required
                className="w-full bg-background-dark/60 border border-slate-800 rounded-lg p-3 text-sm text-white outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition"
                placeholder="Title of the Issue"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300 mb-1 block">
                Description *
              </label>
              <textarea
                name="description"
                rows={4}
                required
                className="w-full bg-background-dark/60 border border-slate-800 rounded-lg p-3 text-sm text-white outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition"
                placeholder="Describe the issue in detail..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-300 mb-1 block">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  className="w-full bg-background-dark/60 border border-slate-800 rounded-lg p-3 text-sm text-white outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition"
                >
                  <option value="">Select Category</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="sanitation">Sanitation</option>
                  <option value="electricity">Electricity</option>
                  <option value="water">Water Supply</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">
                  Location *
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3.5 text-slate-500" />
                  <input
                    name="location"
                    required
                    className="w-full bg-background-dark/60 border border-slate-800 rounded-lg p-3 px-8 text-sm text-white outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition"
                    placeholder="Enter location"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Image Upload */}
          <ImageComponent
            image={image}
            handleImageUpload={handleImageUpload}
            setImage={setImage}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-10">
          <button
            type="button"
            onClick={() => navigate("/dashboard/user/my-issues")}
            className="px-6 py-3 border border-slate-700 rounded-full hover:bg-slate-800 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn-primary inline-flex items-center justify-center cursor-pointer"
          >
            Submit Issue
          </button>
        </div>
      </form>
    </div>
  );
};
