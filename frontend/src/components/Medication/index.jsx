import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import classNames from "classnames";

const PatientMedication = ({ patient_id, patient_name }) => {
  const [medication, setMedication] = useState([]);
  const apiUrl = process.env.API_URL;

  useEffect(() => {
    const fetchPatientMedication = async () => {
      try {
        const response = await axios.get(
          apiUrl + `doctor/get_patient_medication/${patient_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.medications);
        setMedication(response.data.medications);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientMedication();
  }, [patient_id]);

  const handleMedicationDelete = async (medicationId) => {
    try {
      const data = {
        patient_id: patient_id,
        medication_id: medicationId,
      };
      await axios.delete(apiUrl + `doctor/delete_medication`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Remove the deleted medication from the state
      setMedication((prevMedication) =>
        prevMedication.filter((med) => med.id !== medicationId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMedicationUpdate = async (medicationId, updatedMedication) => {
    try {
      await axios.put(apiUrl + `doctor/update_medication`, updatedMedication, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update the medication in the state
      setMedication((prevMedication) =>
        prevMedication.map((med) =>
          med.id === medicationId ? updatedMedication : med
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  //   scrollable
  //   scrollHeight="400px"
  //   virtualScrollerOptions={{ itemSize: 46 }}
  //   tableStyle={{ minWidth: "50rem" }}
  //   sortMode="multiple"
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{patient_name} Medication</h2>
        <DataTable
          value={medication}
          className="p-datatable-striped"
          scrollable
          scrollHeight="400px"
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
                    handleMedicationUpdate(rowData.id, { ...rowData })
                  }
                  className="p-mr-2"
                />
                <span style={{ marginLeft: "8px" }}></span>
                <Button
                  label="Delete"
                  onClick={() => handleMedicationDelete(rowData.id)}
                />
              </>
            )}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default PatientMedication;
