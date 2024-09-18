const asyncHandler = require('../utils/asyncHandler.js');
const { ApiError } = require('../utils/ApiError.js');
const { RescueCamp } = require('../models/rescueCamps.models.js');
const { ApiResponse } = require('../utils/ApiResponse.js');
const jwt = require("jsonwebtoken");

// Helper function to generate access and refresh tokens for camps
const generateAccessAndRefreshTokens = async (campId) => {
    try {
        const camp = await RescueCamp.findById(campId);
        const accessToken = await camp.generateAccessToken(); // Assuming this method exists
        const refreshToken = await camp.generateRefreshToken(); // Assuming this method exists
        console.log('Access Token:', accessToken, 'Refresh Token:', refreshToken);
        camp.refreshToken = refreshToken;
        await camp.save({ validateBeforeSave: false });
        
        return { accessToken, refreshToken };
    } catch (err) {
        throw new ApiError(500, "Something went wrong in generateAccessAndRefreshTokens()");
    }
}

// Register a new rescue camp
const registerCamp = asyncHandler(async (req, res) => {
    const { name, email, password, address, capacity, campManagerName, campManagerContact } = req.body;

    if ([name, email, password, address, capacity, campManagerName, campManagerContact].some(field => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const existingCamp = await RescueCamp.findOne({ email });

    if (existingCamp) {
        throw new ApiError(409, "Rescue Camp Already exists");
    }

    const camp = await RescueCamp.create({
        name,
        email,
        password,
        address,
        capacity,
        campManagerName,
        campManagerContact
    });

    const createdCamp = await RescueCamp.findById(camp._id).select("-password -refreshToken");

    if (!createdCamp) {
        throw new ApiError(500, "Camp creation failed");
    }

    return res.status(201).json(
        new ApiResponse(200, createdCamp, "Rescue Camp Registered successfully")
    );
});

// Login a rescue camp
const loginCamp = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const camp = await RescueCamp.findOne({ email });

    if (!camp) {
        throw new ApiError(404, "Rescue Camp does not exist");
    }

    const isPasswordValid = await camp.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Rescue Camp Credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(camp._id);

    const loggedInCamp = await RescueCamp.findById(camp._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Adjust based on your environment
        sameSite: 'None', // Use 'None' if cookies are being used across different sites
    };

    // Set cookies in response
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    camp: loggedInCamp, accessToken, refreshToken
                },
                "Rescue Camp Logged In Successfully"
            )
        );
});

// Logout a rescue camp
const logoutCamp = asyncHandler(async (req, res) => {
    await RescueCamp.findByIdAndUpdate(
        req.camp._id,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "Rescue Camp Logged Out Successfully"
            )
        );
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const camp = await RescueCamp.findById(decodedToken._id);

        if (!camp) {
            throw new ApiError(401, "Invalid Refresh Token");
        }

        if (incomingRefreshToken !== camp.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or invalid");
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        };

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(camp._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access Token refreshed Successfully"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token");
    }
});

// Change Rescue Camp password
const changeCampPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const camp = await RescueCamp.findById(req.body._id);
    const isPasswordCorrect = await camp.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Old Password");
    }

    camp.password = newPassword;

    await camp.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password Changed Successfully"
            )
        );
});

// Fetch current Rescue Camp details
const getCurrentCamp = asyncHandler(async (req, res) => {
    const email = req.query.email;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const camp = await RescueCamp.findOne({ email }).select("-password -refreshToken");
    if (!camp) {
        throw new ApiError(404, "Rescue Camp not found");
    }

    return res.status(200).json(new ApiResponse(200, camp, "Current Rescue Camp Fetched successfully"));
});


// Update Rescue Camp details
const updateCampDetails = asyncHandler(async (req, res) => {
    const {
        capacity,
        currentOccupancy,
        water,
        food,
        medicalSupplies,
        blankets,
        tents,
    } = req.body;

    if ([capacity, currentOccupancy, water, food, medicalSupplies, blankets, tents].every(field => field === undefined)) {
        throw new ApiError(400, "At least one field is required for update");
    }

    const updatedFields = {};

    if (capacity !== undefined) updatedFields.capacity = capacity;
    if (currentOccupancy !== undefined) updatedFields.currentOccupancy = currentOccupancy;
    if (water !== undefined) updatedFields.water = water;
    if (food !== undefined) updatedFields.food = food;
    if (medicalSupplies !== undefined) updatedFields.medicalSupplies = medicalSupplies;
    if (blankets !== undefined) updatedFields.blankets = blankets;
    if (tents !== undefined) updatedFields.tents = tents;

    const camp = await RescueCamp.findOneAndUpdate(
        { email: req.query.email }, // Assuming email is used to find the camp
        { $set: updatedFields },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, camp, "Camp Resource Details Updated Successfully"));
});


module.exports = {
    registerCamp,
    loginCamp,
    logoutCamp,
    refreshAccessToken,
    changeCampPassword,
    getCurrentCamp,
    updateCampDetails
};
