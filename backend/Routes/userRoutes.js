import express from "express";
import middleware from "../middleware.js";
import User from "../model/userModel.js";
const router = express.Router();

router.get("/profile", middleware, async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(400).json({ message: "Unauthorized access" });
        }
        
        return res.status(200).json({
            fullname: user.fullname,
            email: user.email,
            resumeUrl: user.resume,  
        });

    } catch (e) {
        console.error("Error in profile", e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/files/:filename", middleware, (req, res) => {
    const { filename } = req.params;
    const filePath = `./files/${filename}`;
    console.log(filename, filePath);
    
    res.download(filePath, filename, (err) => {
        if (err) {
            console.error("Error in /files:", err);
            return res.status(404).json({ message: "File not found." });
        }
    });
});

export default router;