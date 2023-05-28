import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

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

  const toast = useRef(null);

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: formik.values.value,
    });
  };

  useEffect(() => {
    formik.setValues({
      name: medication_name,
      frequency: medication_frequency,
      reason: medication_reason,
    });
  }, [medication_name, medication_frequency, medication_reason]);

  const handleMedicationUpdate = async (event) => {
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
      console.log("updated successfully");
      // setMedication((prevMedication) =>
      //   prevMedication.map((med) =>
      //     med._id === medicationId ? updatedMedication : med
      //   )
      // );
    } catch (error) {
      console.error(error);
    }
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
    onSubmit: (data) => {
      data && show(data);
      formik.resetForm();
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
    <div className="card flex justify-content-center">
      <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
        <span className="p-float-label">
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

        <span className="p-float-label">
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

        <span className="p-float-label">
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

        <Button type="submit" label="Submit" />
      </form>
    </div>
  );
};

export default MedicationUpdateForm;
