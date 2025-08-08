
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import studentrouter from "./Routes/students.js";
import DatabaseHandler from "./Routes/DatabaseHandler.js";
dotenv.config({ path: '../.env' });


// Create an instance of an Express application
const app = express();

// Allow CORS from all origins (for development)
app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      process.env.VITE_DOMAIN_NAME
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(express.json());
app.use('/students', studentrouter);
app.use("/DataUpload",DatabaseHandler);

const HOST = process.env.HOST ;

const PORT = process.env.PORT ;

console.log(`Attempting to start server on Port: ${PORT}`);


app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
