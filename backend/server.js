import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from  "./routes/auth.routes.js";
import messageRoutes from  "./routes/message.routes.js";
import userRoutes from  "./routes/user.routes.js";


import connectToMongodb from "./db/connectToMongodb.js";

const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config();

app.use(express.json()); // Middleware for parsing JSON bodies (from req.body)
app.use(cookieParser()); // Middleware

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB database
app.listen(PORT, () => {
    connectToMongodb();
    console.log(`server running on port ${PORT}`);
});

