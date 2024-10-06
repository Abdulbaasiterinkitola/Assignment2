import express from "express"
import connectDB from "./config/db.js"
import { port } from "./config/db.js"
import bookRouter from "./router/bookRoute.js"
import errorHandler from "./middlewares/errorHandler/index.js"
import authRouter from "./router/authRoute.js"

const app = express()
app.use(express.json())

app.use("/book", bookRouter)
app.use("/auth", authRouter)

app.use(errorHandler)


app.listen(port, async () => {
    await connectDB()
    console.log(`Server currently running on port: ${port} `)
})