const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    category: { type: String, default: 'General' },
    date: { type: Date, default: Date.now },
    link: { type: String, default: '#' },
    published: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
