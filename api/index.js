const app = require('../app');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    // Fast-path for CORS preflight
    if (req.method === 'OPTIONS') {
        return app(req, res);
    }

    // Ensure DB connection is active before processing the request in a serverless environment
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.MONGO_URI || '', {
                serverSelectionTimeoutMS: 5000, // Fail fast if DB down
                bufferCommands: false, // Turn off buffering in serverless
            });
            console.log('✅ Serverless MongoDB connected');
        } catch (error) {
            console.error('❌ Serverless MongoDB connection error:', error);
            // Return 500 early if DB is dead, so we know exactly it's DB error
            return res.status(500).json({ message: 'Database connection failed', error: error.message });
        }
    } else if (mongoose.connection.readyState !== 1) {
        // Wait for connection to be ready if it's currently connecting (readyState 2)
        try {
            await mongoose.connection.asPromise();
        } catch (error) {
            console.error('❌ Serverless MongoDB connection promise error:', error);
            return res.status(500).json({ message: 'Database connection failed during pending state', error: error.message });
        }
    }

    return app(req, res);
};
