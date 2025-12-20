import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { MdDescription, MdOutlineFileUpload, MdTitle } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";
import { imageUpload } from "../../../lib";

const EditIssueModal = ({ isOpen, onClose, issue, refetch }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();

  useEffect(() => {
    if (issue) {
      setValue("title", issue.title);
      setValue("description", issue.description);
      setValue("category", issue.category);
      setValue("location", issue.location);
      setPreview(issue.image);
    }
  }, [issue, setValue]);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageURL = issue.image;

      // If a new image is selected, upload it
      if (data.image?.[0]) {
        imageURL = await imageUpload(data.image[0]);
      }

      const updatedIssue = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        image: imageURL,
      };

      const res = await axiosInstance.patch(
        `/issues/${issue._id}`,
        updatedIssue
      );

      if (res.data) {
        toast.success("Issue updated successfully");
        refetch();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update issue");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-dark p-6 rounded-xl w-full max-w-lg border border-slate-800 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-slate-100">Edit Issue</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Image Upload Section */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-full h-40 aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Issue"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-slate-500 text-sm">No Image</span>
                )}
              </div>

              <label
                htmlFor="issue-photo"
                className="absolute bottom-2 right-2 bg-primary p-2 rounded-full cursor-pointer hover:bg-primary/90 transition"
              >
                <MdOutlineFileUpload className="text-white" />
              </label>

              <input
                id="issue-photo"
                type="file"
                className="hidden"
                accept="image/*"
                {...register("image", { onChange: handlePhoto })}
              />
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="text-slate-400 text-sm block mb-2">
              <MdTitle className="inline mr-2" /> Issue Title
            </label>
            <input
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category & Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-slate-400 text-sm block mb-2">
                <BiCategory className="inline mr-2" /> Category
              </label>
              <select
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                {...register("category", { required: true })}
              >
                <option value="infrastructure">Infrastructure</option>
                <option value="sanitation">Sanitation</option>
                <option value="electricity">Electricity</option>
                <option value="water">Water Supply</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 text-sm block mb-2">
                <FaMapMarkerAlt className="inline mr-2" /> Location
              </label>
              <input
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                {...register("location", { required: "Location is required" })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="text-slate-400 text-sm block mb-2">
              <MdDescription className="inline mr-2" /> Description
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
              {...register("description", {
                required: "Description is required",
              })}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-700 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary py-3 rounded-lg text-white hover:bg-primary/90 transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIssueModal;
