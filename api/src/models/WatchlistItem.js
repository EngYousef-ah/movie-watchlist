const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WatchlistItemSchema = new Schema({
    movieId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:true,
        unique:true
    },
    watched:Boolean,
    addedAt:{
        type:Date,
        default:Date.now
    },
}, { versionKey: false })

const WatchlistItem = mongoose.model("WatchlistItem", WatchlistItemSchema)

module.exports = WatchlistItem;
