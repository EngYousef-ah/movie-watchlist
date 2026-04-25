import { Film, Star } from "lucide-react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import NoResults from "../components/NoResults";
import CardMovie from "../components/CardMovie";
import Footer from "../components/Footer";


// Importing Hooks
import { useState, useEffect } from "react";

// Importing Axios to fetch data from api
import axios from 'axios';



import Loading from "../components/Loading";
import useFetch from "../Hooks/useFetch";
import Pagination from "../components/Pagination";
import { Toast } from "../components/Toast";




export default function CataloguePage() {
    const [query, setQuery] = useState("");
    const [watchlistIds, setWatchlistIds] = useState([]);



    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    const { data: response, loading } = useFetch(`movies?page=${currentPage}&limit=${limit}&title=${query}`);
    const movies = response?.data || [];
    const metadata = response?.metadata || {};



    useEffect(() => {
        axios.get("http://localhost:5000/api/watchlist")
            .then((response) => {
                const ids = response.data.map(item => item.movieId._id);
                setWatchlistIds(ids);
            })
            .catch(() => console.log("Error fetching watchlist"));
    }, []);


    const addMovieToWatchlist = async (id) => {
        const response = axios.post("http://localhost:5000/api/watchlist", { movieId: id });
        Toast.promise(response, {
            loading: "Loading in progress",
            success: "Added to Watchlist!",
            error: "There is an error in the data."
        });
        try {
            await response
            setWatchlistIds(prev => [...prev, id]);
        }
        catch (error) {
            console.log("Error adding to watchlist:", error);

        }
    }

    // useEffect(() => {
    //     setCurrentPage(1);
    // }, [query]);


    return (
        <>
            <Header searchQuery={query} onSearchChange={setQuery} acive={"Catalogue"} />
            <div className="px-6 pt-10  bg-[#1E2024] min-h-screen pb-30 ">
                <div className="flex items-center gap-5">
                    <Heading mainText={"DISCOVER"} category={"MOVIES"} />
                </div>

                <Paragraph title={"Explore the Extraordinary. Build your ultimate cinema library and never miss a masterpiece."} />


                {loading ? (<Loading />) : movies?.length === 0 ? (<NoResults />) : null}

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4 mx-auto max-w-full">
                    {!loading && movies?.map((movie) => (
                        <CardMovie
                            key={movie._id}
                            movie={movie}
                            onAdd={() => addMovieToWatchlist(movie._id)}
                            isInWatchlist={watchlistIds.includes(movie._id)}
                        />
                    ))}
                </div>

                {movies.length > 0 &&
                    <Pagination currentPage={currentPage}
                        totalPages={metadata.totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                }
            </div >
            <Footer />
        </>
    );
}