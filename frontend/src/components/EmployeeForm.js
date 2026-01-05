// src/components/EmployeeForm.js
import { useState, useEffect } from "react";
import "../styles/EmployeeForm.css"; // We'll update the CSS name too

function EmployeeForm({ isOpen, onClose, onSave, employeeToEdit }) {
  // Determine if we're in "edit" or "add" mode
  const isEditing = !!employeeToEdit;

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "Male",
    dob: "",
    state: "",
    active: true,
  });

  // When employeeToEdit changes (or modal opens), populate form
  useEffect(() => {
    if (isEditing && employeeToEdit) {
      setFormData({
        fullName: employeeToEdit.fullName,
        gender: employeeToEdit.gender,
        dob: employeeToEdit.dob,
        state: employeeToEdit.state,
        active: employeeToEdit.active,
      });
    } else {
      // Reset for "Add" mode
      setFormData({
        fullName: "",
        gender: "Male",
        dob: "",
        state: "",
        active: true,
      });
    }
  }, [employeeToEdit, isEditing, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      fullName: formData.fullName,
      gender: formData.gender,
      dob: formData.dob,
      state: formData.state,
      active: formData.active,
    };

    // Pass data + original ID if editing
    onSave(employeeData, employeeToEdit?.id);

    onClose();
  };

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isEditing ? "Edit Employee" : "Add New Employee"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange("fullName")}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select value={formData.gender} onChange={handleChange("gender")}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              required
              value={formData.dob}
              onChange={handleChange("dob")}
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              required
              value={formData.state}
              onChange={handleChange("state")}
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={formData.active}
                onChange={handleChange("active")}
              />
              Active
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {isEditing ? "Update Employee" : "Save Employee"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;