import React, { useState, useEffect } from "react";
import axios from "axios";

const MedicationUpdateForm = ({
  medication_id,
  medication_name,
  medication_frequency,
  medication_reason,
}) => {
  const [name, setName] = useState(medication_name);
  const [frequency, setFrequency] = useState(medication_frequency);
  const [reason, setReason] = useState(medication_reason);
  const apiUrl = process.env.API_URL;

  useEffect(() => {
    setName(medication_name);
    setFrequency(medication_frequency);
    setReason(medication_reason);
  }, [medication_name, medication_frequency, medication_reason]);

  const handleMedicationUpdate = async () => {
    event.preventDefault();
    const data = {
      name: name,
      frequency: frequency,
      reason: reason,
      medication_id: medication_id,
    };
    try {
      await axios.post(apiUrl + `doctor/update_medication`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("udated successfully");
      // setMedication((prevMedication) =>
      //   prevMedication.map((med) =>
      //     med._id === medicationId ? updatedMedication : med
      //   )
      // );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleMedicationUpdate}>
      <h2>Update Medication</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Frequency:
        <input
          type="text"
          name="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
      </label>
      <label>
        Reason:
        <input
          type="text"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </label>
      <div>
        <button type="submit">Update</button>
        {/* <button type="button" onClick={onClose}>
          Cancel
        </button> */}
      </div>
    </form>
  );
};
export default MedicationUpdateForm;
