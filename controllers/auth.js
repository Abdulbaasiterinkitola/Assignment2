import { StatusCodes } from "http-status-codes"
import User from "../models/auth.js"
import logger from "../utils/logger.js"
import { errorResponse, successResponse } from "../utils/responses.js"
import { generateSecurePassword, checkValidity, createAccessToken } from "../utils/auth.js"

export const CreateAccount = async(req, res, next) => {
    try {
        logger.info("START: Create books")
        const {firstName, lastName, username, email, password, gender} = req.body
        
        const existingUser = await User.findOne({email})

        if (existingUser) {
            logger.info("END: Create Account Service")

            return errorResponse(res, StatusCodes.BAD_REQUEST, "User already exists. Sign in instead")
        }

        else {
            const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: generateSecurePassword(password),
            gender
        })
    
        const accessToken = createAccessToken(newUser.id)
        
        logger.info("END: Create Account Service")

        successResponse(res, StatusCodes.CREATED, "account created successfully", {user: newUser, token: accessToken})
    }
    } catch (error) {
        if (error.code === 11000) {
        logger.error("Error: Username already exists")
        next(error)
        return errorResponse(res, StatusCodes.CONFLICT, "username already exists. Try another username.")
    }
    else {
        logger.error(error)
        next(error)
    }
}
}

export const SignIn = async(req, res, next) => {
    try {
        const{username, password} = req.body
        if (!username) {
            logger.info("START: Started sign-in service")

            return errorResponse(res, StatusCodes.BAD_REQUEST, "input username")
        }
        
        else if (!password) {
            logger.info("END: Started sign-in service")

            return errorResponse(res, StatusCodes.BAD_REQUEST, "input password")
        }

        const existingUser = await User.findOne({username})

        if (!existingUser) {
            logger.info("END: Started sign-in service")

            return errorResponse(res, StatusCodes.BAD_REQUEST, "User does not exist. Sign up instead")
        }

        if (!checkValidity(password, existingUser.password)) {
            return errorResponse(res, StatusCodes.BAD_REQUEST, "You have entered a wrong username or password.")
        }

        const accessToken = createAccessToken(existingUser.id)

        logger.info("END: Started sign-in service")

        successResponse(res, StatusCodes.OK, "Sign-in successful", {existingUser, token: accessToken})
    } catch (error) {
        logger.error(error)
        next(error)
    }
}