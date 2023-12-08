const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Display all posts
router.get("/", async (req, res) => {
  console.log("Accessing /posts route");
  try {
    const posts = await Post.find();
    console.log("Posts fetched:", posts);
    res.render("index", { posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error occurred");
  }
});

// Display form to create a new post
router.get("/new", (req, res) => {
  res.render("new");
});

// Create a new post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.redirect("/");
});

// Display form to edit a post
router.get("/edit/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit", { post });
});

// Update a post
router.post("/update/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

// Delete a post
router.get("/delete/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
