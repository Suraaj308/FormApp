// src/pages/DashboardPage.js
import { useState, useMemo } from "react";
import EmployeeForm from "../components/EmployeeForm";
import "../styles/DashboardPage.css";

function DashboardPage() {
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      fullName: "John Doe",
      gender: "Male",
      dob: "1990-05-15",
      state: "California",
      active: true,
    },
    {
      id: "EMP002",
      fullName: "Jane Smith",
      gender: "Female",
      dob: "1995-08-22",
      state: "Texas",
      active: false,
    },
    {
      id: "EMP003",
      fullName: "Alex Rivera",
      gender: "Non-binary",
      dob: "1988-12-10",
      state: "New York",
      active: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Derived stats (based on full list, not filtered)
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp) => emp.active).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  // Filtered employees using useMemo for performance
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch = emp.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesGender =
        genderFilter === "All" || emp.gender === genderFilter;

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && emp.active) ||
        (statusFilter === "Inactive" && !emp.active);

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, searchTerm, genderFilter, statusFilter]);

  // Handlers
  const handleSaveEmployee = (employeeData, editId = null) => {
    if (editId) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editId ? { ...emp, ...employeeData } : emp
        )
      );
    } else {
      const newId = `EMP${String(employees.length + 1).padStart(3, "0")}`;
      setEmployees([...employees, { id: newId, ...employeeData }]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEmployeeToEdit(null);
  };

  const openAddModal = () => {
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Summary */}
      <section className="summary-section">
        <h2>Dashboard Summary</h2>
        <div className="summary-cards">
          <div className="card">
            <h3>Total Employees</h3>
            <p>{totalEmployees}</p>
          </div>
          <div className="card active">
            <h3>Active</h3>
            <p>{activeEmployees}</p>
          </div>
          <div className="card inactive">
            <h3>Inactive</h3>
            <p>{inactiveEmployees}</p>
          </div>
        </div>
      </section>

      {/* Employee List */}
      <section className="employee-list-section">
        <div className="section-header">
          <h2>Employee List</h2>
          <button className="add-btn" onClick={openAddModal}>
            + Add Employee
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search by Full Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-wrapper">
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Status</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* Employee Table */}
        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>State</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    {employees.length === 0
                      ? "No employees yet. Add one!"
                      : "No employees match your search/filter."}
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.fullName}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.dob}</td>
                    <td>{emp.state}</td>
                    <td>
                      <span
                        className={`status ${emp.active ? "active" : "inactive"}`}
                      >
                        {emp.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(emp)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(emp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reusable Modal Form */}
      <EmployeeForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveEmployee}
        employeeToEdit={employeeToEdit}
      />
    </div>
  );
}

export default DashboardPage;