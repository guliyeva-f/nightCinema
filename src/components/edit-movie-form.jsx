import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { EditableTagsInput } from "./tagInput";
import SwitchPermanentIndicatorDemo from "./shadcn-studio/switch/switch-13";
import TimePickerWithIconDemo from "./shadcn-studio/date-picker/time-picker";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import $axios from "@/api/accessor";
import { $api } from "@/api/api";
import { API } from "@/api/endpoints";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "./ui/multi-select";
import { GENRES } from "@/const/genres";
import toast from "react-hot-toast";
import { Calendar22 } from "./shadcn-studio/date-picker/date-picker";

export default function EditMovieForm({ movieData, onSuccess }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, control, formState: { errors }, watch, reset } = useForm({
        defaultValues: movieData || {},
    });

    useEffect(() => {
        if (movieData) {
            const formatted = {
                ...movieData,
                genres: Array.isArray(movieData.genre)
                    ? movieData.genre.map((g) => g.toLowerCase()) : [],
                actors: movieData.actors || [],
            };
            reset(formatted);
        }
    }, [movieData, reset]);

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const formData = new FormData();

            formData.append("name", data.name.trim());
            formData.append("description", data.description.trim());
            formData.append("movieDuration", data.movieDuration);
            formData.append("director", data.director.trim());
            formData.append("releaseDate", data.releaseDate);
            formData.append("trailerUrl", data.trailerUrl.trim());
            formData.append("starMovie", data.starMovie ? "true" : "false");

            data.genres.forEach(g => formData.append("genre", g.toUpperCase()));
            data.actors.forEach(a => formData.append("actors", a.trim()));

            if (data.coverPhoto instanceof File) {
                formData.append("coverPhoto", data.coverPhoto);
            }

            // if (data.starMovie && data.background instanceof File) {
            //     formData.append("background", data.background);
            // }
            if (data.starMovie && data.background instanceof File) {
                formData.append("background", data.background);
            } else {
                formData.append("background", null);
            }

            const res = await $axios.put($api(`${API["update-movie"]}?movieId=${movieData.id}`), formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.data.success) {
                toast.success("Movie updated successfully");
                if (typeof onSuccess === "function") onSuccess();
            } else {
                toast.error("Failed to update movie");
            }
        } catch (error) {
            console.error("Error updating movie:", error);
            toast.error("An error occurred while updating the movie");
        } finally {
            setIsSubmitting(false);
        }
    };

    const urlPattern = /^https?:\/\/.+$/;
    const isStarMovie = watch("starMovie");

    return (
        <div className="p-[40px_20px] container m-auto">
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
                                        validate: (value) => value?.length > 0 || "Please select at least one genre",
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Label
                                                htmlFor="genres"
                                                className="text-sm font-medium text-foreground dark:text-foreground"
                                            >
                                                Genres
                                            </Label>
                                            <MultiSelect
                                                values={field.value ?? []}
                                                onValuesChange={(val) => field.onChange(val)}
                                            >
                                                <MultiSelectTrigger className="w-full mt-2">
                                                    <MultiSelectValue placeholder="Select genres.." />
                                                </MultiSelectTrigger>
                                                <MultiSelectContent search={{ placeholder: "Search genre.." }}>
                                                    <MultiSelectGroup>
                                                        {Object.entries(GENRES).map(([key, label]) => (
                                                            <MultiSelectItem key={key} value={key.toLowerCase()}>
                                                                {label}
                                                            </MultiSelectItem>
                                                        ))}
                                                    </MultiSelectGroup>
                                                </MultiSelectContent>
                                            </MultiSelect>

                                            {fieldState.error && (
                                                <p className="text-red-400 ml-2 text-[12px]">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                            {/* filmin oyunculari */}
                            <div className="col-span-full lg:col-span-3">
                                <Controller
                                    control={control}
                                    defaultValue={[]}
                                    name="actors"
                                    rules={{
                                        validate: (value) => value.length > 0 || "Please add at least one actor",
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Label
                                                htmlFor="actors"
                                                className="text-sm font-medium text-foreground dark:text-foreground"
                                            >
                                                Actors
                                            </Label>

                                            <div className="mt-2">
                                                <EditableTagsInput
                                                    placeholder="Add actor.."
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </div>
                                            {fieldState.error && (
                                                <p className="text-red-400 ml-2 text-[12px]">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                            {/* filmin sekli */}
                            <div className="col-span-full lg:col-span-3">
                                <Controller
                                    name="coverPhoto"
                                    control={control}
                                    rules={{
                                        validate: {
                                            isImage: file => !file || file.type.startsWith("image/") || "Only image files allowed",
                                            extensionCheck: file => {
                                                if (!file) return true;
                                                const forbiddenExtensions = [".exe", ".dll", ".bat", ".cmd", ".sh", ".js", ".msi", ".apk", ".zip", ".rar", ".7z", ".iso"];
                                                return !forbiddenExtensions.some(ext => file.name.toLowerCase().endsWith(ext)) || "This file type is not allowed";
                                            },
                                            sizeCheck: file => !file || file.size <= 5 * 1024 * 1024 || "Max file size is 5MB"
                                        }
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Label className="text-sm font-medium text-foreground dark:text-foreground">Cover Photo</Label>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => field.onChange(e.target.files[0])}
                                                className={`${fieldState.error ? "border-red-500" : ""} mt-2`}
                                            />
                                            {fieldState.error && (
                                                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                            )}
                                        </>
                                    )}
                                />
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
                                                        <Calendar22 value={field.value} onChange={field.onChange} />
                                                        {fieldState.error && (
                                                            <p className="text-red-400 ml-2 text-[12px]">
                                                                {fieldState.error.message}
                                                            </p>
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
                                            <Controller
                                                name="background"
                                                control={control}
                                                rules={{
                                                    validate: {
                                                        isImage: file => !isStarMovie || !file || file.type.startsWith("image/") || "Only image files allowed",
                                                        extensionCheck: file => {
                                                            if (!isStarMovie || !file) return true;
                                                            const forbiddenExtensions = [".exe", ".dll", ".bat", ".cmd", ".sh", ".js", ".msi", ".apk", ".zip", ".rar", ".7z", ".iso"];
                                                            return !forbiddenExtensions.some(ext => file.name.toLowerCase().endsWith(ext)) || "This file type is not allowed";
                                                        },
                                                        sizeCheck: file => !isStarMovie || !file || file.size <= 5 * 1024 * 1024 || "Max file size is 5MB"
                                                    }
                                                }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <Label>Background Image</Label>
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            disabled={!isStarMovie}
                                                            onChange={(e) => field.onChange(e.target.files[0])}
                                                            className={`${!isStarMovie ? "opacity-50 cursor-not-allowed" : ""} ${fieldState.error ? "border-red-500" : ""} mt-2`}
                                                        />
                                                        {fieldState.error && (
                                                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator className="my-5" />
                <div className="flex items-center justify-end space-x-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Editing.." : "Edit Movie"}
                    </Button>
                </div>
            </form >
        </div >
    );
}