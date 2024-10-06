import {Router} from "express"
import { CreateAccount, SignIn } from "../controllers/auth.js"

const authRouter = Router()

authRouter.post("/sign-up", CreateAccount)
authRouter.post("/sign-in", SignIn)

export default authRouter