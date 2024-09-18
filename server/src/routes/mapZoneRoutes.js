const express = require('express');
const router = express.Router();
const Zone = require('../models/Zones'); // Make sure the model is correctly named

// Create a new zone
router.post('/zones', async (req, res) => {
    // try {
        const { latitude, longitude, radius, message, riskLevel, color } = req.body;
        console.log(req.body);

        if (!latitude || !longitude || !radius || !message || !riskLevel || !color) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new zone instance
        const newZone = new Zone({
            latitude,
            longitude,
            radius,
            message,
            riskLevel,
            color
        });
        console.log(newZone);

        // Save the zone to the database
        const savedZone = await newZone.save();

        // Respond with the created zone
        res.status(201).json(savedZone);
    // } catch (error) {
    //     console.error('Error:', error);
    //     res.status(400).json({ message: 'Error creating zone', error });
    // }
});

// Get all zones
router.get('/zones', async (req, res) => {
    try {
        const zones = await Zone.find(); // Updated from Zones.find() to Zone.find()
        const formattedZones = zones.map(zone => ({
            latitude: parseFloat(zone.latitude),
            longitude: parseFloat(zone.longitude),
            radius: parseFloat(zone.radius),
            message: zone.message,
            riskLevel: zone.riskLevel,
            color: zone.color || '#0000ff' // Ensure default color if needed
        }));
        res.json(formattedZones);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching zones', error });
    }
});


// Get a zone by ID
router.get('/zones/:id', async (req, res) => {
    try {
        const zoneId = req.params.id;

        // Fetch a single zone by ID
        const zone = await Zone.findById(zoneId);

        if (!zone) {
            return res.status(404).json({ message: 'Zone not found' });
        }

        // Respond with the zone details
        res.status(200).json(zone);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching zone', error });
    }
});

// Update a zone by ID
router.put('/zones/:id', async (req, res) => {
    try {
        const zoneId = req.params.id;
        const { latitude, longitude, radius, message, riskLevel, color } = req.body;

        // Update the zone with the new data
        const updatedZone = await Zone.findByIdAndUpdate(
            zoneId,
            { latitude, longitude, radius, message, riskLevel, color },
            { new: true } // Return the updated document
        );

        if (!updatedZone) {
            return res.status(404).json({ message: 'Zone not found' });
        }

        // Respond with the updated zone
        res.status(200).json(updatedZone);
    } catch (error) {
        res.status(400).json({ message: 'Error updating zone', error });
    }
});

// Delete a zone by ID
router.delete('/zones/:id', async (req, res) => {
    try {
        const zoneId = req.params.id;

        // Remove the zone from the database
        const deletedZone = await Zone.findByIdAndDelete(zoneId);

        if (!deletedZone) {
            return res.status(404).json({ message: 'Zone not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Zone deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting zone', error });
    }
});

module.exports = router;