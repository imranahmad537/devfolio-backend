const MarqueeText = require('../models/marqueeTextModel');

exports.get = async (req, res, next) => {
    try {
        let doc = await MarqueeText.findOne();
        if (!doc) doc = await MarqueeText.create({});
        res.json({ success: true, data: doc });
    } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
    try {
        const doc = await MarqueeText.findOneAndUpdate({}, { text: req.body.text }, { new: true, upsert: true });
        res.json({ success: true, data: doc });
    } catch (err) { next(err); }
};
