import { BookmarkCheck, Film, Search } from "lucide-react";
import BtnHeader from "./BtnHeader";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header({ searchQuery, onSearchChange, acive }) {
    const [active, setActive] = useState(acive);
    return (
        <header className="flex flex-col gap-4 bg-[#1E2024] border-b border-b-red-300/30 px-4 py-4 shadow-md md:px-8 lg:flex-row lg:items-center lg:justify-between transition-all">

            <div className="flex items-center justify-between gap-4 lg:justify-start">
                <div className="flex items-center gap-2 sm:gap-3">
                    <Film color="#f0503d" size={32} className="sm:w-10 sm:h-10" />
                    <p className="font-heading text-2xl tracking-wider font-semibold sm:text-3xl bg-gradient-to-r from-red-300 to-[#d93f2d] bg-clip-text text-transparent">
                        Cinemafilx
                    </p>
                </div>

                {onSearchChange && (
                    <div className="hidden md:relative md:block md:flex-1 md:max-w-xs lg:max-w-md lg:mx-8">
                        <Search
                            color="#a9a9a9" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="search" placeholder="Search movies..."
                            className="w-full h-10 rounded-lg bg-gray-700/50 py-2 pl-10 pr-4 text-sm text-gray-50 outline-none focus:ring-2 focus:ring-[#f0503d] transition-all border border-transparent focus:border-red-400/20"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                )}
            </div>

            {onSearchChange && (
                <div className="relative w-full md:hidden">
                    <Search color="#a9a9a9" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="search" placeholder="Search movies..."
                        className="w-full h-11 rounded-lg bg-gray-700/50 py-2 pl-10 pr-4 text-sm text-gray-50 outline-none focus:ring-2 focus:ring-[#f0503d]"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            )}

            <nav className="flex items-center justify-center p-1 gap-1 w-full md:w-fit self-center bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg">
                <Link to={"/catalogue"} className="flex-1 md:flex-none">
                    <button
                        className={`w-full md:w-auto px-4 sm:px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 
                            ${active === "Catalogue"
                                ? "bg-[#f0503d] text-white shadow-lg shadow-[#f0503d]/20 scale-105"
                                : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                        onClick={() => setActive("Catalogue")}>
                        Catalogue
                    </button>
                </Link>

                <Link to={"/Watchlist"} className="flex-1 md:flex-none">
                    <button
                        className={`w-full md:w-auto flex justify-center gap-2 items-center px-4 sm:px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300
                            ${active === "Watchlist"
                                ? "bg-[#f0503d] text-white shadow-lg shadow-[#f0503d]/20 scale-105"
                                : "text-gray-400 hover:text-white hover:bg-gray-700"
                            }`}
                        onClick={() => setActive("Watchlist")}>
                        <BookmarkCheck size={18} />
                        <span className="whitespace-nowrap">Watchlist</span>
                    </button>
                </Link>
            </nav>
        </header>

    );

}