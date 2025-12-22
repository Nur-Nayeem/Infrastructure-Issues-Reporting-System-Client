import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { UpgradeNotice } from "../../components/DashBoardComponents/ReportIssues/UpgradeNotice";
import ImageComponent from "../../components/DashBoardComponents/ReportIssues/ImageComponent";
import toast from "react-hot-toast";
import { imageUpload } from "../../lib";
import useUser from "../../hooks/useUser";
import { MdDescription, MdTitle } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/Loader";

export const ReportIssuePage = () => {
  const navigate = useNavigate();
  // const axiosInstance = useAxios();
  const axiosSecureInstance = useAxiosSecure();
  const [image, setImage] = useState(null);
  const [fileImg, setFileImg] = useState(null);
  const [loadingReport, setLoadingReport] = useState(false);

  const { currentUser, userLoading, refetchUser } = useUser();

  if (userLoading) return <LoadingSpinner />;
  if (!currentUser) return <p>No user found in DB</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingReport(true);

    if (!currentUser?.isPremium && currentUser?.issuesReported >= 3) {
      toast.error(
        "Free users can only report 3 issues. Please upgrade to premium."
      );
      setLoadingReport(false);
      return;
    }

    if (!fileImg) {
      toast.error("Please select an image.");
      setLoadingReport(false);
      return;
    }

    const img = await imageUpload(fileImg);
    if (!img) {
      toast.error("Image upload failed. Try again.");
      setLoadingReport(false);
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const IssueData = {
      ...data,
      image: img,
      reportedBy: currentUser.email,
      userId: currentUser._id,
    };
    console.log(IssueData);

    try {
      const res = await axiosSecureInstance.post("/issues", IssueData);
      if (res.data) {
        toast.success("Issue reported successfully");

        // Refetch user data
        await refetchUser();
        setLoadingReport(false);
        // Navigate to my issues page
        navigate("/dashboard/user/my-issues");
      }
    } catch (error) {
      setLoadingReport(false);
      toast.error("Failed to report issue", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFileImg(file);
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-slate-100 mb-8">
        Report New Issue
      </h1>

      {/* Subscription Notice */}
      {!currentUser.isPremium && currentUser.issuesReported >= 3 && (
        <UpgradeNotice user={currentUser} />
      )}

      {!currentUser.isPremium && currentUser.issuesReported < 3 && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8">
          <p className="text-blue-300 text-sm">
            Free issues used: {currentUser.issuesReported} / 3
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
              <div className="relative">
                <MdTitle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="title"
                  required
                  className="input-box"
                  placeholder="Title of the Issue"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-300 mb-1 block">
                Description *
              </label>
              <div className="relative">
                <MdDescription className="absolute left-4 top-[18px] text-slate-500" />
                <textarea
                  name="description"
                  rows={4}
                  required
                  className="input-box"
                  placeholder="Describe the issue in detail..."
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-300 mb-1 block">
                  Category *
                </label>
                <div className="relative">
                  <BiCategory className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select name="category" required className="input-box">
                    <option value="">Select Category</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="sanitation">Sanitation</option>
                    <option value="electricity">Electricity</option>
                    <option value="water">Water Supply</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">
                  Location *
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3.5 text-slate-500" />
                  <input
                    name="location"
                    placeholder="Location"
                    required
                    className="input-box"
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
            {loadingReport ? "Submitting..." : "Submit Issue"}
          </button>
        </div>
      </form>
    </div>
  );
};
