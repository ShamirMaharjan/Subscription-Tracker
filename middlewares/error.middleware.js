const errorMiddleware = (err, req, res, next) => {
    try {
        const error = { ...err }

        error.message = err.message;

        console.log(error)

        //Mongoose bad ObjectId
        if (err.name === "CastError") {
            const message = `Resource not found. Invalid: ${err.path}`

            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key error
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;

            error = new Error(message);
            error.statusCode = 400;
        }

        //Mongoose validation error
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(value => value.message);

            error = new Error(message.join(', '));
            error.statusCode = 400;
        }
        res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' })
    } catch (error) {
        next(error)
    }
}
export default errorMiddleware;