import { toast } from "sonner";

export const uploadImageToCloudinary = async (file: any) => {
  if (!file) {
    toast.error("File not found.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  console.log(data);
  if (!data) {
    toast.error("Failed to upload image");
  }
  // console.log(data);
  return data?.secure_url;
};
