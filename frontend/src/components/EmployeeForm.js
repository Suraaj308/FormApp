// src/components/EmployeeForm.js
import { useState, useEffect } from "react";
import "../styles/EmployeeForm.css";

function EmployeeForm({ isOpen, onClose, onSave, employeeToEdit }) {
  const isEditing = !!employeeToEdit;

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "Male",
    dob: "",
    state: "",
    active: true,
    photo: "",
  });

  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    if (isEditing && employeeToEdit) {
      const photoValue = employeeToEdit.photo || "";
      const previewSrc = photoValue.startsWith("data:")
        ? photoValue
        : `/icons/${photoValue}`;

      setFormData({
        fullName: employeeToEdit.fullName || "",
        gender: employeeToEdit.gender || "Male",
        dob: employeeToEdit.dob || "",
        state: employeeToEdit.state || "",
        active: employeeToEdit.active ?? true,
        photo: photoValue,
      });
      setPhotoPreview(previewSrc);
    } else {
      setFormData({
        fullName: "",
        gender: "Male",
        dob: "",
        state: "",
        active: true,
        photo: "",
      });
      setPhotoPreview("");
    }
  }, [employeeToEdit, isEditing, isOpen]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({ ...formData, photo: base64String });
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { ...formData };
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
          {/* Photo Section - Side by Side */}
          <div className="form-group photo-group">
            <label>Employee Photo</label>
            <div className="photo-row">
              <div className="photo-preview-container">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="photo-preview" />
                ) : (
                  <div className="photo-placeholder">No Photo</div>
                )}
              </div>
              <div className="photo-upload-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="photo-input"
                />
                <small>Click to select or replace photo</small>
              </div>
            </div>
          </div>

          {/* Full Name + Gender */}
          <div className="form-row">
            <div className="form-group half">
              <label>Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange("fullName")}
              />
            </div>
            <div className="form-group half">
              <label>Gender</label>
              <select value={formData.gender} onChange={handleChange("gender")}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Date of Birth + State */}
          <div className="form-row">
            <div className="form-group half">
              <label>Date of Birth</label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={handleChange("dob")}
              />
            </div>
            <div className="form-group half">
              <label>State</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={handleChange("state")}
              />
            </div>
          </div>

          {/* Active Checkbox */}
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

          {/* Actions */}
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