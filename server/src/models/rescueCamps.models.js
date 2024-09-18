const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const rescueCampSchema = new Schema({
    campImage: {
        type : String
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    capacity: {
        type: Number, // Maximum number of people the camp can accommodate
        required: true
    },
    currentOccupancy: {
        type: Number, // Number of people currently in the camp
        default: 0
    },
    water: {
        type: Number,
        default: 0 // Liters of water available
    },
    food: {
        type: Number,
        default: 0 // Number of food packages available
    },
    medicalSupplies: {
        type: Number,
        default: 0 // Number of medical kits or supplies
    },
    blankets: {
        type: Number,
        default: 0 // Number of blankets available
    },
    tents: {
        type: Number,
        default: 0 // Number of tents available
    },
    otherResources: {
        type: String // Any additional resources or notes
    },
    campManagerName: {
        type: String,
        required: true
    },
    campManagerContact: {
        type: String,
        required: true // Phone or email for the camp manager
    },
    establishedDate: {
        type: Date,
        default: Date.now // Date the camp was set up
    },
    status: {
        type: String,
        enum: ['Operational', 'Closed', 'Under Maintenance'],
        default: 'Operational'
    },
    notes: {
        type: String, // Additional information about the camp
        trim: true
    },
    // Authentication fields
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Pre-save hook to hash the password before saving to the database
rescueCampSchema.pre('save', async function(next) {
    const camp = this;

    if (camp.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        camp.password = await bcrypt.hash(camp.password, salt);
    }

    next();
});

// Method to compare entered password with the hashed password
rescueCampSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

rescueCampSchema.methods.generateAccessToken = async function(){
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
rescueCampSchema.methods.generateRefreshToken = async function(){
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

const RescueCamp = mongoose.model('RescueCamp', rescueCampSchema);
module.exports = {RescueCamp}