const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    phone: { type: String, default: '0092 313 1240764' },
    email: { type: String, default: 'itsimran.dev@gmail.com' },
    address: { type: String, default: 'University Road, Peshawar, Pakistan' },
    github: { type: String, default: 'https://github.com/imranahmad537' },
    linkedin: { type: String, default: 'https://www.linkedin.com/in/imran-ahmad99' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
