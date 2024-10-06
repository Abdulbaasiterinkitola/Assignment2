import { Router } from "express";
import { getBook, getAllBooks, createBook, updateBook, deleteBook} from "../controllers/book.js";
import isLoggedIn from "../middlewares/auth.js";

const bookRouter = Router()

bookRouter.get("/:id", isLoggedIn, getBook)
bookRouter.get("/", isLoggedIn, getAllBooks)
bookRouter.post("/", isLoggedIn, createBook)
bookRouter.patch("/:id", isLoggedIn, updateBook)
bookRouter.delete("/:id", isLoggedIn, deleteBook)

export default bookRouter