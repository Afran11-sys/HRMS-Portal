import React, { useState } from "react";
import Breadcrump from "../../Layout/UI/Breadcrump";
 
export default function PFCoverage() {
  const [month, setMonth] = useState(new Date()); // current month
  const [summary, setSummary] = useState("");
  const [totalEmployees, setTotalEmployees] = useState(41);
  const [pfDeducted, setPfDeducted] = useState(0);
 
  // Format month like "OCT-2025"
  const formatMonth = (date) => {
    return date
      .toLocaleString("default", { month: "short", year: "numeric" })
      .toUpperCase();
  };
 
  // Handlers for month navigation
  const handlePrev = () => {
    const prevMonth = new Date(month);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setMonth(prevMonth);
  };
 
  const handleNext = () => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setMonth(nextMonth);
  };
 
  // View button logic (updates summary + random data for demo)
  const handleView = () => {
    const newTotal = Math.floor(Math.random() * 50) + 20; // random total employees (20–70)
    const newDeducted = Math.floor(Math.random() * newTotal); // random deducted count
    setTotalEmployees(newTotal);
    setPfDeducted(newDeducted);
 
    setSummary(`📊 PF Coverage report for ${formatMonth(month)} is displayed.`);
  };
 
  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrump
        items={[
          { label: "Reports", link: "/Reports/Statutory Reports" },
          { label: "Statutory Reports", link: "/Statutory Reports/PF Coverage" },
          { label: "PF Coverage", active: true },
        ]}
      />
 
      {/* Title */}
      <div className="mt-3">
        <h3
          className="mb-1 title"
         
        >
          PF Coverage
        </h3>
        <p
          className="text-muted mb-3"
          style={{ fontSize: "13.2px",  }}
        >
          View PF coverage for employees based on eligibility level options
        </p>
        <hr className="mb-3" />
      </div>
 
      {/* Filters */}
      <div className="row mb-3 align-items-center">
        <div className="row mb-1">
          <div className="col-md-2">
            <label
              className="form-label"
              style={{
                fontSize: "12.25px",
                fontWeight: "600",
                width: "110px",
              }}
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
            >
              <option>All Locations</option>
            </select>
          </div>
 
          <div className="col-md-2">
            <label
              className="form-label"
              style={{
                fontSize: "12.25px",
                fontWeight: "600",
                width: "110px",
              }}
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
            >
              <option>All Cost Centers</option>
            </select>
          </div>
 
          <div className="col-md-2">
            <label
              className="form-label"
              style={{
                fontSize: "12.25px",
                fontWeight: "600",
                width: "110px",
              }}
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
            >
              <option>All Departments</option>
            </select>
          </div>
        </div>
      </div>
 
      {/* Month Navigation + Buttons */}
      <div className="d-flex my-3 align-items-center flex-wrap">
        <div className="d-flex align-items-center gap-2 mb-3 mt-3">
          <div className="input-group" style={{ width: "210px" }}>
            <button
              className="btn btn-secondary btn-dm"
              type="button"
              onClick={handlePrev}
            >
              <i className="fe fe-arrow-left-circle"></i>
            </button>
 
            {/* ✅ Current month display */}
            <input
              type="text"
              className="form-control text-center fw-semibold"
              value={formatMonth(month)}
              readOnly
              style={{ backgroundColor: "#f8f9fa" }}
            />
 
            <button
              className="btn btn-secondary btn-dm"
              type="button"
              onClick={handleNext}
            >
              <i className="fe fe-arrow-right-circle"></i>
            </button>
          </div>
 
          <button className="btn btn-secondary btn-dm mx-2" onClick={handleView}>
            <i className="bi-eye mx-1"></i> View
          </button>
        </div>
      </div>
 
      {/* Summary message */}
      {summary && (
        <p className="text-success" style={{ fontWeight: "600" }}>
          {summary}
        </p>
      )}
 
      {/* Summary Card */}
      <div className="card p-4 w-100 shadow-sm">
        <div className="w-75 d-flex m-auto justify-content-between">
          <div className="text-center">
            <h4 style={{  }}>Total Employees</h4>
            <h3 className="text-info fw-bold">{totalEmployees}</h3>
          </div>
          <div className="text-center">
            <h4 style={{ }}>PF Deducted</h4>
            <h3 className="text-success fw-bold">{pfDeducted}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}