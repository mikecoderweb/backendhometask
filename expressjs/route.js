import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "Ali", age: 12 },
  { id: 2, name: "Vali", age: 15 },
];


app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User topilmadi" });
  res.json(user);
});

app.post("/users", (req, res) => {
  const { name, age } = req.body;
  if (!name || typeof age !== "number") {
    return res.status(400).json({ error: "Name va age kiritilishi shart" });
  }
  const newUser = { id: users.length + 1, name, age };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) return res.status(404).json({ error: "User topilmadi" });

  const { name, age } = req.body;
  if (!name || typeof age !== "number") {
    return res.status(400).json({ error: "Name va age kiritilishi shart" });
  }

  users[userIndex] = { id, name, age };
  res.json(users[userIndex]);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) return res.status(404).json({ error: "User topilmadi" });

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

app.get("/users/error", (req, res, next) => {
  next(new Error("Bu ataylab xato"));
});

let products = [
  { id: 1, title: "Mouse", price: 100 },
  { id: 2, title: "Keyboard", price: 200 },
];

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: "Product topilmadi" });
  res.json(product);
});

app.post("/products", (req, res) => {
  const { title, price } = req.body;
  if (!title || typeof price !== "number") {
    return res.status(400).json({ error: "Title va price kiritilishi shart" });
  }
  const newProduct = { id: products.length + 1, title, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) return res.status(404).json({ error: "Product topilmadi" });

  const { title, price } = req.body;
  if (!title || typeof price !== "number") {
    return res.status(400).json({ error: "Title va price kiritilishi shart" });
  }

  products[productIndex] = { id, title, price };
  res.json(products[productIndex]);
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) return res.status(404).json({ error: "Product topilmadi" });

  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct[0]);
});

app.get("/products/error", (req, res, next) => {
  next(new Error("Bu ataylab xato"));
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
