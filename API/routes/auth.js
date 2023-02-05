const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { json } = require("express");
const { validate } = require("../models/Users");


// REGISTER
router.post("/register", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            name: req.body.name,
            //id: req.body.id,
            email: req.body.email,
            password: hashedPass,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({name: req.body.name})
        !user && res.status(400).json("Wrong credentials");

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong credentials");
        
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500),json(err);
    }
})



module.exports = router;