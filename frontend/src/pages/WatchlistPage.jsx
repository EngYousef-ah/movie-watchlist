import Header from "../components/Header";
import Heading from "../components/Heading";
import NoResults from "../components/NoResults";
import CardWatchlist from "../components/CardWatchlist";
import Footer from "../components/Footer";
import { Toast } from "../components/Toast";

// Importing Hooks
import { useState, useEffect, useMemo } from "react";

// Importing Axios to fetch data from api
import axios from 'axios';

// Importing Toast for notifications
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import BtnCount from "../components/BtnCount";

export default function WatchlistPage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const refreshMovies = () => {
        axios.get(`http://localhost:5000/api/watchlist`)
            .then((response) => {
                setMovies(response.data);
                setIsLoading(false)
            })
            .catch(() => console.log("There is error in fetching data from api"))
            .finally(() => {
                setIsLoading(false);
            });
    }



    const WatchedMovies = useMemo(() => {
        return movies.filter((m) => m.watched)
    }, [movies])

    const handleDelete = async (movieId) => {
        const response =  axios.delete(`http://localhost:5000/api/watchlist/${movieId}`);

        Toast.promise(response, {
            loading: "Loading in progress",
            success: "Removed from Watchlist!",
            error: "There is an error in the data."
        })
        setIsLoading(true);
        try {
            await response;
            refreshMovies();
        } catch (error) {
            toast.error('Failed to remove movie');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    const changeStateMovie = async (movieId) => {
        setIsLoading(true);
        const response = axios.patch(`http://localhost:5000/api/watchlist/${movieId}`);
        Toast.promise(response, {
            loading: "Loading in progress",
            success: "Successfully updated.",
            error: "There is an error in the data."
        })

        try {
            await response;
            setIsLoading(false);
            refreshMovies();
        }
        catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        refreshMovies();
    }, [])

    return (
        <>
            <Header acive={"Watchlist"} />
            <div className="px-6 pt-10  bg-[#1E2024] min-h-screen pb-30 ">

                <div className="flex items-center gap-5">
                    <Heading mainText={"MY"} category={"WATCHLIST"} />
                </div>

                <div className="flex gap-2 mt-5">
                    <BtnCount count={movies.length} category={"movies"} />
                    <BtnCount count={WatchedMovies.length} category={"watched"} />
                </div>

                {isLoading ? (<Loading />) : movies.length === 0 ? (<NoResults />) : null}

                <div className="grid gap-6 mt-8 grid-cols-1 lg:grid-cols-2  mx-auto max-w-full font-sans ">
                    {movies.map((movie) => (
                        <CardWatchlist
                            key={movie._id}
                            movie={movie.movieId}
                            onRemove={() => handleDelete(movie._id)}
                            onWatched={() => changeStateMovie(movie._id)}
                            status={movie.watched}
                        />
                    ))}
                </div>

            </div>
            <Footer />
        </>
    );
}