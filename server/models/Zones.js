const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a zone
const zoneSchema = new Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    radius: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    riskLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High'], // Valid risk levels
        default: 'Low',
    },
    color: {
        type: String,
        default: '#0000ff',
    }
});


// Create the model from the schema
module.exports = mongoose.model('Zone', zoneSchema);

