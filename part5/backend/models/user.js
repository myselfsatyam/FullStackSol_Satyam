const mongoose=require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const userSchema= new mongoose.Schema({
    username: {
        type:String,
        required: true,
        nique:true
    },
    name:String,
    passwordHash: String,
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Blog'
    }],

})

userSchema.plugin(uniqueValidator) // Corrected the plugin name to 'uniqueValidator' used to enforce unique usernames

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})