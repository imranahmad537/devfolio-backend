const mongoose = require('mongoose');

const marqueeTextSchema = new mongoose.Schema({
    text: { type: String, default: "Let's work together. Let's work together. Let's work together. " },
}, { timestamps: true });

module.exports = mongoose.model('MarqueeText', marqueeTextSchema);
