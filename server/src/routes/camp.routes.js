const { Router } = require('express');
const { registerCamp, loginCamp, logoutCamp, refreshAccessToken, updateCampDetails, getCurrentCamp } = require('../controllers/camp.controllers.js');
const { upload } = require('../middlewares/multer.middleware.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();

// Route for registering a new camp (with file uploads for documents or images)
router.route("/register").post(
    upload.fields([
        {
            name: "campImage", // Assuming camp image upload
            maxCount: 1
        }
    ]),
    registerCamp
);

// Route for camp login
router.route("/login").post(loginCamp);

// Secured routes

// Route for logging out a camp, requires JWT verification
router.route("/logout").post(logoutCamp);

// Route for refreshing token, JWT may not be necessary as it's to refresh the token
router.route("/refresh-token").post(refreshAccessToken);

// Route for updating camp details, secured by JWT
router.route("/updateCamp").post(updateCampDetails);

router.route("/getCamp").get(getCurrentCamp);

module.exports = router;
