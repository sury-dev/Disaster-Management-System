const User = require('../models/users');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Signup logic
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Check if any field is missing
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = await User.create({ name, email, password, role });

        // Return response with user info and token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// Login logic
exports.login = async (req, res) => {
    const { email, password, role } = req.body; // Include role in the request body

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        // Check if user exists and password matches
        if (user && (await user.matchPassword(password))) {
            // Check if the provided role matches the user's role
            if (user.role !== role) {
                return res.status(401).json({ message: 'Role does not match' });
            }

            // Return response with user info and token
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error logging in' });
    }
};
