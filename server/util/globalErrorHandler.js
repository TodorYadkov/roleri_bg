import { Error as _Error } from 'mongoose';

// Global error handler
const globalErrorHandler = (err, req, res, next) => {
    // Default status code for unexpected errors
    let statusCode = 500;
    let message = 'Internal server error';

    if (err.statusCode) {
        // Use custom status code from the error object, if available
        statusCode = err.statusCode;
        // Use custom message from the error object, if available
        message = err.message || 'Unknown error';

    } else if (err instanceof _Error.ValidationError) {
        // Mongoose validation error
        statusCode = 400;
        message = Object.values(err.errors).map(error => error.message).join(', ');

    } else if (err.name === 'MongoServerError') {
        // Mongoose server error
        if (err.code === 11000) {
            // Duplicate key error
            statusCode = 409;
            message = 'Duplicate key error';
        } else if (err.name === 'CastError') {
            // Cast error
            statusCode = 400;
            message = 'Invalid data type';
        }

    } else if (err.isJoi) {
        // Joi library validation error
        statusCode = 400;
        message = err.details.map(error => error.message).join(', ');

    } else if (err instanceof Error || err instanceof TypeError || err instanceof SyntaxError) {
        // Custom server error
        statusCode = 400;
        message = err.message;
    }

    // Error response
    res.status(statusCode).json({ message, statusCode });

    // Log the error for debugging purposes
    console.error(err);
};

export default globalErrorHandler;