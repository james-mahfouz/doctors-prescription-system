const { Router } = require("express")

const { get_patients, get_patient_medication, add_medication } = require("../controllers/doctor.controllers")
const router = Router()

router.get('/get_patients', get_patients)
router.get('/get_patient_medication/:patient_id', get_patient_medication)
router.post('/add_medication', add_medication)


module.exports = router