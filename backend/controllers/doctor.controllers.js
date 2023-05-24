const Medication = require('../models/medicationModel')
const User = require('../models/userModel')

exports.get_patients = async (req, res) => {
    try {
        const doctor_id = req.user._id
        console.log(doctor_id)
        const patients = await User.findById(doctor_id).populate('patient', '-password -role -__v -patient -medication')
        return res.status(200).json({ patients: patients.patient })

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

exports.get_patient_medication = async (req, res) => {
    try {
        user_id = req.params.patient_id
        patient = await User.findById(user_id).populate('medication', "-__v")
        return res.status(200).json({ medications: patient.medication })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

exports.add_medication = async (req, res) => {
    try {
        const { name, frequency, reason, patient_id } = req.body
        console.log(name, frequency, reason, patient_id)
        const medication = new Medication()
        medication.name = name
        medication.frequency = frequency
        medication.reason = reason
        await medication.save()
        const patient = await User.findById(patient_id);

        patient.medication.push(medication);
        await patient.save();
        return res.status(200).json({
            message: "medication added successfully",
            success: true
        })

    } catch (e) {
        res.status(500).json({ error: e.message })

    }
}
