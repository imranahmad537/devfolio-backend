const Experience = require('../models/experienceModel');

exports.getAll = async (req, res, next) => {
    try { res.json({ success: true, data: await Experience.find().sort('order') }); }
    catch (err) { next(err); }
};
exports.create = async (req, res, next) => {
    try {
        const data = { ...req.body };
        if (req.file) data.logo = `/uploads/images/${req.file.filename}`;
        res.status(201).json({ success: true, data: await Experience.create(data) });
    } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
    try {
        const data = { ...req.body };
        if (req.file) data.logo = `/uploads/images/${req.file.filename}`;
        const item = await Experience.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: item });
    } catch (err) { next(err); }
};
exports.remove = async (req, res, next) => {
    try { await Experience.findByIdAndDelete(req.params.id); res.json({ success: true, message: 'Deleted' }); }
    catch (err) { next(err); }
};
