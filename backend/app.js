const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const linkRoutes = require("./routes/link");
const shopRoutes = require("./routes/shop");
const publicRoutes = require("./routes/public");
const connectDB = require("./connection/mongoose");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const cors = require("cors");
const path = require('path')
require("dotenv").config();

connectDB();

const allowedOrigins = [
  process.env.VITE_URL_DEVELOPMENT, 
  process.env.VITE_URL_PRODUCTION
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
app.use('/images', express.static(path.join(__dirname, 'public/images')))


app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/profile", publicRoutes);


app.get('/', (req, res) => { 
  res.send('Welcome to Spark!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
