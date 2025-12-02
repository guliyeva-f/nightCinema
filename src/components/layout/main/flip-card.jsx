import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FlipCard({ movie, className = "" }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div onClick={() => setFlipped(!flipped)}
            className={`relative w-[400px] aspect-2/3 perspective-[1400px] group ${className} sm:w-[calc((100%-1.5rem*(2-1))/2)] md:w-[calc((100%-1.5rem*(3-1))/3)] lg:w-[calc((100%-1.5rem*(4-1))/4)] xl:w-[calc((100%-1.5rem*(5-1))/5)]`}>
            <div className={`relative w-full h-full transition-transform duration-1300 ease-[cubic-bezier(0.3,0.2,0.2,1)] transform-3d group-hover:transform-[rotateY(180deg)]
             ${flipped ? "rotate-y-180" : ""}  `}>
                <div className="absolute pointer-events-none group-hover:pointer-events-none inset-0 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black text-white backface-hidden">
                    <img src={movie.coverPhotoUrl} className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-1500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute bottom-5 left-0 right-0 text-center z-10">
                        <h3 className="text-[1.5rem] font-extrabold tracking-wide drop-shadow-lg">
                            {movie.name}
                        </h3>
                        <p>{movie.genres?.join(", ")}</p>
                        {movie.starMovie && (
                            <span className="mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/15 text-yellow-300 border border-yellow-400/30 backdrop-blur-sm">
                                ⭐ Featured Movie ⭐
                            </span>
                        )}
                    </div>
                </div>
                <div className="absolute p-[30px_20px] pointer-events-auto inset-0 flex gap-2 flex-col items-center justify-between bg-linear-to-br from-[#150020] via-[#170034] to-[#40006a] text-white rounded-2xl text-center shadow-[0_0_25px_rgba(255,255,255,0.2)] transform-[rotateY(180deg)] backface-hidden">
                    <div className="flex flex-col gap-2.5">
                        <h3 className="text-2xl font-bold tracking-wide">
                            {movie.name}
                        </h3>
                        <p className="text-sm  line-clamp-5">
                            {movie.description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <p>🎬 {movie.director}</p>
                        <p>⏱ {movie.movieDuration}</p>
                    </div>
                    <Link to={`/movie/${movie.id}`} className="cursor-pointer px-5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] text-sm"
                    >View Details 🔍</Link>
                </div>
            </div>
        </div>
    );
}
export function MovieCard({ movies = [] }) {
    return (
        <div className="bg-transparent relative z-10 container flex flex-wrap justify-start items-start gap-6 px-10 sm:px-5 md:px-4 lg:px-2">
            {movies.map((movie) => (
                <FlipCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}