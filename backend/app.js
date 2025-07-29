const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");

// Config - Removed dotenv loading from here.
// It should be loaded once in your main server.js file to avoid redundancy
// and ensure environment variables are available globally when needed.
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

// Middleware setup for Express application
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parses cookies attached to the client request object
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(fileUpload()); // Handles file uploads

// Route Imports
// Importing your API routes to be used by the Express app
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

// Using the imported routes for specific API endpoints
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Serve static files from the frontend build directory
// This is crucial for deploying your MERN stack application,
// allowing the backend to serve the compiled frontend assets.
app.use(express.static(path.join(__dirname, "../frontend/build")));

// For any other GET request, serve the frontend's index.html
// This enables client-side routing for your React application.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
// This should be your last middleware to catch and handle any errors
// that occur during request processing.
app.use(errorMiddleware);

module.exports = app;
