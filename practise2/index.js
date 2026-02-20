const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uplouds", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

let users = [];
let idCounter = 1;

app.post("/users", upload.single("avatar"), (req, res) => {
  const { name, age } = req.body;

  const newUser = {
    id: idCounter++,
    name,
    age,
    avatar: req.file ? req.file.filename : null,
  };

  users.push(newUser);
  res.json(newUser);
});

app.get("/users", (req, res) => {
  const { name } = req.query;

  if (name) {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
    return res.json(filtered);
  }

  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

app.put("/users/:id", upload.single("avatar"), (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.age = req.body.age || user.age;

  if (req.file) {
    user.avatar = req.file.filename;
  }

  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  users = users.filter((u) => u.id != req.params.id);
  res.json({ message: "User deleted" });
});

app.listen(4200, () => {
  console.log("Server running on http://localhost:4200");
});