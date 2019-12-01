const mongoose =require('mongoose');
const { Schema } = mongoose;
const autoIncrement = require('mongoose-sequence')(mongoose);

const selectedCandidate = new Schema([{
    vacancyId: Number,
    candidate: [{
        emailAddress: String,
        fullName: String,
        phone: String,
        isSent: { type: Boolean, default: false },
        candidateId:{type:Number},
        _id: false
    }]
}]);
selectedCandidate.plugin(autoIncrement,{
    inc_field: 'candidate.candidateId',
    start_seq:101
});

module.exports = {selectedCandidate};
