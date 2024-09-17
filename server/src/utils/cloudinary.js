const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload file to Cloudinary
const uploadOnCloudinary = async function(localFilePath) {
    try {
        if (!localFilePath) {
            console.log("File path does not exist: cloudinary.js");
            return null;
        }
        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: 'auto' });
        console.log("File uploaded to Cloudinary: ", response);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error("Cloudinary upload error: ", error);
        // Remove the locally saved file if the upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw error;  // Rethrow the error for further handling
    }
};

module.exports = { uploadOnCloudinary };
