require('dotenv').config()
const app = require('./app');
const connectDB = require('./db/index.js');

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is active on ${process.env.PORT}`);
        })
        app.on("Error", (error) => {
            console.log("ERROR : " + error);
            throw error;
        })
    })
    .catch((err) => {
        console.log("Mongo DB connection failure !!! : ", err);
    })



// ;(async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("Error",(error)=>{
//             console.log("ERROR : "+error);
//         throw err
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`Server is active on ${process.env.PORT}`);
//         })
//     }
//     catch(error){
//         console.log("ERROR : "+error);
//         throw err
//     }
// })()