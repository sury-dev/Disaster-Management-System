const { User } = require("../models/user.models");
const { ApiError } = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Check for token in cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorized Access");
        }
        
        // Verify the token and decode it
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user based on the decoded token ID
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach user to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle token verification errors
        if (error.name === 'JsonWebTokenError') {
            error = new ApiError(401, "Invalid Token");
        } else if (error.name === 'TokenExpiredError') {
            error = new ApiError(401, "Token has expired");
        } else {
            error = new ApiError(401, "Unauthorized Access");
        }

        next(error); // Pass the error to the error-handling middleware
    }
});

module.exports = { verifyJWT };
