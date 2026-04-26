const express = require('express');
const router = express.Router();
const User = require("../models/User");
const crypto = require('crypto');


const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};


router.post("/", async(req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) { 
            return res.status(401).json({ message: "Incorrect email or password." });
        }

        const incomingHash = hashPassword(password);

        if (incomingHash === user.password) {
            return res.status(200).json({ message: "Success" });
        } else {
            return res.status(401).json({ message: "Incorrect email or password." });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
})
module.exports = router;
