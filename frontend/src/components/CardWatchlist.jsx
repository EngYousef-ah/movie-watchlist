import { Eye, EyeOff, Star, Stars, Trash2 } from "lucide-react";
import { useState } from "react";
import { updateMovieRating } from "../services/api";

export default function CardWatchlist({ movie, onRemove, onWatched, status }) {
    const [rating, setRating] = useState(movie?.rating || 1);


    return (
        <div className="group flex flex-col sm:flex-row items-center gap-6 rounded-xl p-4 bg-white/5 border border-white/10 hover:border-[#f0503d] /50 hover:bg-white/10 transition-all duration-300 shadow-xl">

            <div className="relative overflow-hidden rounded-lg w-32 h-44 sm:w-28 sm:h-40 shrink-0 shadow-2xl">
                <img
                    src={movie?.posterUrl}
                    alt={movie?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="flex flex-col flex-1 w-full text-center sm:text-left gap-3">

                <div className="space-y-3 ">

                    <h3 className="font-heading text-2xl tracking-wide text-white group-hover:text-[#f0503d] transition-colors">
                        {movie?.title}
                    </h3>
                    <p className="text-gray-300 text-sm font-medium">
                        {movie?.overView}
                    </p>

                    <p className="text-gray-400 text-sm font-medium">
                        {movie?.year} <span className="mx-1 text-[#f0503d]">|</span> {movie?.director}
                    </p>
                    {status &&
                        <div className=" inline-flex items-center gap-1.5 px-3 py-1 bg-black/30 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    size={18}
                                    onClick={async () => {
                                        const newRate = index + 1;
                                        setRating(newRate);
                                        await updateMovieRating(movie._id, newRate);

                                    }}
                                    className={
                                        index < rating
                                            ? "fill-yellow-400 text-yellow-400 cursor-pointer"
                                            : "text-gray-300 cursor-pointer"
                                    }
                                />
                            ))}
                        </div>
                    }
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-3 mt-auto">
                    <button onClick={onWatched} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f0503d] text-gray-50 font-bold text-sm hover:text-gray-300 transition-all active:scale-95">
                        {status ? <Eye size={18} /> : <EyeOff size={18} />}
                        {status ? "Watched" : "UnWatched"}
                    </button>

                    <button onClick={onRemove} className="group/btn flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 text-sm hover:border-red-500 hover:text-red-500 transition-all active:scale-95">
                        <Trash2 size={18} />
                        <span >Remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
}