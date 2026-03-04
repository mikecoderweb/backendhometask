import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./src/utils/connectDb.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(userRoutes);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});