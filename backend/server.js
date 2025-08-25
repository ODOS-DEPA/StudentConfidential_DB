
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import studentrouter from "./Routes/checkstatus.js";
import checkstatus_DB from "./Routes/checkstatus_DB.js";
import citizen_identity_DB from "./Routes/citizen_identity_DB.js";
import student_citizen_identity from "./Routes/student_citizen_identity.js";
import EnglishScore from "./Routes/EnglishScoreTest.js";
import EnglishScoreTest_DB from "./Routes/EnglishScore_DB.js";
import TechScore from "./Routes/TechScoreTest.js";
import TechScoreTest_DB from "./Routes/TechScore_DB.js";
dotenv.config({ path: '../.env' });


// Create an instance of an Express application
const app = express();

// Allow CORS from all origins (for development)
app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "https://nodomain.space",
      "https://odos.thaigov.go.th/",
      process.env.VITE_DOMAIN_NAME,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(express.json());
app.use('/students', studentrouter);                      //all-Seperate searching
app.use("/DataUpload",checkstatus_DB);                    // insert update data
app.use("/citizenID",student_citizen_identity);           //all-Seperate searching
app.use("/citizenID/upload",citizen_identity_DB);         // insert update data
app.use("/EnglishScore",EnglishScore);                    //all-Seperate searching
app.use("/EnglishScore/upload",EnglishScoreTest_DB)       // insert update data
app.use("/TechScore",TechScore);                       //all-Seperate searching
app.use("/TechScore/upload",TechScoreTest_DB)          // insert update data

const HOST = process.env.HOST ;
const PORT = process.env.PORT ;

console.log(`Attempting to start server on Port: ${PORT}`);


app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
