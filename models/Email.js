const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    from: String,
    to: String,
    subject: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Email', EmailSchema);
