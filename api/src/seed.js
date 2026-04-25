const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '../..', '.env');
dotenv.config({ path: envPath });


const MONGO_URI = process.env.MONGO_URI;


const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const WatchListItem = require('./models/WatchlistItem');


const seedMovies = [

    {
        title: "Inception",
        year: 2010,
        genre: ["Sci-Fi", "Action", "Thriller"],
        director: "Christopher Nolan",
        posterUrl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        overView: "A professional thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        rating: 1
    },
    {
        title: "Pulp Fiction",
        year: 1994,
        genre: ["Crime", "Drama"],
        director: "Quentin Tarantino",
        posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        overView: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        rating: 1
    },
    {
        title: "Interstellar",
        year: 2014,
        genre: ["Sci-Fi", "Drama", "Adventure"],
        director: "Christopher Nolan",
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        overView: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
        rating: 1
    },
    {
        title: "The Matrix",
        year: 1999,
        genre: ["Action", "Sci-Fi"],
        director: "Lana Wachowski",
        posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        overView: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        rating: 1
    },
    {
        title: "Parasite",
        year: 2019,
        genre: ["Comedy", "Drama"],
        director: "Bong Joon-ho",
        posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        overView: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        rating: 1
    },
    {
        title: "The Godfather",
        year: 1972,
        genre: ["Crime", "Drama"],
        director: "Francis Ford Coppola",
        posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        overView: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        rating: 1
    },
    {
        title: "Whiplash",
        year: 2014,
        genre: ["Drama", "Music"],
        director: "Damien Chazelle",
        posterUrl: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
        overView: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
        rating: 1
    },
    {
        title: "Blade Runner 2049",
        year: 2017,
        genre: ["Drama", "Action", "Sci-Fi"],
        director: "Denis Villeneuve",
        posterUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
        overView: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
        rating: 1
    },
    {
        title: "Goodfellas",
        year: 1990,
        genre: ["crime"],
        director: "Martin Scorsese",
        posterUrl: "https://i.pinimg.com/webp/736x/0a/92/53/0a925312c9b1cdb25e210cb463a86406.webp",
        overView: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
        rating: 1
    },
    {
        title: "The Gringo Hunters",
        year: 2025,
        genre: ["action", "Drama"],
        director: "Jorge Dorantes",
        posterUrl: "https://i.pinimg.com/1200x/a4/23/94/a423945e0fe853e5fa91c7ce856785c1.jpg",
        overView: "An elite Mexican police unit tasks itself with hunting down American fugitives who attempt to disappear across the border.",
        rating: 1
    },
    {
        title: "Sujo",
        year: 2024,
        genre: ["Drama",],
        director: "Astrid Rondero",
        posterUrl: "https://i.pinimg.com/736x/45/e9/0b/45e90bef32b8eda748ed3db905401ff9.jpg",
        overView: "After a cartel gunman is murdered, his orphan son Sujo grows up in the shadow of violence, struggling to escape the dark destiny of his father.",
        rating: 1
    },
    {
        title: "Kryptic",
        year: 2024,
        genre: ["Drama", "horror"],
        director: "Kourtney Roy",
        posterUrl: "https://northbayfilmfestival.ca/wp-content/uploads/2024/10/Kryptic-Poster.jpg",
        overView: "A tense thriller follows a man searching for a missing person, only to encounter strange occurrences that challenge his perception of reality.",
        rating: 1
    },
    {
        title: "BABY DRIVER",
        year: 2017,
        genre: ["crime", "action"],
        director: "Edgar Wright",
        posterUrl: "https://i.pinimg.com/1200x/ec/7a/cc/ec7acc5b5c9c01557c992645fa20fbba.jpg",
        overView: "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.",
        rating: 1
    },
    {
        title: "From",
        year: 2022,
        genre: ["horror"],
        director: "Clay Stafford",
        posterUrl: "https://resizing.flixster.com/YT-bC_CDvDtFH8sbWpWLkoLTtKU=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p21200256_b_h9_aa.jpg",
        overView: "Unravel the mystery of a nightmarish town in middle America that traps all those who enter, while the unwilling residents fight to survive and find a way out.",
        rating: 1
    },
    {
        title: "The Boat",
        year: 2018,
        genre: ["vagueness", "horror"],
        director: "Joe Azzopardi",
        posterUrl: "https://i.pinimg.com/1200x/3d/b1/54/3db15481a35c320d2e0f14289eb5d317.jpg",
        overView: "A solo sailor abandoned in deep mist discovers a ghost ship, leading to a claustrophobic fight for survival against an unknown force.",
        rating: 1
    },

]

const seedMoviesData = async () => {
    try {
        if (!MONGO_URI) {
            console.error("Error in  mongo_url");
            process.exit(1);
        } 
        await mongoose.connect(MONGO_URI);
        const count = await Movie.countDocuments();
        if (count === 0) {
            console.log("Database is empty. Seeding 15 movies...");
            await Movie.insertMany(seedMovies);
            await WatchListItem.deleteMany({});
            console.log(" Seed complete.");
        } else {
            
            console.log(`DB already has ${count} movies. No seeding needed.`);
        }

      
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
       
    }
};

module.exports = { seedMoviesData };