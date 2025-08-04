// Import the express library using ES Module syntax
import express from "express";
// Import and configure dotenv
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


// Create an instance of an Express application
const app = express();


const HOST = process.env.HOST ;

const PORT = process.env.PORT ;

// You can log the port here to check it
console.log(`Attempting to start server on Port: ${PORT}`);

// When a GET request is made to this URL, the server will respond.
app.get('/', (req, res) => {
  res.send('Hello, World! This is a basic Express server.');
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
