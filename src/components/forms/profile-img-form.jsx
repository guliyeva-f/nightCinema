import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ProfileImageForm({ defaultUrl }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      imageUrl: defaultUrl || "",
    }
  });

  const onSubmit = (data) => {
    console.log("Profile Image URL:", data.imageUrl);
  };

  const watchedUrl = watch("imageUrl");

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center h-full p-6 border shadow-md hover:shadow-lg transition-all duration-300 rounded-3xl space-y-4">
      <h2 className="text-xl font-bold mb-8">Profile Image</h2>

      <div className="flex justify-between items-center gap-2">
        <div className="w-full">
          <Label htmlFor="profileImg" className="text-sm font-medium mb-1.5 text-foreground">
            Image URL
          </Label>
          <Input
            id="profileImg"
            type="text"
            placeholder="https://example.com/image.jpg"
            {...register("imageUrl", {
              required: "Required",
              pattern: {
                value: /^https?:\/\/\S+$/i,
                message: "Invalid URL"
              }
            })}
            className={errors.imageUrl ? "border-red-500 mt-2" : "mt-2"}
          />
          {errors.imageUrl && <p className="text-red-500 text-sm ml-1">{errors.imageUrl.message}</p>}
        </div>

        <div className="w-20 h-20 border border-white/30 rounded-full shrink-0 overflow-hidden bg-black/20 flex items-center justify-center">
          {watchedUrl ? (
            <img
              src={watchedUrl}
              alt="preview"
              className="w-full h-full object-cover"
              onError={(e) => e.currentTarget.src = ""}
            />
          ) : (
            <span className="text-white/40">none</span>
          )}
        </div>
      </div>

      <Button type="submit"
        className="self-start px-8 mt-4 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold transition-all"
      >Update
      </Button>
    </form>
  );
}
