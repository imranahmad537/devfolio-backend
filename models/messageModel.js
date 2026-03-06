const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    services: { type: [String], default: [] },
    otherService: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, enum: ['New', 'Read', 'Replied'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
