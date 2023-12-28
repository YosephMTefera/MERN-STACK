import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./DB/DB.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/category.js";
import config from "./config/firebase.config.js";
import { initializeApp } from "firebase/app";

const app = express();
app.use(cors());

dotenv.config();

initializeApp(config.firebaseConfig);
connectDatabase();
app.use(express.static("Images"));
app.use("/Images/", express.static("Images"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/category", categoryRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
