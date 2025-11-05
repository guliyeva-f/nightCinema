import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { EditableTagsInput } from "./tagInput";
import DatePickerWithIconDemo from "./shadcn-studio/date-picker/date-picker-03";
import SwitchPermanentIndicatorDemo from "./shadcn-studio/switch/switch-13";
import TimePickerWithIconDemo from "./shadcn-studio/date-picker/date-picker-09";
import { Controller, useForm } from "react-hook-form";

export default function AddMovieForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      director: "",
      description: "",
      coverPhotoUrl: "",
      trailerUrl: "",
      backgroundImgUrl: "",
      genres: [],
      actors: [],
      starMovie: false,
      releaseDate: "",
      movieDuration: "",
    },
  });

  const onSubmit = (data) => {
    if (!data.genres.length) {
      alert("Please add at least one genre.");
      return;
    }
    if (!data.actors.length) {
      alert("Please add at least one actor.");
      return;
    }

    const payload = {
      ...data,
      name: data.name.trim(),
      director: data.director.trim(),
      description: data.description.trim(),
      coverPhotoUrl: data.coverPhotoUrl.trim(),
      trailerUrl: data.trailerUrl.trim(),
      backgroundImgUrl: data.backgroundImgUrl.trim(),
    };

    console.log("Payload ready for backend:", payload);
    alert("Movie added successfully!");
  };

  const urlPattern = /^https?:\/\/.+$/;
  const isStarMovie = watch("starMovie");

  return (
    <div className="p-5 lg:pt-20">
      <form onSubmit={handleSubmit(onSubmit)}
        className="lg:flex lg:w-full lg:flex-col lg:items-center lg:justify-center">
        <div className="grid grid-cols-1 gap-10 lg:w-[95%]">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">

              {/* filmin adi */}
              <div className="col-span-full lg:col-span-3">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground dark:text-foreground">
                  Movie Name
                </Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  name="name"
                  className="mt-2"
                  placeholder="Iron Man"
                />
                {errors.name && (
                  <p className="text-red-400 ml-2 text-[12px]">{errors.name.message}</p>
                )}
              </div>

              {/* filmin rejissoru */}
              <div className="col-span-full lg:col-span-3">
                <Label
                  htmlFor="director"
                  className="text-sm font-medium text-foreground dark:text-foreground">
                  Director
                </Label>
                <Input
                  id="director"
                  {...register("director", { required: "Director is required" })}
                  type="text"
                  name="director"
                  className="mt-2"
                  placeholder="Jon Favreau"
                />
                {errors.director && (
                  <p className="text-red-400 ml-2 text-[12px]">{errors.director.message}</p>
                )}
              </div>

              {/* filmin haqinda */}
              <div className="col-span-full">
                <Label
                  htmlFor="description" className="text-sm font-medium text-foreground dark:text-foreground">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  className="mt-2"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4} />
                {errors.description && (
                  <p className="text-red-400 ml-2 text-[12px]">{errors.description.message}</p>
                )}
              </div>

              {/* filmin janri */}
              <div className="col-span-full lg:col-span-3">
                <Controller
                  control={control}
                  name="genres"
                  rules={{
                    validate: (value) => value.length > 0 || "Please add at least one genre"
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <EditableTagsInput
                        label="Genres"
                        placeholder="Add genre.."
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (
                        <p className="text-red-400 ml-2 text-[12px]">{fieldState.error.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* filmin oyunculari */}
              <div className="col-span-full lg:col-span-3">
                <Controller
                  control={control}
                  name="actors"
                  rules={{
                    validate: (value) => value.length > 0 || "Please add at least one actor"
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <EditableTagsInput
                        label="Actors"
                        placeholder="Add actor.."
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (
                        <p className="text-red-400 ml-2 text-[12px]">{fieldState.error.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* filmin sekli */}
              <div className="col-span-full lg:col-span-3">
                <Label
                  htmlFor="coverPhotoUrl"
                  className="text-sm font-medium text-foreground dark:text-foreground">
                  Cover Photo Url
                </Label>
                <Input
                  type="text"
                  name="coverPhotoUrl"
                  id="coverPhotoUrl"
                  {...register("coverPhotoUrl", {
                    required: "Cover photo URL is required",
                    pattern: { value: urlPattern, message: "Invalid URL" },
                  })}
                  placeholder="https://example.com/photo.jpg"
                  className="mt-2"
                />
                {errors.coverPhotoUrl && (
                  <p className="text-red-400 ml-2 text-[12px]">
                    {errors.coverPhotoUrl.message}
                  </p>
                )}
              </div>

              {/* filmin treyleri */}
              <div className="col-span-full lg:col-span-3">
                <Label
                  htmlFor="trailerUrl"
                  className="text-sm font-medium text-foreground dark:text-foreground">
                  Trailer Video Url
                </Label>
                <Input
                  type="text"
                  id="trailerUrl"
                  name="trailerUrl"
                  {...register("trailerUrl", {
                    required: "Trailer URL is required",
                    pattern: { value: urlPattern, message: "Invalid URL" },
                  })}
                  placeholder="https://youtube.com/..."
                  className="mt-2" />
                {errors.trailerUrl && (
                  <p className="text-red-400 ml-2 text-[12px]">{errors.trailerUrl.message}</p>
                )}
              </div>
              <div className="col-span-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="col-span-full lg:col-span-4 grid grid-cols-4 gap-2 lg:mb-0 mb-4">

                    {/* filmin cixma tarixi */}
                    <div className="col-span-2">
                      <Label
                        htmlFor="releaseDate"
                        className="text-sm font-medium text-foreground dark:text-foreground">
                        Date
                      </Label>
                      <Controller
                        control={control}
                        name="releaseDate"
                        id="releaseDate"
                        rules={{ required: "Release date is required" }}
                        render={({ field, fieldState }) => (
                          <>
                            <DatePickerWithIconDemo
                              value={field.value}
                              onChange={field.onChange}
                            />
                            {fieldState.error && (
                              <p className="text-red-400 ml-2 text-[12px]">{fieldState.error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>

                    {/* filmin muddeti */}
                    <div className="col-span-2">
                      <Label
                        htmlFor="movieDuration"
                        className="text-sm font-medium text-foreground dark:text-foreground">
                        Duration
                      </Label>
                      <Controller
                        control={control}
                        name="movieDuration"
                        id="movieDuration"
                        rules={{ required: "Duration is required" }}
                        render={({ field, fieldState }) => (
                          <>
                            <TimePickerWithIconDemo value={field.value}
                              onChange={field.onChange}
                            />
                            {fieldState.error && (
                              <p className="text-red-400 ml-2 text-[12px]">{fieldState.error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-span-full lg:col-span-8 grid grid-cols-8 gap-2">

                    {/* star moviedirmi */}
                    <div className="flex flex-col items-center col-span-2">
                      <Label
                        htmlFor="starMovie"
                        className="text-sm font-medium text-foreground dark:text-foreground">
                        Is Star Movie?
                      </Label>
                      <Controller
                        control={control}
                        name="starMovie"
                        id="starMovie"
                        defaultValue={false}
                        render={({ field }) => (
                          <SwitchPermanentIndicatorDemo
                            checked={field.value ?? false}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    {/* star movie shekli */}
                    <div className="col-span-6">
                      <Label
                        htmlFor="backgroundImgUrl"
                        className="text-sm font-medium text-foreground dark:text-foreground">
                        Background Image Url
                      </Label>
                      <Input
                        type="text"
                        id="backgroundImgUrl"
                        name="backgroundImgUrl"
                        disabled={!isStarMovie}
                        placeholder="https://example.com/photo.jpg"
                        className={`mt-2 ${!isStarMovie ? "opacity-50 cursor-not-allowed" : ""}`}
                        {...register("backgroundImgUrl", {
                          required: isStarMovie ? "Background image URL is required" : false, 
                          pattern: {
                            value: /^https?:\/\/.+$/,
                            message: "Invalid URL",
                          },
                        })}
                      />
                      {errors.backgroundImgUrl && (
                        <p className="text-red-400 ml-2 text-[12px]">{errors.backgroundImgUrl.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-5" />
        <div className="flex items-center justify-end space-x-4">
          {/* <Button type="button" variant="outline" className="whitespace-nowrap">
            Go back
          </Button> */}
          <Button type="submit" className="whitespace-nowrap">
            Add Movie
          </Button>
        </div>
      </form >
    </div >
  );
}