import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/upload", uploadRoutes);

app.use((err, req, res, next) => {
  res.status(400).json({
    error: err.message,
  });
});

app.listen(4200, () => {
  console.log("Server running at http://localhost:4200");
});
