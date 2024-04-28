import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
// Load environment variables from .env file
dotenv.config();
const app = express();

// middlewares
app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser());
// ROUTES
app.get("/", async (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

// MONGOOSE SETUP
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
