import { Star } from "lucide-react";

export default function CardMovie({ movie, onAdd, isInWatchlist }) {

    return (
        <div className="group relative w-full h-[400px] mt-10 overflow-hidden rounded-2xl cursor-pointer shadow-2xl bg-gray-900 transition-all duration-500 hover:shadow-red-900/20">
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                <Star size={14} fill="#feea16" color="#feea16" />
                <span className="text-white text-sm font-bold">{movie.rating}/5</span>
            </div>

            <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:blur-[2px]" />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-6 opacity-0 translate-y-4 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">

                <div className="mb-2">
                    <h3 className="text-white text-2xl font-bold tracking-tight leading-tight mb-1">
                        {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <span>{movie.year}</span>
                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                        <span className="italic font-light">Dir: {movie.director}</span>
                    </div>

                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {movie.genre && movie.genre.map((item, index) => (
                        <span key={index} className="text-[10px] uppercase font-bold tracking-widest bg-white/10 text-gray-200 px-2 py-0.5 rounded border border-white/5 backdrop-blur-sm">
                            {item}
                        </span>
                    ))}
                </div>

           


                <button onClick={!isInWatchlist ? onAdd : null} disabled={isInWatchlist}
                    className={`w-full mt-5 py-2.5 text-sm font-bold text-white rounded-lg transition-all duration-300 shadow-lg 
                    ${isInWatchlist ? "bg-gray-500 cursor-not-allowed opacity-70" : "bg-[#f0503d] hover:bg-[#c23222] active:scale-95 shadow-red-900/40"}`}>
                    
                    {isInWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}

                </button>
            </div>
        </div>
    );
}