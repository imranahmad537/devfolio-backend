const Contact = require('../models/contactModel');
const Message = require('../models/messageModel');
const nodemailer = require('nodemailer');

exports.get = async (req, res, next) => {
    try {
        let doc = await Contact.findOne();
        if (!doc) doc = await Contact.create({});
        res.json({ success: true, data: doc });
    } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
    try {
        const doc = await Contact.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json({ success: true, data: doc });
    } catch (err) { next(err); }
};

exports.submitContact = async (req, res, next) => {
    try {
        const { name, email, services, otherService, message } = req.body;

        // Save to DB
        const newMessage = await Message.create({
            name, email, services, otherService, message
        });

        // Send Email via Nodemailer
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Standard fallback, user can configure
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER, // Admin email
                subject: `New Contact Form Submission from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nServices: ${services?.join(', ') || 'None'}\nOther Service: ${otherService || 'N/A'}\nMessage:\n${message}`
            };

            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                await transporter.sendMail(mailOptions);
                console.log("Email sent successfully!");
            } else {
                console.log("Nodemailer is not configured fully. Saved message to DB successfully.");
            }
        } catch (emailErr) {
            console.error("Nodemailer Error: User needs to configure EMAIL_USER and EMAIL_PASS properly", emailErr.message);
            // Don't fail the request if email fails, as long as it's saved in DB
        }

        res.status(201).json({ success: true, data: newMessage, message: "Message sent successfully" });
    } catch (err) {
        next(err);
    }
};

exports.getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find().sort('-createdAt');
        res.json({ success: true, data: messages });
    } catch (err) { next(err); }
};

exports.deleteMessage = async (req, res, next) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Message deleted' });
    } catch (err) { next(err); }
};

exports.updateMessageStatus = async (req, res, next) => {
    try {
        const doc = await Message.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json({ success: true, data: doc });
    } catch (err) { next(err); }
};

