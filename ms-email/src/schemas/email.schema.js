const mongoose = require('mongoose');
const { Schema } = mongoose;

const selectedCandidate = new Schema({
    vacancyId: Number,
    candidates: [{
        emailAddress: String,
        fullName: String,
        phone: String,
        isSent: { type: Boolean, default: false },
        candidateId: Number
    }]
});

module.exports = { selectedCandidate };
