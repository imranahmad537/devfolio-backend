const mongoose = require('mongoose');

const techStackSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    iconUrl: { type: String, required: true },
    category: { type: String, default: 'General' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('TechStack', techStackSchema);
