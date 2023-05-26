const { Router } = require("express")

const { get_patients, get_patient_medication, add_medication, delete_medication, update_medication } = require("../controllers/doctor.controllers")
const router = Router()

router.get('/get_patients', get_patients)
router.get('/get_patient_medication/:patient_id', get_patient_medication)
router.post('/add_medication', add_medication)
router.post('/delete_medication', delete_medication)
router.post('/update_medication', update_medication)


module.exports = router