import "../Admin/index.css";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PatientMedication from "../Medication";

import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [patientName, setPatientName] = useState(null);

  const apiUrl = process.env.API_URL;
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(apiUrl + "doctor/get_patients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        setUsers(response.data.patients);
        localStorage.setItem("admin_name", response.data.admin_name);
      } catch (e) {
        if (e.response.data.detail.access === "denied") {
          navigate("/");
        }
      }
    };
    getUsers();
  }, []);

  const get_patient_medication = (id, name) => {
    setShowPopup(true);
    setPatientId(id);
    setPatientName(name);
  };

  return (
    <div className="display-users">
      <h1>Users</h1>
      <div className="card" style={{ padding: "0rem" }}>
        <DataTable
          value={users}
          scrollable
          scrollHeight="400px"
          virtualScrollerOptions={{ itemSize: 46 }}
          tableStyle={{ minWidth: "50rem" }}
          sortMode="multiple"
        >
          <Column
            field="name"
            header="Name"
            style={{ width: "20%" }}
            sortable
            headerStyle={{
              backgroundColor: "#FF0000",
              color: "white",
            }}
          ></Column>
          <Column
            field="email"
            header="email"
            sortable
            style={{ width: "20%" }}
            headerStyle={{ backgroundColor: "#FF0000", color: "white" }}
          ></Column>
          <Column
            header="Files"
            style={{ width: "20%" }}
            body={(rowData) => (
              <Button
                label="Get Medication"
                onClick={() =>
                  get_patient_medication(rowData._id, rowData.name)
                }
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderColor: "white",
                }}
              />
            )}
            headerStyle={{ backgroundColor: "#FF0000", color: "white" }}
          />
        </DataTable>
        {showPopup && patientId && (
          <PatientMedication
            patient_id={patientId}
            patient_name={patientName}
          />
        )}
      </div>
    </div>
  );
};
export default DisplayUsers;
