import React from "react";
import { FaCamera, FaTrash, FaUpload } from "react-icons/fa";

const ImageComponent = ({ image, handleImageUpload, setImage }) => {
  return (
    <div className="space-y-3">
      <label className="text-sm text-slate-300 block">
        Attach Image (Optional)
      </label>

      <div className="border border-slate-700 rounded-xl p-5 bg-background-dark/60 text-center hover:border-slate-600 transition">
        {image ? (
          <div className="relative mb-3">
            <img
              src={image}
              alt="Preview"
              className="rounded-lg mx-auto h-48 object-cover"
            />
          </div>
        ) : (
          <div className="h-40 flex flex-col justify-center items-center">
            <FaCamera className="text-slate-500 text-4xl mb-3" />
            <p className="text-slate-400">Click to upload image</p>
            <p className="text-slate-500 text-xs">PNG, JPG up to 5MB</p>
          </div>
        )}

        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        <label
          htmlFor="image-upload"
          className="mt-3 inline-block px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
        >
          <FaUpload className="inline mr-2" /> Choose
        </label>

        {image && (
          <button
            type="button"
            onClick={() => setImage(null)}
            className="ml-2 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg"
          >
            <FaTrash className="inline mr-2" /> Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageComponent;
