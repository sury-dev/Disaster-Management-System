const mongoose = require('mongoose');
const {DB_NAME} =require("../constants.js");

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
    }
    catch(err){
        
        console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MongoDB connection Error : ", err);
        process.exit(1);
    }
}

module.exports = connectDB;
