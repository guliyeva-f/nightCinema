import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { $axios } from "@/api/accessor";
import { $api } from "@/api/api";
import { API } from "@/api/endpoints";

export default function ProtectedAdminRoute({ children }) {
    const [allowed, setAllowed] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("Admin kimi daxil ol!");
            setAllowed(false);
            setChecking(false);
            return;
        }
        toast.promise(
            $axios.get($api(API["user-check"])),
            {
                loading: "İcazəniz yoxlanılır..",
                success: (res) => {
                    if (res?.data?.data === "ADMIN") {
                        setAllowed(true);
                        setChecking(false);
                        return "Admin Panelə daxil oldun!";
                    } else {
                        setAllowed(false);
                        setChecking(false);
                        toast("Admin deyilsiniz!", { icon: "⚠️" });
                        return "";
                    }
                },
                error: (err) => {
                    setAllowed(false);
                    setChecking(false);
                    const status = err?.response?.status;
            
                    if (status === 500) {
                        toast.error("Serverdə problem var..");
                    }
                    else if (status === 503) {
                        toast.error("Server hazırda bağlıdır..");
                    }
                    else if (!err.response) {
                        toast.error("Şəbəkə xətası..");
                    }
                    else {
                        toast.error("Naməlum xəta baş verdi..");
                    }
                    return "";
                },
            }
        );
    }, []);

    if (allowed === false) return <Navigate to="/" replace />;

    return (
        <>
            {children}
            {checking && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-99"></div>
            )}
        </>
    );
}