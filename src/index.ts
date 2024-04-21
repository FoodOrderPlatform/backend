import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoute";
import { v2 as cloudinary } from "cloudinary";
import RestaurantRouter from "./routes/RestaurantRoute";
import RestaurantsRoute from "./routes/RestaurantsRoute";

const PORT = "7000";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connect to mongodb!");
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", UserRoute);
app.use("/api/restaurant", RestaurantRouter);
app.use("/api/restaurants", RestaurantsRoute);

app.listen(PORT, () => {
  console.log(`Server start at localhost:${PORT}`);
});
