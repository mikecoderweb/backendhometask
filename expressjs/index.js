// // 1-qadam npm init - y orqali pacckage json install qilamiz
// // 2-qadam type module qo'shamiz
// //3-qadam npm i express yani expressni install qilamiz
// import express from "express";
// import cors from "cors";

// const app = express();

// app.use(cors());
// app.use(express.json());

// // const users = ["Aziz", "Ali", "Odina", "Sevinch"]
// const users = [
//   {
//     id: 1,
//     name: "Aliya",
//     age: 20,
//   },
//   {
//     id: 2,
//     name: "Sumaya",
//     age: 22,
//   },
//   {
//     id: 3,
//     name: "Feruza",
//     age: 23,
//   },
// ];

// app.get("/", (req, res) => {
//   res.send(`
// Hello from server!
// 👉 req va res orasidagi ishlar = MIDDLEWARE
// 👉 Express.js backendning eng muhim tushunchalaridan biri
//   `);
// });

// app.get("/users", (req, res) => {
//   res.status(200).json(users[id]);
// });

// // app.post("/users", (req, res) => {
// //   try {
// //     const newUser = req.body.name
// //     users.push(newUser)

// //     res.status(201).json({
// //       message: "User added successfully",
// //       users
// //     })
// //   } catch (error) {
// //     res.status(500).json({ error: "Server error" })
// //   }
// // })
// // app.post("/users", (req, res)=>{
// //   try {
// //     console.log(req.body);
// //     if(!req.body?.name){
// //      return res.status(400).send(
// //         "Foydalanuvchiga ism kiritilishi kerak 🫨"
// //       )
// //     }
// //       users.push(req.body.name)
// //       res.status(201).json({users})
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("serverda xatolik yuz berdi 😩")
// //   }
// // })

// app.listen(4200, () => {
//   console.log("Server is running on http://localhost:4200");
// });

import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== DATA =====
const users = [
  { id: 1, name: "Aliya", age: 20 },
  { id: 2, name: "Sumaya", age: 22 },
  { id: 3, name: "Feruza", age: 23 },
];

// ===== HOME =====
app.get("/", (req, res) => {
  res.send(`
Hello from server!
👉 req va res orasidagi ishlar = MIDDLEWARE
👉 Express.js backendning eng muhim tushunchalaridan biri
  `);
});

// ===== GET ALL USERS =====
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// ===== GET USER BY ID =====
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User topilmadi" });
  }

  res.status(200).json(user);
});

// ===== CREATE USER =====
app.post("/users", (req, res) => {
  const { name, age } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    age,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User qo‘shildi",
    user: newUser,
  });
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, age } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User topilmadi" });
  }

  user.name = name ?? user.name;
  user.age = age ?? user.age;

  res.status(200).json({
    message: "User yangilandi",
    user,
  });
});


app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User topilmadi" });
  }

  users.splice(index, 1);

  res.status(200).json({
    message: "User o‘chirildi",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
