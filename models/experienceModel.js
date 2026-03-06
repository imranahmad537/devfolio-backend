const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    logo: { type: String },
    period: { type: String, required: true },
    description: { type: String, required: true },
    large: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
