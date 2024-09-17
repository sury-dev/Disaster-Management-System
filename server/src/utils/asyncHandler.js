const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
            .resolve(requestHandler(req, res, next))  // Pass the correct arguments
            .catch(next);  // Automatically pass the error to next()
    };
};

module.exports = asyncHandler;  // Use module.exports for CommonJS
