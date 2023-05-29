import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

const MedicationAddForm = (props) => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [reason, setReason] = useState("");
  const apiUrl = process.env.API_URL;

  const toast = useRef(null);

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Medication Updated",
      detail: formik.values.value,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      frequency: "",
      reason: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Required field";
      }

      if (!data.frequency) {
        errors.frequency = "Required field";
      }

      if (!data.reason) {
        errors.reason = "Required field";
      }

      return errors;
    },
    onSubmit: async (data) => {
      event.preventDefault();
      const updatedData = {
        name: data.name,
        frequency: data.frequency,
        reason: data.reason,
        patient_id: props.patient_id,
      };
      try {
        await axios.post(apiUrl + `doctor/add_medication`, updatedData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        data && show(data);
        props.handleUpdateCallBack();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className="card flex justify-content-center form">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-column gap-2 update-form"
      >
        <span className="p-float-label form-element">
          <Toast ref={toast} />
          <InputText
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className={classNames({ "p-invalid": isFormFieldInvalid("name") })}
          />
          <label htmlFor="name">Name</label>
        </span>
        {getFormErrorMessage("name")}

        <span className="p-float-label form-element">
          <InputText
            id="frequency"
            name="frequency"
            value={formik.values.frequency}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldInvalid("frequency"),
            })}
          />
          <label htmlFor="frequency">Frequency</label>
        </span>
        {getFormErrorMessage("frequency")}

        <span className="p-float-label form-element">
          <InputText
            id="reason"
            name="reason"
            value={formik.values.reason}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldInvalid("reason"),
            })}
          />
          <label htmlFor="reason">Reason</label>
        </span>
        {getFormErrorMessage("reason")}

        <div className="upload-form-submit">
          <Button
            type="submit"
            label="Add Medication"
            className="form-element submit-button"
            style={{ backgroundColor: "#FF0000" }}
          />
        </div>
        <Button
          type="submit"
          label="Go Back"
          className="submit-button"
          onClick={props.handleCancelCallBack}
          style={{ backgroundColor: "#FF0000" }}
        />
      </form>
    </div>
  );
};

export default MedicationAddForm;
