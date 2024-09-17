const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    email :{
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true,
        index : true
    },
    alternateEmail :{
        type : String,
        required : false,
        lowercase : true,
        trim : true
    },
    fullName :{
        type : String,
        required : true,
        trim : true,
    },
    dateOfBirth:{
        type : Date,
        required : true
    },
    profilePicture : {
        type : String,
        required : true,
        reuired : true
    },
    password : {
        type : String,
        required : [true , "Password is required"]
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    alternatePhoneNumber : {
        type : Number,
        required : true
    },
    latitude:{
        type: Number,
        required: false
    },
    longitude:{
        type: Number,
        required: false
    },
    gender:{
        type : String,
        required : true
    },
    refreshToken : {
        type : String
    }
},
{
    timestamps : true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            password : this.password
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
const User = mongoose.model("User",userSchema);

module.exports = { User }