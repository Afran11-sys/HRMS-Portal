import React, { useState } from "react";
import Breadcrump from "../../Layout/UI/Breadcrump";
 
export default function PFDeduction() {
  const [month, setMonth] = useState(new Date()); // current month
  const [summary, setSummary] = useState("");
  const [reportType, setReportType] = useState("ESI Return");
  const [isChecked, setIsChecked] = useState(false); // ✅ FIXED — added checkbox state
 
  // Format month as "August 2025"
  const formatMonth = (date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };
 
  // Handlers
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
 
  const handleViewSummary = () => {
    setSummary("📊 Viewing summary for " + formatMonth(month));
    alert("Summary Report Opened!");
  };
 
  const handleExcelExport = () => {
    alert("📥 Excel Summary Downloaded for " + formatMonth(month));
  };
 
  const handleReportChange = (e) => {
    setReportType(e.target.value);
    alert(`Selected Report Type: ${e.target.value}`);
  };
 
  return (
    <div>
      <Breadcrump
        items={[
          { label: "Reports", link: "/Reports/Statutory Reports" },
          {
            label: "Statutory Reports",
            link: "/Statutory Reports/PF Deduction",
          },
          { label: "PF Deduction", active: true },
        ]}
      />
 
      <div className="mt-3">
        <h3
          className="mb-1 title"
         
        >
          PF Deduction
        </h3>
        <p
          className="text-muted mb-3"
          style={{ fontSize: "13.2px",  }}
        >
          View or download PF deduction for a period and PF ECR File.
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
            >
              <option>All Locations</option>
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
            >
              <option>All Cost Centers</option>
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
            >
              <option>All Departments</option>
            </select>
          </div>
 
          <div className="col-md-2">
            <label
              className="form-label"
              style={{ fontSize: "12.25px", fontWeight: "600" }}
            >
              Option <i className="bi-info-circle-fill text-info"></i>
            </label>
 
            {/* Checkbox placed BELOW the label */}
            <div className="form-check mt-1">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                id="ignoreNCP"
              />
              <label className="form-check-label" htmlFor="ignoreNCP">
                Ignore NCP Days
              </label>
            </div>
          </div>
        </div>
      </div>
 
      {/* Buttons */}
      <div className="d-flex my-3 align-items-center flex-wrap">
        <div className="d-flex align-items-center gap-2 mb-3 mt-3">
          <div className="input-group" style={{ width: "210px" }}>
            <button
              className="btn btn-secondary "
              type="button"
              onClick={handlePrev}
            >
              <i className="fe fe-arrow-left-circle"></i>
            </button>
            <input
              type="text"
              className="form-control text-center fw-semibold form-control"
              value={formatMonth(month)}
              readOnly
              style={{ backgroundColor: "#f8f9fa" }}
            />
            <button
              className="btn btn-secondary "
              type="button"
              onClick={handleNext}
            >
              <i className="fe fe-arrow-right-circle"></i>
            </button>
          </div>
 
          <button
            className="btn btn-secondary  mx-2"
            onClick={handleViewSummary}
          >
            <i className="bi-table mx-1"></i> View Summary
          </button>
 
          <button
            className="btn btn-secondary  mx-2"
            onClick={handleExcelExport}
          >
            <i className="bi-file-earmark-excel-fill mx-1"></i> Excel Summary
          </button>
 
          <button
            className="btn btn-secondary  mx-2"
            onClick={handleExcelExport}
          >
            <i className="bi-file-earmark-text-fill mx-1"></i> PF Return (ECR)
          </button>
        </div>
      </div>
 
      {/* Show summary info */}
      {summary && <p className="text-success fw-semibold">{summary}</p>}
 
      {/* Rounded Table */}
      <div
        className="mt-3 p-2"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div style={{ height: "", overflowY: "auto" }}>
          <table
            className="table table-bordered table-striped table-sm text-center mb-0"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              fontSize: "12px",
              borderCollapse: "separate",
              borderSpacing: "0",
            }}
          >
            <thead
              className="table-light"
              style={{
                fontSize: "12px",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <tr>
                <th className="border">SN</th>
                <th className="border">EMPLOYEE</th>
                <th className="border">UAN NUMBER</th>
                <th className="border">GROSS WAGES</th>
                <th className="border">WAGES</th>
                <th className="border">PF WAGES</th>
                <th className="border">PENSION WAGES</th>
                <th className="border">EMPLOYEE CONT.</th>
                <th className="border">PENSION CONT.</th>
                <th className="border">EMPLOYER CONT.</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ fontSize: "12px" }}>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}