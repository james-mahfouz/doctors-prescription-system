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

exports.delete_medication = async (req, res) => {
    try {
        const { patient_id, medication_id } = req.body

        patient = await User.findById(patient_id)
        patient.medication.pull(medication_id);
        await patient.save();

        await Medication.findByIdAndRemove(medication_id);

        res.status(200).json({ message: 'Medication deleted successfully' });

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

exports.update_medication = async (req, res) => {
    try {
        const { medication_id, name, frequency, reason } = req.body;
        const medication = await Medication.findById(medication_id);

        if (!medication) {
            return res.status(404).json({ error: 'Medication not found' });
        }

        medication.name = name;
        medication.frequency = frequency;
        medication.reason = reason;

        await medication.save();

        return res.json({ message: 'Medication updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};