const express = require('express');
const router = express.Router();
const WatchlistItem = require("../models/WatchlistItem");
const Movie = require("../models/Movie");

// return ll watchlist items.
router.post("/", async (req, res) => {
    try {
        const { movieId } = req.body;

        const movieExists = await Movie.findById(movieId);
        if (!movieExists) {
            return res.status(404).json({ message: "This movie is not already on your list." });
        }

        const theFilmInWatchlist = await WatchlistItem.findOne({ movieId });
        if (theFilmInWatchlist) {
            return res.status(400).json({ message: "This movie is already on your list." });
        }

        const newItem = new WatchlistItem({
            movieId,
            watched: false
        });
        await newItem.save();

        res.status(201).json({ message: "Added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// add a movie to the watchlist.
router.get("/", async (req, res) => {
    try {
        const moviesInWatchlist = await WatchlistItem.find().populate("movieId");
        res.status(200).json(moviesInWatchlist);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

})

// toggle the watched filed on a watchlist item
router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const currentMovie = await WatchlistItem.findById(id);

        if (!currentMovie) {
            return res.status(404).json({ message: "The Movie is not available." })
        }

        currentMovie.watched = !currentMovie.watched;

        await currentMovie.save();
        res.status(200).json({
            message: `Status changed ${currentMovie.watched ? "Viewed" : "Not yet viewed"}`,
            data: currentMovie
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// remove an item from the watchlist
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const currentMovie = await WatchlistItem.findByIdAndDelete(id);

        if (!currentMovie) {
            return res.status(404).json({ message: "The movie in not found in Watch List" });
        }

        res.status(200).json({
            message: "The film has been successfully removed from the watchlist.",
            currentMovie: id
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})


module.exports = router;
