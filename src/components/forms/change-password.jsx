import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import $axios from "@/api/accessor";
import { $api } from "@/api/api";
import { API } from "@/api/endpoints";

export default function ChangePassword({ user }) {
    const { refetchUser } = useOutletContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            oldPassword: "",
            newPassword: ""
        }
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const payload = {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            };

            const res = await $axios.put(
                $api(API["update-password"]),
                payload
            );

            if (res.data.success) {
                toast.success("Password updated successfully!");
                await refetchUser();
                reset();
            } else {
                toast.error(res.data.errorMessage || "Failed to update password");
            }
        } catch (error) {
            toast.error(error?.response?.data?.errorMessage || "Server error");
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center p-6 border shadow-md hover:shadow-lg transition-all duration-300 rounded-3xl space-y-3">
            <h2 className="text-xl font-bold mb-8">Change Password</h2>
            <Label>Old Password</Label>
            <Input
                type="password"
                placeholder="Old password"
                {...register("oldPassword", { required: "Required" })}
                className={errors.oldPassword ? "border-red-500" : ""}
            />
            {errors.oldPassword && <p className="text-red-500 text-sm -mt-3">{errors.oldPassword.message}</p>}

            <Label>New Password</Label>
            <Input
                type="password"
                placeholder="New password"
                {...register("newPassword", {
                    required: "Required",
                    minLength: { value: 8, message: "Min 8 characters" }
                })}
                className={errors.newPassword ? "border-red-500" : ""}
            />
            {errors.newPassword && <p className="text-red-500 text-sm -mt-3">{errors.newPassword.message}</p>}
            <Button type="submit"
                className="self-start px-8 mt-4 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold transition-all"
                disabled={loading}
            >
                {loading ? "Updating.." : "Update"}
            </Button>
        </form>
    );
}
