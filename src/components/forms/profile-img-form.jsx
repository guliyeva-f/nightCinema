import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import $axios from "@/api/accessor";
import { $api } from "@/api/api";
import { API } from "@/api/endpoints";

export default function ProfileImageForm({ defaultUrl }) {
  const { refetchUser } = useOutletContext();
  const {register, handleSubmit, watch, setError, clearErrors, formState: { errors }} = useForm();
  const [preview, setPreview] = useState(defaultUrl || "");
  const [loading, setLoading] = useState(false);
  const forbiddenExtensions = [
    ".exe", ".dll", ".bat", ".cmd", ".sh", ".js",
    ".msi", ".apk", ".zip", ".rar", ".7z", ".iso"
  ];

  const watchedFile = watch("imageFile")?.[0];
  useEffect(() => {
    if (!watchedFile) {
      setPreview("");
      return;
    }

    const fileName = watchedFile.name.toLowerCase();
    const isValid =
      watchedFile.type.startsWith("image/") &&
      watchedFile.size <= 5 * 1024 * 1024 &&
      !forbiddenExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      setError("imageFile", { message: "Invalid file type or size" });
      setPreview("");
      return;
    } else {
      clearErrors("imageFile");
      const objectUrl = URL.createObjectURL(watchedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [watchedFile, setError, clearErrors]);

  const onSubmit = async (data) => {
    const file = data.imageFile?.[0];
    if (!file) return;
    const fileName = file.name.toLowerCase();
    const isValid =
      file.type.startsWith("image/") &&
      file.size <= 5 * 1024 * 1024 &&
      !forbiddenExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      setError("imageFile", { message: "Invalid file type or size" });
      setPreview("");
      return;
    }
    const formData = new FormData();
    formData.append("photo", file);
    setLoading(true);

    try {
      const res = await $axios.put(
        $api(API["update-profile-photo"]),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      if (res.data.success) {
        toast.success("Profile photo updated!");
        await refetchUser();
      } else {
        toast.error(res.data.errorMessage || "Upload failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.errorMessage || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center h-full p-6 border shadow-md hover:shadow-lg transition-all duration-300 rounded-3xl space-y-4"
    ><h2 className="text-xl font-bold mb-8">Profile Image</h2>
      <div className="flex justify-between items-center gap-2">
        <div className="w-full">
          <Label className="text-sm font-medium mb-1.5 text-foreground">
            Upload Image
          </Label>
          <Input
            type="file"
            accept="image/*"
            {...register("imageFile", {
              validate: {
                required: v =>
                  v?.length > 0 || "Image is required",
                isImage: v => {
                  const file = v?.[0];
                  if (!file) return true;
                  return file.type.startsWith("image/") || "Only image files allowed";
                },
                extensionCheck: v => {
                  const file = v?.[0];
                  if (!file) return true;
                  const fileName = file.name.toLowerCase();
                  return !forbiddenExtensions.some(ext => fileName.endsWith(ext)) || "This file type is not allowed";
                },
                sizeCheck: v => {
                  const file = v?.[0];
                  if (!file) return true;
                  return file.size <= 5 * 1024 * 1024 || "Max file size is 5MB";
                }
              }
            })}
            className={`${errors.imageFile ? "border-red-500" : ""} mt-2`}
          />{errors.imageFile && (
            <p className="text-red-500 text-sm ml-1">{errors.imageFile.message}</p>
          )}
        </div>
        <div className="w-20 h-20 border border-white/30 rounded-full shrink-0 overflow-hidden bg-black/20 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white/40 text-xs">no image</span>
          )}
        </div>
      </div>
      <Button type="submit"
        disabled={loading}
        className="self-start px-8 mt-4 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold transition-all"
      >{loading ? "Updating.." : "Update"}
      </Button>
    </form>
  );
}