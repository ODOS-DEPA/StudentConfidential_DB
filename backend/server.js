
import express from "express";
import dotenv from 'dotenv'
import studentrouter from "./Routes/students.js";
dotenv.config({ path: '../.env' });


// Create an instance of an Express application
const app = express();
app.use(express.json());
app.use('/students', studentrouter);

const HOST = process.env.HOST ;

const PORT = process.env.PORT ;

console.log(`Attempting to start server on Port: ${PORT}`);


app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
