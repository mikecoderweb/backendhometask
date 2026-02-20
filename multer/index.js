//1 qadam npm init -y
//2 qadam npm i express
//3 qadam npm i multer

import express from "express";
import multer from "multer";
const app = express();
// const uploads = multer({dest: "uploads/"})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});

function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Faqat rasm fayllar yuklash mumkin!"));
  }
  cb(null, true);
}
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 },
});

app.post("/upload", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Fayl yuklanmadi" });
  }

  res.status(200).json({
    message: "Rasm yuklandi!",
    filePath: "/uploads/" + req.file.filename,
  });
});

// app.post('/upload', uploads.single('file'), (req, res) =>{
//     console.log(req.file);

//     res.json({
//         message: 'fayl downloaded succesfully ',
//         fileName: req.file.filename,
//         originalName: req.file.originalname,
//         size: req.file.size + 'bytes'
//     })
// })

app.get("/", (req, res) => {
  res.send("salom Multer o'rganishni boshladik");
});

app.listen(4200, () => {
  console.log("server is running on http://localhost:4200");
});
