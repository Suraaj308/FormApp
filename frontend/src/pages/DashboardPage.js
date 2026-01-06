import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import EmployeeForm from "../components/EmployeeForm";
import "../styles/DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      fullName: "Yuji Itadori",
      gender: "Male",
      dob: "1990-05-15",
      state: "California",
      active: true,
      photo: "Yuji_Itadori.jpg",
    },
    {
      id: "EMP002",
      fullName: "Nobara Kugisaki",
      gender: "Female",
      dob: "1995-08-22",
      state: "Texas",
      active: true,
      photo: "Nobara_Kugisaki.jpg",
    },
    {
      id: "EMP003",
      fullName: "Megumi Fushiguro",
      gender: "Male",
      dob: "1988-12-10",
      state: "New York",
      active: false,
      photo: "Megumi_Fushiguro.jpg",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp) => emp.active).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = genderFilter === "All" || emp.gender === genderFilter;
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && emp.active) ||
        (statusFilter === "Inactive" && !emp.active);

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, searchTerm, genderFilter, statusFilter]);

  const handleSaveEmployee = (employeeData, editId = null) => {
    if (editId) {
      setEmployees(employees.map((emp) => (emp.id === editId ? { ...emp, ...employeeData } : emp)));
    } else {
      const newId = `EMP${String(employees.length + 1).padStart(3, "0")}`;
      setEmployees([...employees, { id: newId, ...employeeData }]);
    }
  };

  const handleDelete = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    if (
      window.confirm(
        `Delete employee "${employee.fullName}" (ID: ${employee.id})?\nThis action cannot be undone.`
      )
    ) {
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

  const handleLogout = () => {
    // Clear any runtime-added data (if you later use localStorage)
    // For now, just redirect
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Summary */}
      <section className="summary-section">
        <div className="title">
          <h3>Dashboard Summary</h3>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="cards">
          <div>
            <h3>Total Employees</h3>
            <p>{totalEmployees}</p>
          </div>
          <div>
            <h3>Active Employees</h3>
            <p>{activeEmployees}</p>
          </div>
          <div>
            <h3>Inactive Employees</h3>
            <p>{inactiveEmployees}</p>
          </div>
        </div>
      </section>

      {/* Employee List */}
      <section className="employee-list-section">
        <div className="section-header">
          <h3>Employee List</h3>
          <div className="header-buttons">
            <button className="print-button" onClick={() => window.print()}>
              Print
            </button>
            <button className="add-button" onClick={openAddModal}>
              + Add Employee
            </button>
          </div>
        </div>

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
              <option value="All">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">Status</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>S No</th>
                <th>Employee ID</th>
                <th>Employee Photo</th>
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
                  <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                    {employees.length === 0
                      ? "No employees yet. Add one!"
                      : "No employees match your search/filter."}
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp, index) => (
                  <tr key={emp.id}>
                    <td>{index + 1}</td>
                    <td>{emp.id}</td>
                    <td className="photo-cell">
                      {emp.photo ? (
                        <img
                          src={emp.photo.startsWith("data:") ? emp.photo : `/icons/${emp.photo}`}
                          alt={emp.fullName}
                          className="employee-photo"
                        />
                      ) : (
                        <div className="no-photo">No Photo</div>
                      )}
                    </td>
                    <td>{emp.fullName}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.dob}</td>
                    <td>{emp.state}</td>
                    <td>
                      <span className={`status ${emp.active ? "active" : "inactive"}`}>
                        {emp.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <button className="action-button edit" onClick={() => handleEdit(emp)}>
                        Edit
                      </button>
                      <button className="action-button delete" onClick={() => handleDelete(emp.id)}>
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