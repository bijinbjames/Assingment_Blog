const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    createdBy:{
        type: String,
        required: true
    },
    createdOn:{
        type: Date,
        default: Date.now
    },
   

    
    
},
{timestamps: true}
);

module.exports = mongoose.model("Blog", BlogSchema);
