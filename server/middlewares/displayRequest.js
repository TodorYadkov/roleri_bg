const displayRequest = () => (req, res, next) => {
    console.log(`Incoming ${req.method} request to: ${req.path}`);

    // Check if request body is empty
    const isEmptyBody = Object.keys(req.body).length === 0;
    if (!isEmptyBody && process.env.NODE_ENV !== 'production') {
        console.log('Message from: server/middlewares/displayRequest.js - only in development phase');
        console.log('Request body: ', req.body);
    }

    next();
}

export default displayRequest;