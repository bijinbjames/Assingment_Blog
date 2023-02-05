const express = require("express");
const app = express();
const dotenv =  require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const blogRoute = require("./routes/blogs");

dotenv.config();
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then (console.log("Connected to MongoDB")).catch(err=>console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/blogs", blogRoute);

app.listen("5000", ()=>{
    console.log("Server is running on port 5000");
})