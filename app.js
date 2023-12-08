const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Connect to MongoDB
const mongoDBUri = process.env.DB_URL || "mongodb://localhost:27017/myBlogApp";
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });

// EJS Template Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const postRoutes = require("./routes/posts");

// Use routes
app.use("/", postRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
