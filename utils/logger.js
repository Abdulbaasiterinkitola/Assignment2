const { createLogger, format, transports, addColors, debug, error, info, warn } = pkg

import pkg from "winston"

const {combine, timestamp, colorize, printf} = format

const logFormat = printf(({timestamp, level, message}) => `${timestamp} ${level} ${message}`)

addColors({
    error: "bold red",
    warn: "bold yellow",
    info: "bold cyan",
    debug: "bold green"
})

const logger = createLogger({
    transports: [
        new transports.File({filename: "log/combined.log"}),
        new transports.File({filename: "log/error.log"}),
        new transports.Console({format: combine(logFormat, colorize({all: true}))})
    ],

    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH-mm-ss"
        }),
        logFormat,
        colorize({all: true})
    )
})

export default logger