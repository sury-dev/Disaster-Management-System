const asyncHandler = require('../utils/asyncHandler.js');
const { ApiError } = require('../utils/ApiError.js');
const { User } = require('../models/user.models.js');
const { uploadOnCloudinary } = require('../utils/cloudinary.js');
const { ApiResponse } = require('../utils/ApiResponse.js');
const jwt = require("jsonwebtoken");


const generateAccessAndRefreshTokens = async (userId) =>{
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return {accessToken, refreshToken};
    }
    catch(err){
        throw new ApiError(500, "Something went wrong in generateAccessAndRefreshTokens()");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {email, fullName, password} = req.body;

    if ([fullName, email, password].some(field => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }
    
    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new ApiError(409, "User Already exists");
    }

    const profilePictureLocalPath = req.files?.profilePicture[0]?.path;

    if(!profilePictureLocalPath){
        throw new ApiError(400, "Profile Picture is Required");
    }

    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);

    if(!profilePicture){
        throw new ApiError(400, "Profile Picture is Required for cloudinary");
    }

    const user = await User.create({
        fullName,
        email,
        password,
        profilePicture : profilePicture.url
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500, "User creation failed");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered successfully")
    )
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email){
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User Credentials");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken , options)
    .cookie("refreshToken",refreshToken , options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser , accessToken, refreshToken
            },
            "User Logged In Successfully"
        )
    )
});

const logoutUser = asyncHandler(async (req,res)=>{
    await  User.findByIdAndUpdate(
        req.user._id,
        {
            $set : { refreshToken : undefined}
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User Logged Out Successfully"
        )
    )
})

const refresAccessToken = asyncHandler(async (req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized Request");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    
        const user = User.findById(decodedToken._id);
    
        if(!user){
            throw new ApiError(401, "Invalid Token Refresh Token");
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh Token is expired or used");
        }
    
        const options = {
            httpOnly: true,
            secure : true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens();
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access Token refreshed Successfully"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})

const changeCurrentPassword = asyncHandler(async (req,res)=>{
    const{oldPassword, newPassword} = req.body;
    const user = await User.findById(req.body?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Old Password");
    }

    user.password = newPassword;

    await user.save({validateBeforeSave : false});

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password Changed Successfully"
            )
        )
})

const getCurrentUser = asyncHandler(async (req,res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "Current User Fetched successfully"
        )
    )
})

const updateAccountDetails = asyncHandler(async (req,res)=>{
    const {fullName, email} = req.body;

    if(!fullName && !email){
        throw new ApiError(400, "All fields are required for updation");
    }

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                fullName : fullName,
                email : email
            }
        },
        {new : true}
    ).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Account Details Updated Successfully"
            )
        )
})

const updateProfilePicture = asyncHandler(async(req,res)=>{
    const profilePictureLocalPath = req.file?.path;

    if(!profilePictureLocalPath){
        throw new ApiError(400, "Profile Picture file is missing");
    }
    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);
    if(!profilePicture.url){
        throw new ApiError(400, "Error while Uploading on Cloudinary");
    }

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                profilePicture : profilePicture.url
            }
        },
        {new : true}
    ).select("-password");
})
module.exports = {
    registerUser
    , loginUser
    , logoutUser
    ,  refresAccessToken
    , changeCurrentPassword
    , getCurrentUser
    , updateAccountDetails
    , updateProfilePicture};
