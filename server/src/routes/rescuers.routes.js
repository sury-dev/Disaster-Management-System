const { Router } = require('express');
const { registerUser, loginUser, logoutUser, refresAccessToken, verified } = require('../controllers/users.controllers.js');
const { upload } = require('../middlewares/multer.middleware.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = Router();
router.route("/register").post(
    upload.fields([
        {
            name : "profilePicture",
            maxCount : 1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser)

//secured Routes

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(logoutUser)
router.route("/verify-token").post(verified)

module.exports = router;
