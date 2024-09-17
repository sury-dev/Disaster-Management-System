const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email :{
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true,
        index : true
    },
    fullName :{
        type : String,
        required : true,
        trim : true,
    },
    profilePhoto : {
        type : String,
        required : true,
        reuired : true
    },
    password : {
        type : String,
        required : [true , "Password is required"]
    },
    refreshToken : {
        type : String
    }
},
{
    timestamps : true
})

adminSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
})

adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.generateAccessToken = async function(){
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
adminSchema.methods.generateRefreshToken = async function(){
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

export const Admin = mongoose.model("Admin",adminSchema);