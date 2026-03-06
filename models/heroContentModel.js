const mongoose = require('mongoose');

const heroContentSchema = new mongoose.Schema({
    name: { type: String, default: 'Imran Ahmad' },
    title: { type: String, default: 'Software Developer' },
    headline: { type: String, default: 'Build. Launch. Scale. Without the complexity.' },
    subheadline: { type: String, default: 'I specialize in building high-performance, scalable web applications that help businesses ship fast and grow without limits.' },
    profileImage: { type: String, default: '/prpic.jpeg' },
    ctaPrimary: { type: String, default: 'Have a Problem' },
    ctaSecondary: { type: String, default: "See What I've Built" },
    logos: [{ url: String, alt: String }],
}, { timestamps: true });

module.exports = mongoose.model('HeroContent', heroContentSchema);
