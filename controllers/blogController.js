const Blog = require('../models/blogModel');

exports.getAll = async (req, res, next) => {
    try {
        const filter = req.query.all === 'true' ? {} : { published: true };
        res.json({ success: true, data: await Blog.find(filter).sort({ date: -1 }) });
    } catch (err) { next(err); }
};
exports.getOne = async (req, res, next) => {
    try {
        const item = await Blog.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: item });
    } catch (err) { next(err); }
};
exports.create = async (req, res, next) => {
    try {
        const data = { ...req.body, author: req.user.id };
        if (req.file) {
            const base64Str = req.file.buffer.toString('base64');
            data.imageUrl = `data:${req.file.mimetype};base64,${base64Str}`;
        }
        res.status(201).json({ success: true, data: await Blog.create(data) });
    } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
    try {
        const data = { ...req.body };
        if (data.date === '') delete data.date;
        if (req.file) {
            const base64Str = req.file.buffer.toString('base64');
            data.imageUrl = `data:${req.file.mimetype};base64,${base64Str}`;
        }

        // Handle removal of image if imageUrl is empty string and no new file was uploaded
        if (!req.file && data.imageUrl === '') {
            data.imageUrl = '';
        }

        const item = await Blog.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: item });
    } catch (err) { next(err); }
};
exports.remove = async (req, res, next) => {
    try { await Blog.findByIdAndDelete(req.params.id); res.json({ success: true, message: 'Deleted' }); }
    catch (err) { next(err); }
};
