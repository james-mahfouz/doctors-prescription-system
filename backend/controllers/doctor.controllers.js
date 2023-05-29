const Medication = require('../models/medicationModel')
const User = require('../models/userModel')
const sgMail = require('@sendgrid/mail')

const EMAIL_API_KEY = process.env.EMAIL_API_KEY

const sendEmail = (to, subject, body_message) => {
    sgMail.setApiKey(EMAIL_API_KEY)
    const message = {
        to: to,
        from: "prescribecompany12@gmail.com",
        subject: subject,
        text: body_message,
        html: `<h3>${body_message}</h3>`

    }

    sgMail.send(message)
        .then(response => console.log('Email sent..'))
        .catch(err => console.log(err))
}

exports.get_patients = async (req, res) => {
    try {
        const doctor_id = req.user._id

        const patients = await User.findById(doctor_id).populate('patient', '-password -role -__v -patient -medication')

        return res.status(200).json({
            patients: patients.patient,
            doctor_email: patients.email,
            doctor_name: patients.name
        })

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

exports.get_patient_medication = async (req, res) => {
    try {
        user_id = req.params.patient_id
        patient = await User.findById(user_id).populate('medication', "-__v")
        return res.status(200).json({ medications: patient.medication, patient_email: patient.email })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

exports.add_medication = async (req, res) => {
    try {
        const { name, frequency, reason, patient_id } = req.body
        const medication = new Medication()
        medication.name = name
        medication.frequency = frequency
        medication.reason = reason
        await medication.save()
        const patient = await User.findById(patient_id);

        patient.medication.push(medication);
        await patient.save();
        sendEmail(patient.email, "Medication Added", `Hey, your doctor added the medication "${medication.name}". Please make sure you check it out.`)

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
        const medication = await Medication.findById(medication_id);

        patient.medication.pull(medication_id);
        await patient.save();

        await Medication.findByIdAndRemove(medication_id);
        sendEmail(patient.email, "Medication Deleted", `Hey, your doctor deleted the medication "${medication.name}". Please make sure you check it out.`)
        res.status(200).json({ message: 'Medication deleted successfully' });

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

exports.update_medication = async (req, res) => {
    try {
        const { medication_id, name, frequency, reason, patient_id } = req.body;
        const medication = await Medication.findById(medication_id);

        if (!medication) {
            return res.status(404).json({ error: 'Medication not found' });
        }

        medication.name = name;
        medication.frequency = frequency;
        medication.reason = reason;

        await medication.save();
        patient = await User.findById(patient_id)
        sendEmail(patient.email, "Medication Updated", `Hey, your doctor Updated the medication "${medication.name}". Please make sure you check it out.`)

        return res.json({ message: 'Medication updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

