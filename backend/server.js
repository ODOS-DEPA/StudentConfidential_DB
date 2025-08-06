
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import studentrouter from "./Routes/students.js";
import DatabaseHandler from "./Routes/DatabaseHandler.js";
dotenv.config({ path: '../.env' });


// Create an instance of an Express application
const app = express();

// Allow CORS from all origins (for development)
app.use(cors());

// หรือ allow เฉพาะ frontend
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));


app.use(express.json());
app.use('/students', studentrouter);
app.use("/DataUpload",DatabaseHandler);

const HOST = process.env.HOST ;

const PORT = process.env.PORT ;

console.log(`Attempting to start server on Port: ${PORT}`);


app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
