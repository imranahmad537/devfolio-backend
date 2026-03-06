const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    bgimg: { type: String, required: true },
    description: { type: String, required: true },
    gradient: { type: String, default: 'from-blue-600/40 via-black/50 to-black/80' },
    link: { type: String, default: '#' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
