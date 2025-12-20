import axios from "axios";

export const imageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const imageApiUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Image_Host
    }`;
    const { data } = await axios.post(imageApiUrl, formData);
    return data?.data?.display_url;
  } catch (err) {
    console.log(err);
  }
};

export const handleBoostIssue = async (issueId, currentUser) => {
  const res = await axios.post(
    "http://localhost:5000/payment-checkout-session",
    {
      issueId,
      userId: currentUser?._id,
    }
  );
  const data = res.data;

  if (data.url) {
    window.location.href = data.url;
  }
};
