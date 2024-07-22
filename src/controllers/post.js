const Post  = require("../models/post.js");

const createPost = async (req,res) => {
  try {
    const {author, title, content} = req.body;
    const post = new Post({author, title, content});
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const readPosts = async (req, res) => {
 try {
    const posts = await Post.find();
    res.status(200).send(posts);
 } catch (error) {
    res.status(500).send(error);
 }
};

const readPost = async (req,res)=> {
  try {
     const { id } = req.params;
     const post = await Post.findById(id);
     if (!post) {
        res.status(404).send();
     }
     res.status(200).send(post);
  } catch (error) {
     res.status(500).send(error);
  }
};

const updatePost = async (req,res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, 
    req.body,    
    {
     new: true,
     runValidators: true
   });
   if (!post) {
     res.status(404).send();
   }
   res.status(200).send(post);
  } catch (error) {
   res.status(400).send(error);
  }
};

const deletePost = async (req,res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
       res.status(404).send("Post wasn't found");
    }
     res.status(200).send(post);
   } catch (error) {
     res.status(500).send(error);
   }
};

module.exports = {createPost,readPost,updatePost,readPosts,deletePost}