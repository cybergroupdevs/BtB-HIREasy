const { Schema } = require("mongoose");

exports.selectedCandidate = new Schema([{
    vacancyId: Number,
    candidate: [{
        emailAddress: String,
        fullName: String,
        phone: String,
        isSent: { type: Boolean, default: false },
        _id: false
    }]
}]);
