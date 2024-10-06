import {Book} from "../models/book.js"
import { errorResponse } from "../utils/responses.js"
import { successResponse } from "../utils/responses.js"
import { StatusCodes } from "http-status-codes"
import logger from "../utils/logger.js"

export const createBook = async (req, res, next) => {
    try{
    logger.info("START: Create Books")
    const {title, genre, author} = req.body

    if(!title || !genre || !author) {
        logger.info("END: Create Books")

        return errorResponse(res, StatusCodes.UNPROCESSABLE_ENTITY, "missing parameter")
    }

    const newBook = await Book.create({title, genre, author})

    logger.info("END: Create Books")

    successResponse(res, StatusCodes.CREATED, "new book created successfully", newBook)
}catch(error) {
    logger.error(error)
    next(error)
    }
}

export const getBook = async (req, res, next) => {
    try{
    logger.info("START: Get Book")
    const BookId = req.params.id

    const oneBook = await Book.findOne({_id: BookId})

    logger.info("END: Get Book")

    successResponse(res, StatusCodes.OK, "Book fetched successfully", Book)
}catch(error) {

    if (error.name === 'CastError') {
        
        logger.info("END: Get Book")

        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "invalid Book")
    }

    logger.error(error)
    next(error)}
}

export const getAllBooks = async (req, res, next) => {
    try{
        const Books = await Book.find({})

    if (!Books) {
        return errorResponse(res, 404, "no book found/available to get")
    }

    successResponse(res, StatusCodes.OK, "all books fetched successfully", Books)
}catch(error) {
    logger.error(error)
    next(error)
}
}

export const updateBook = async (req, res, next) => {

    try{
    const BookId = req.params.id

    const {title, author, genre} = req.body

    const updatedBook = await Book.findOneAndUpdate({_id: BookId}, {title, author, genre}, {new: true, runValidators: true})

    if (!updatedBook) {
        return errorResponse(res, StatusCodes.BAD_REQUEST, "Book does not exist")
    }

    else if (!title && !author && !genre) {
        return errorResponse(res, StatusCodes.BAD_REQUEST, "nothing to update here")
    }

    successResponse(res, StatusCodes.OK, "Book updated successfully")
}catch(error) {
    logger.error(error)
    next(error)
}
}

export const deleteBook = async (req, res, next) => {
    try{
    const BookId = req.params.id

    const oneBook = await Book.findOneAndDelete({_id: BookId})

    if (!Book) {
        return errorResponse(res, StatusCodes.BAD_REQUEST, "Book not found")
    }

    successResponse(res, StatusCodes.OK, "Book deleted successfully", null)
}catch(error) {
    logger.error(error)
    next(error)
}
}