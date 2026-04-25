const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie");



// return all movies, support optional search
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const { title } = req.query;

        let query = {};
        if (title) {
            query.title = { $regex: title, $options: "i" };
        }
        const skip = (page - 1) * limit;

        const movies = await Movie.find(query).skip(skip).limit(limit);
        const totalMovies = await Movie.countDocuments(query);
        res.status(200).json({
            metadata: {
                totalItems: totalMovies,
                totalPages: Math.ceil(totalMovies / limit),
                currentPage: page,
                itemsPerPage: limit
            },
            data: movies
        });

    } catch (error) {
        res.status(500).json({ message: "The films could not be brought in", error: error.message });
    }
});




// return a single movie by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "The film is not available." });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({ message: "The film is not available.", error: error.message });
    }
});



// change rating the movie from [1 -> 5]
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {rating} = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            { rating: rating },
            { returnDocument: 'after' }
        ); 
        if (!updatedMovie) {
            return res.status(404).json({ message: "The film is not available." }); 
        }

        res.status(200).json(updatedMovie);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports = router;