import { useForm, Controller } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "react-international-phone";
import toast from "react-hot-toast";
import { useState } from "react";
import { $axios } from "@/api/accessor";
import { API } from "@/api/endpoints";
import { $api } from "@/api/api";
import { useOutletContext } from "react-router-dom";

export default function AccountInfoForm() {
    const { user, refetchUser } = useOutletContext();

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            username: user?.username || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
        }
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const payload = {
                username: data.username,
                email: data.email,
                phoneNumber: data.phoneNumber
            };

            const res = await $axios.put(
                $api(API["update-infos"]),
                payload
            );
            console.log(res);

            if (res.data.success) {
                toast.success("Updated successfully");
                await refetchUser();
            } else {
                toast.error("Failed to update");
            }
        } catch (error) {
            toast.error("Server error");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full p-6 border shadow-md hover:shadow-lg transition-all duration-300 rounded-3xl"
            style={{ fontFamily: "Outfit, sans-serif" }}
        >
            <FieldGroup className="gap-4">
                <h2 className="text-xl font-bold">Account Info</h2>

                <Field>
                    <FieldLabel>Username</FieldLabel>
                    <Input
                        {...register("username", {
                            required: "Required",
                            minLength: { value: 3, message: "Min 3 characters" }
                        })}
                        placeholder="Your username"
                        className={errors.username ? "border-red-500" : ""}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm -mt-3 ml-1">
                            {errors.username.message}
                        </p>
                    )}
                </Field>

                <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                        {...register("email", {
                            required: "Required",
                            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" }
                        })}
                        placeholder="example@mail.com"
                        className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm -mt-3 ml-1">
                            {errors.email.message}
                        </p>
                    )}
                </Field>

                <Field>
                    <FieldLabel>Phone Number</FieldLabel>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{
                            required: "Required",
                            validate: value =>
                                value.length === 13 || "Must be 13 characters"
                        }}
                        render={({ field }) => (
                            <PhoneInput
                                {...field}
                                defaultCountry="az"
                                forceDialCode={true}
                                inputStyle={{
                                    backgroundColor: "#141414",
                                    color: "#fafafa",
                                    border: errors.phoneNumber
                                        ? "1px solid red"
                                        : "1px solid #383838",
                                    borderRadius: "0.5rem",
                                    padding: "0.25rem 0.75rem",
                                    height: "2.25rem",
                                    width: "90%",
                                    fontSize: "14px",
                                    outline: "none",
                                    transition: "border 0.3s",
                                }}
                            />
                        )}
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-500 text-sm -mt-3 ml-1">
                            {errors.phoneNumber.message}
                        </p>
                    )}
                </Field>

                <Button type="submit" disabled={loading}
                    className="self-start px-8 mt-3 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold transition-all"
                >  {loading ? "Updating.." : "Update"}
                </Button>
            </FieldGroup>
        </form>
    );
}
