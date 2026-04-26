const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const movieSchema = new Schema({
    title: String,
    year: Number,
    genre: [String],
    rating: { type: Number, default: 1 },
    director: String,
    posterUrl: String,
    overView:String
}, { versionKey: false })

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie;
