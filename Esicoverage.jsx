import { useState } from "react";
import dayjs from "dayjs";
import Breadcrump from "../../Layout/UI/Breadcrump";
 
export default function ESICoverage() {
  const [location, setLocation] = useState("All Locations");
  const [department, setDepartment] = useState("All Departments");
  const [costCenter, setCostCenter] = useState("All Cost Centers");
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [summary, setSummary] = useState("");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [esiDeducted, setEsiDeducted] = useState(0);
 
  // 🔹 Format month like "NOV-2025"
  const formattedMonth = currentMonth.format("MMM-YYYY").toUpperCase();
 
  // 🔹 Month navigation handlers
  const handlePrevMonth = () => setCurrentMonth((prev) => prev.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth((prev) => prev.add(1, "month"));
 
  // 🔹 View button (updates values dynamically)
  const handleView = () => {
    // Randomize values each time to simulate report
    const total = Math.floor(Math.random() * 50) + 10; // between 10–60
    const deducted = Math.floor(Math.random() * total);
 
    setTotalEmployees(total);
    setEsiDeducted(deducted);
    setSummary(`📊 ESI Coverage report for ${formattedMonth} is displayed.`);
  };
 
  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrump
        items={[
          { label: "Reports", link: "/Reports/Statutory Reports" },
          { label: "Statutory Reports", link: "/Statutory Reports/ESI Coverage" },
          { label: "ESI Coverage", active: true },
        ]}
      />
 
      {/* Header */}
      <div className="mt-3">
        <h3 className="mb-1 title">
          ESI Coverage
        </h3>
        <p
          className="text-muted mb-3"
          style={{ fontSize: "13.2px",  }}
        >
          View ESI coverage for employees based on eligibility level options
        </p>
        <hr className="mb-3" />
      </div>
 
      {/* Filters */}
      <div className="row mb-3 align-items-center">
        <div className="row mb-1">
          <div className="col-md-2">
            <label
              className="form-label"
              style={{ fontSize: "12.25px", fontWeight: "600", width: "110px" }}
            >
              Location
            </label>
            <select
              className="form-select"
              style={{
                fontSize: "13px",
                paddingRight: "8px",
                fontWeight: "600",
                width: "165px",
                paddingLeft: "8px",
              }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>All Locations</option>
              <option>Hyderabad</option>
              <option>Chennai</option>
            </select>
          </div>
 
          <div className="col-md-2">
            <label
              className="form-label"
              style={{ fontSize: "12.25px", fontWeight: "600", width: "110px" }}
            >
              Cost Center
            </label>
            <select
              className="form-select"
              style={{
                fontSize: "13px",
                paddingRight: "8px",
                fontWeight: "600",
                width: "165px",
                paddingLeft: "8px",
              }}
              value={costCenter}
              onChange={(e) => setCostCenter(e.target.value)}
            >
              <option>All Cost Centers</option>
              <option>Cost Center 1</option>
            </select>
          </div>
 
          <div className="col-md-2">
            <label
              className="form-label"
              style={{ fontSize: "12.25px", fontWeight: "600", width: "110px" }}
            >
              Departments
            </label>
            <select
              className="form-select"
              style={{
                fontSize: "13px",
                paddingRight: "8px",
                fontWeight: "600",
                width: "165px",
                paddingLeft: "8px",
              }}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>All Departments</option>
              <option>Department 1</option>
            </select>
          </div>
        </div>
      </div>
 
      {/* Month Navigation & View Button */}
      <div className="d-flex my-3 align-items-center">
        <div className="d-flex align-items-center gap-2 mb-3 mt-3">
          <div className="input-group" style={{ width: "210px" }}>
            <button
              className="btn btn-secondary btn-dm"
              type="button"
              onClick={handlePrevMonth}
            >
              <i className="fe fe-arrow-left-circle"></i>
            </button>
            <input
              type="text"
              className="form-control text-center fw-semibold form-control"
              value={formattedMonth}
              readOnly
              style={{ backgroundColor: "#f8f9fa" }}
            />
            <button
              className="btn btn-secondary btn-dm"
              type="button"
              onClick={handleNextMonth}
            >
              <i className="fe fe-arrow-right-circle"></i>
            </button>
          </div>
 
          <button className="btn btn-secondary btn-dm mx-2" onClick={handleView}>
            <i className="bi-eye mx-1"></i> View
          </button>
        </div>
      </div>
 
      {/* Summary Message */}
      {summary && (
        <p className="text-success fw-semibold">{summary}</p>
      )}
 
      {/* Stats Card */}
      <div className="card p-4 w-100 mb-3">
        <div className="w-50 d-flex m-auto justify-content-between">
          <div className="text-center">
            <h4 style={{  }}>Total Employees</h4>
            <h4 className="text-info fw-bold">{totalEmployees}</h4>
          </div>
          <div className="text-center">
            <h4 style={{  }}>ESI Deducted</h4>
            <h4 className="text-success fw-bold">{esiDeducted}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
 
 