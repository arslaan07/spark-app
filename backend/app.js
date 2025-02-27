const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const connectDB = require("./connection/mongoose");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

connectDB();

const allowedOrigins = [
  "http://localhost:5173", // Development 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,POST,PUT,DELETE", 
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Hello my dear World!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
