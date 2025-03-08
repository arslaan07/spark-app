const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, //TLS
  secure: false,
  auth: {
    user: 'mysparkapp18@gmail.com', 
    pass: process.env.GMAIL_PASSWORD 
  },
  debug: true, // Enable debugging
  logger: true  // Log errors
});


module.exports = transporter
