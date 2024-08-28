import express from "express";
import multer from "multer";
import User from "../model/userModel.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/signup', upload.single("file"), async (req, res) => {
    const { fullname, password, email } = req.body;

    try {
        if (!req.file) {
            return res.status(400).json({ message: "File not received. Please send a PDF only." });
        }
        const user = new User({
            email,
            fullname,
            password,
            resume: req.file.filename
        });
        await user.save();
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.status(201).json({ message: "Account created", token: token });

    } catch (e) {
        console.log("Error in signup:", e.message);
        return res.status(500).json("Internal server error");
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(411).json({ message: "Invalid credentials" });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.password === password) {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                return res.status(400).json({ message: "Secret not found" });
            }
            const token = await jwt.sign({ id: user._id }, secret);
            return res.status(200).json({ message: "Login successful", token: token });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (e) {
        console.log("Error in login:", e.message);
        return res.status(500).json("Internal server error");
    }
});

export default router;
