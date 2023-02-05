const router = require("express").Router();
const User = require("../models/Users");
const blog = require("../models/Blog");
const Blog = require("../models/Blog");


//CREATE BLOG
router.post("/", async (req, res) => {
    const newBlog = new Blog(req.body);
    try {
        const savedBlog = await newBlog.save();
        res.status(200).json(savedBlog);
    } catch (err) {
        res.status(500).json(err);
    }

});


//UPDATE BLOG
router.put("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog.createdBy === req.body.createdBy){
        try {
            const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{new:true});
            res.status(200).json(updatedBlog);
        } catch (err) {
            res.status(500).json(err);
        }
        }else{
            res.status(403).json("You can update only your blog");  
        }
    } catch (err) {
        res.status(500).json(err);
        
    }
    
});

//DELETE BLOG
router.delete("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog.createdBy === req.body.createdBy){
        try {
            await blog.delete();
            res.status(200).json("Blog has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
        }else{
            res.status(403).json("You can delete only your blog");  
        }
    } catch (err) {
        res.status(500).json(err);
        
    }
    
});

//GET POST
router.get("/:id", async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;

    try{
        let blogs;
        if (username){
            blogs = await Blog.find({createdBy: username});

        }else {
            blogs = await Blog.find();
        }
        
        res.status(200).json(blogs);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;