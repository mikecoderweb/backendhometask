import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/single", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Fayl yuklanmadi" });
  }

  res.status(200).json({
    message: "Rasm yuklandi!",
    filePath: req.file.path,
    fileURL: `/uploads/images/${req.file.filename}`,
  });
});

router.post("/multiple", upload.array("photos", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "Fayllar yuklanmadi" });
  }

  const files = req.files.map((file) => ({
    filePath: file.path,
    fileURL: `/uploads/images/${file.filename}`,
  }));

  res.status(200).json({
    message: "Rasmlar yuklandi!",
    total: files.length,
    files,
  });
});

export default router;

