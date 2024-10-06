import { StatusCodes } from "http-status-codes";

class ApiError {
    constructor(code, message) {
        this.code = code
        this.message = message
    }

    static notFound() {
        return new ApiError(StatusCodes.NOT_FOUND, "request not found")
    }

    static badRequest(message) {
        return new ApiError(StatusCodes.BAD_REQUEST, message)
    }

    static internalServerError() {
        return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "internal server error")
    }

}

export default ApiError