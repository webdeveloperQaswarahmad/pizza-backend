const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const DatabaseConnection = require("./config/config");
const pizzaRoutes = require("./routes/pizzaRoutes");
const userRoutes= require("./routes/userRoutes")
const cors = require("cors"); // Import the cors middleware


//config dotenv

dotenv.config();

//mongodb connection

DatabaseConnection();
const app = express();
//middlewares

app.use(express.json());
app.use(morgan("dev"));
// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the backend server");
});
// Use the pizza routes
app.use('/api/v1', pizzaRoutes);
app.use('/api/v1', userRoutes);


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `server running on ${process.env.NODE_ENV} mode on port no ${process.env.PORT}`
  );
});
