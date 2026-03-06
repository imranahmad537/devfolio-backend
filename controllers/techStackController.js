const TechStack = require('../models/techStackModel');

exports.getAll = async (req, res, next) => {
    try { res.json({ success: true, data: await TechStack.find().sort('order') }); }
    catch (err) { next(err); }
};
exports.create = async (req, res, next) => {
    try { res.status(201).json({ success: true, data: await TechStack.create(req.body) }); }
    catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
    try {
        const item = await TechStack.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: item });
    } catch (err) { next(err); }
};
exports.remove = async (req, res, next) => {
    try { await TechStack.findByIdAndDelete(req.params.id); res.json({ success: true, message: 'Deleted' }); }
    catch (err) { next(err); }
};
