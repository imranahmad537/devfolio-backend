const Project = require('../models/projectModel');

exports.getAll = async (req, res, next) => {
    try {
        const filter = req.query.all === 'true' ? {} : { published: true };
        res.json({ success: true, data: await Project.find(filter).sort('order') });
    } catch (err) { next(err); }
};
exports.getOne = async (req, res, next) => {
    try {
        const item = await Project.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: item });
    } catch (err) { next(err); }
};
exports.create = async (req, res, next) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            const base64Str = req.file.buffer.toString('base64');
            data.bgimg = `data:${req.file.mimetype};base64,${base64Str}`;
        }
        res.status(201).json({ success: true, data: await Project.create(data) });
    } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            const base64Str = req.file.buffer.toString('base64');
            data.bgimg = `data:${req.file.mimetype};base64,${base64Str}`;
        }
        const item = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: item });
    } catch (err) { next(err); }
};
exports.remove = async (req, res, next) => {
    try { await Project.findByIdAndDelete(req.params.id); res.json({ success: true, message: 'Deleted' }); }
    catch (err) { next(err); }
};
