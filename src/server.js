import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
// import fileUpload from "express-fileupload";
import { uploadImage } from "./controllers/uploadController.js";
import upload from "./middleware/uploadMiddleware.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
  })
);
app.use(express.json());
app.post("/api/upload", upload.array("file"), uploadImage);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
