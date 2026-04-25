
const path = require('path');
const dotenv = require('dotenv');
const crypto = require('crypto');
const User = require('./models/User');
const envPath = path.resolve(__dirname, '../..', '.env');
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const { seedMoviesData } = require('./seed.js');

const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json())

const userRoutes = require('./routes/user')
const movieRoutes = require('./routes/movies');
const watchlistRoutes = require('./routes/watchlist');

app.use('/api/user', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/watchlist', watchlistRoutes);


const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.log(" Missing admin env variables");
            return;
        }

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const hashedPassword = hashPassword(adminPassword);
            const admin = new User({
                email: adminEmail,
                password: hashedPassword
            });
            await admin.save();
            console.log("Admin account seeded successfully.");
        } else {
            console.log("ℹ Admin account already exists.");
        }
    } catch (error) {
        console.error(" Error seeding admin:", error);
    }
};

mongoose.connect(MONGO_URI)
    .then(async () => { 
        console.log("Connected successfully to DB");

        await seedAdmin();
        await seedMoviesData(); 

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to database:", err);
    });





