const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    treat: {
        type: String,
        required: true,
    },
});

const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication