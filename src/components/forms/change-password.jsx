import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ChangePassword({ user }) {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit = async (data) => {
        console.log(data);
    };

    const [loading, setLoading] = useState(false);
    const passwordValue = watch("password");

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center p-6 border shadow-md hover:shadow-lg transition-all duration-300 rounded-3xl space-y-3">
            <h2 className="text-xl font-bold mb-8">Change Password</h2>
            <Label>New Password</Label>
            <Input
                type="password"
                placeholder="New password"
                {...register("password", {
                    required: "Required",
                    minLength: { value: 8, message: "Min 8 characters" }
                })}
                className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-sm -mt-3 ml-1">{errors.password.message}</p>}

            <Label>Confirm New Password</Label>
            <Input
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                    required: "Required",
                    validate: value => value === passwordValue || "Not match"
                })}
                className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm -mt-3 ml-1">{errors.confirmPassword.message}</p>}

            <Button type="submit"
                className="self-start px-8 mt-4 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold transition-all"
                disabled={loading}
            >
                {loading ? "Updating..." : "Update"}
            </Button>
        </form>
    );
}
