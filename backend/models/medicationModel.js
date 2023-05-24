const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    }
});

const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication