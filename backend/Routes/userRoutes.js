import e from "express";
import middleware from "../middleware.js";
import User from "../model/userModel.js";
const router=e.Router();


router.get("/profile", middleware, async (req, res) => {
    try {
        const email = req.email;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "Unauthorized access" });
        }

        const filename = user.resume;
        const resumeUrl = filename;

        return res.status(200).json({
            fullname: user.fullname,
            email: user.email,
            resumeUrl: resumeUrl, 
        });

    } catch (e) {
        console.error("error in profile ",e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/files/:filename",middleware, (req, res) => {
    const { filename } = req.params;
    const filePath = `./files/${filename}`;
    console.log(filename,filePath)
    res.download(filePath, filename, (err) =>{
        if (err) {
            console.error("error in /files ",err);
            return res.status(404).json({ message: "File not found."});
        }
    });
})
export default router;