import mongoose from "mongoose";

const bookSChema = new mongoose.Schema({
    title: {
        type: String
    },
    
    author: {
        type: String
    },

    genre: {
        type: String,
        enum: ["poetry", "prose", "drama"]
    }
}, {timestamps: true})

export const Book = mongoose.model("book", bookSChema)