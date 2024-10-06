import pkg from "bcryptjs"
const { genSaltSync, hashSync, compareSync} = pkg
import pkg2 from "jsonwebtoken"
const { sign, verify, JwtPayLoad } = pkg2
import { configDotenv } from "dotenv"

configDotenv()

const jwt_secret = process.env.JWT_SECRET

export const generateSecurePassword = (value) => {
    const salt = genSaltSync(10)
    return hashSync(value, salt)
}

export const checkValidity = (value, anotherValue) => {
    return compareSync(value, anotherValue)
}

export const createAccessToken = (id) => {
    const token = sign({id}, jwt_secret)
    return token
}

export const isTokenValid = (token) => {
    return verify(token, jwt_secret)
}