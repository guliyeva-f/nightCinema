import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-700/20 via-black to-blue-700/20 animate-pulse"></div>
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/40 rounded-full blur-[120px] animate-blob" />
            <div className="absolute top-40 -right-20 w-72 h-72 bg-blue-600/40 rounded-full blur-[120px] animate-blob animation-delay-2000" />
            <div className="absolute bottom-20 left-1/5 w-72 h-72 bg-pink-600/40 rounded-full blur-[120px] animate-blob animation-delay-4000" />
            <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 px-12 py-10 rounded-2xl shadow-2xl flex flex-col items-center text-center transition-all">
                <h1 className="text-8xl font-extrabold bg-linear-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(100,100,255,0.5)]">
                    404
                </h1>
                <p className="mt-4 text-gray-300 text-lg tracking-wide">
                    Oops... The page you're looking for doesn’t exist.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-8 cursor-pointer px-6 py-3 rounded-xl font-medium bg-white/10 hover:bg-white/20 border border-white/20 transition-all backdrop-blur-md"
                >Go Back Home
                </button>
            </div>
        </div>
    );
}