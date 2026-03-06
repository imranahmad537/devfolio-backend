const HeroContent = require('../models/heroContentModel');

// GET /api/hero
exports.getHero = async (req, res, next) => {
    try {
        let hero = await HeroContent.findOne();
        if (!hero) hero = await HeroContent.create({});
        res.json({ success: true, data: hero });
    } catch (err) { next(err); }
};

// PUT /api/hero  (auth)
exports.updateHero = async (req, res, next) => {
    try {
        const allowed = ['name', 'title', 'headline', 'subheadline', 'profileImage', 'ctaPrimary', 'ctaSecondary', 'logos'];
        const update = {};
        allowed.forEach(f => { if (req.body[f] !== undefined) update[f] = req.body[f]; });

        // Parse logos if it's sent as a stringified JSON array
        if (typeof update.logos === 'string') {
            try { update.logos = JSON.parse(update.logos); } catch (e) { }
        }

        // Handle profile image uploaded via multipart
        if (req.file) update.profileImage = `/uploads/images/${req.file.filename}`;

        let hero = await HeroContent.findOneAndUpdate({}, { $set: update }, { new: true, upsert: true });
        res.json({ success: true, data: hero });
    } catch (err) { next(err); }
};
