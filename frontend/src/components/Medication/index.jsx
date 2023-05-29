import React, { useState, useEffect } from "react";
import axios from "axios";
import MedicationUpdateForm from "../UpdateMedication";
import MedicationAddForm from "../AddMedication";

import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";

const PatientMedication = (
  props,
  { patient_id, patient_name, doctor_email }
) => {
  const [medication, setMedication] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [medicationName, setMedicationName] = useState("");
  const [medicationFrequency, setMedicationFrequency] = useState("");
  const [medicationReason, setMedicationReason] = useState("");
  const [medicationId, setMedicationId] = useState("");
  const [patientEmail, setPatientEmail] = useState("");

  const apiUrl = process.env.API_URL;
  useEffect(() => {
    const fetchPatientMedication = async () => {
      try {
        const response = await axios.get(
          apiUrl + `doctor/get_patient_medication/${props.patient_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPatientEmail(response.data.patient_email);
        setMedication(response.data.medications);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatientMedication();
  }, [props.patient_id]);

  const updateCallback = async () => {
    try {
      const response = await axios.get(
        apiUrl + `doctor/get_patient_medication/${props.patient_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMedication(response.data.medications);
      setShowUpdateForm(false);
      setShowAddForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelCallBack = () => {
    setShowUpdateForm(false);
    setShowAddForm(false);
  };

  const handleMedicationDelete = async (medicationId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this medication?"
      );
      if (!confirmed) {
        return;
      }
      const data = {
        patient_id: props.patient_id,
        medication_id: medicationId,
      };
      await axios.post(apiUrl + `doctor/delete_medication`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setMedication((prevMedication) =>
        prevMedication.filter((med) => med._id !== medicationId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMedicationUpdate = async (
    medication_id,
    medication_name,
    medication_frequency,
    medication_reason
  ) => {
    setMedicationName(medication_name);
    setMedicationFrequency(medication_frequency);
    setMedicationReason(medication_reason);
    setMedicationId(medication_id);
    setShowUpdateForm(true);
  };

  const handleAddMedication = () => {
    setShowAddForm(true);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        {!showUpdateForm && !showAddForm && (
          <>
            <div className="medication-header">
              <h2>{props.patient_name} Medication</h2>
              <Button
                icon="pi pi-times"
                rounded
                text
                severity="danger"
                aria-label="Cancel"
                onClick={props.handleClose}
              />
            </div>
            <DataTable
              value={medication}
              className="p-datatable-striped"
              scrollable
              scrollHeight="500px"
              virtualScrollerOptions={{ itemSize: 20 }}
              tableStyle={{ width: "42rem" }}
              sortMode="multiple"
            >
              <Column field="name" header="Name"></Column>
              <Column field="frequency" header="Frequency"></Column>
              <Column field="reason" header="Reason"></Column>
              <Column
                header="Actions"
                body={(rowData) => (
                  <>
                    <Button
                      label="Update"
                      onClick={() =>
                        handleMedicationUpdate(
                          rowData._id,
                          rowData.name,
                          rowData.frequency,
                          rowData.reason
                        )
                      }
                      className="p-mr-2"
                      style={{ backgroundColor: "#FF0000" }}
                    />
                    <span style={{ marginLeft: "8px" }}></span>
                    <Button
                      label="Delete"
                      onClick={() => handleMedicationDelete(rowData._id)}
                      style={{ backgroundColor: "#FF0000" }}
                    />
                  </>
                )}
              ></Column>
            </DataTable>
            <Button
              label="Add Medication"
              icon="pi pi-plus"
              className="add-medication"
              onClick={handleAddMedication}
              style={{
                backgroundColor: "transparent",
                color: "#FF0000",
                borderColor: "#FF0000",
              }}
            />
          </>
        )}
        {showAddForm && (
          <div className="update-form">
            <MedicationAddForm
              handleCancelCallBack={cancelCallBack}
              handleUpdateCallBack={updateCallback}
              patient_id={props.patient_id}
            />
          </div>
        )}

        {showUpdateForm && (
          <div className="update-form">
            <MedicationUpdateForm
              medication_id={medicationId}
              medication_frequency={medicationFrequency}
              medication_name={medicationName}
              medication_reason={medicationReason}
              patient_id={props.patient_id}
              handleUpdateCallBack={updateCallback}
              handleCancelCallBack={cancelCallBack}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMedication;
