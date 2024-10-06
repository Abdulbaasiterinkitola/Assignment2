import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },

    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    }, 

    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    }
})

const User = mongoose.model("user", userSchema)

export default User