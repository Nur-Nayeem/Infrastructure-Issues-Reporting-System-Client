import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPhone, FaUserTie } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { MdOutlineFileUpload } from "react-icons/md";
import { imageUpload } from "../../../lib";

const EditStaffModal = ({
  showEditModal,
  setShowEditModal,
  handleEditStaff,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showEditModal) {
      setValue("name", showEditModal.displayName);
      setValue("phone", showEditModal.phone);
      setPreview(showEditModal.photoURL);
    }
  }, [showEditModal, setValue]);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageURL = showEditModal.photoURL;

      if (data.image?.[0]) {
        imageURL = await imageUpload(data.image[0]);
      }

      await handleEditStaff({
        email: showEditModal.email,
        displayName: data.name,
        phone: data.phone || showEditModal.phone,
        photoURL: imageURL,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-surface-dark p-6 rounded-xl w-full max-w-lg border border-slate-800">
        <h3 className="text-xl font-semibold text-slate-100 mb-6">
          Edit Staff Member
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <GoPerson className="text-4xl text-slate-500" />
                )}
              </div>

              <label
                htmlFor="staff-photo"
                className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer"
              >
                <MdOutlineFileUpload className="text-white" />
              </label>

              <input
                id="staff-photo"
                type="file"
                className="hidden"
                accept="image/*"
                {...register("image", { onChange: handlePhoto })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-slate-400 text-sm">
              <FaUserTie className="inline mr-2" /> Full Name
            </label>
            <input
              className="w-full mt-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              {...register("name", { required: "Name required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="text-slate-400 text-sm">
              <FaPhone className="inline mr-2" /> Phone
            </label>
            <input
              className="w-full mt-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              {...register("phone")}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowEditModal(null)}
              className="flex-1 border border-slate-700 py-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary py-3 rounded-lg text-white"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStaffModal;
