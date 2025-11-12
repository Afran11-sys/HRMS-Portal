import React, { useState } from "react";
import Breadcrump from "../../Layout/UI/Breadcrump";
 
export default function ESIDeduction() {
  const [month, setMonth] = useState(new Date());
  const [summary, setSummary] = useState("");
  const [reportType, setReportType] = useState("ESI Return");
 
  const employeeData = [
    {
      id: 1,
      name: "John Doe",
      ip: "123456",
      days: 30,
      wages: 15000,
      employee: 750,
      employer: 750,
      reason: "-",
      lastWorking: "01/08/2025",
    },
    {
      id: 2,
      name: "Ruthik",
      ip: "654321",
      days: 30,
      wages: 15000,
      employee: 750,
      employer: 750,
      reason: "-",
      lastWorking: "01/08/2025",
    },
  ];
 
  // ✅ Format month as NOV-2025
  const formatMonth = (date) =>
    date.toLocaleString("default", { month: "short", year: "numeric" }).toUpperCase();
 
  // ✅ Go to previous month
  const handlePrev = () => {
    const prevMonth = new Date(month);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setMonth(prevMonth);
  };
 
  // ✅ Go to next month
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
 
  // ✅ Filter by current month/year
  const currentYear = month.getFullYear();
  const currentMonth = month.getMonth() + 1;
 
  const filteredData = employeeData.filter((emp) => {
    const [day, mon, yr] = emp.lastWorking.split("/").map(Number);
    return yr === currentYear && mon === currentMonth;
  });
 
  return (
    <div className="">
      {/* ✅ Breadcrumb */}
      <Breadcrump
        items={[
          { label: "Reports", link: "/Reports/Statutory Reports" },
          { label: "Statutory Reports", link: "/Statutory Reports/PF Deduction" },
          { label: "ESI Deduction", active: true },
        ]}
      />
 
      {/* ✅ Title Section */}
      <div className="mt-3">
        <h3 className="mb-1 title" >
          ESI Deduction
        </h3>
        <p
          className="text-muted mb-3"
          style={{ fontSize: "13.2px",  }}
        >
          View or download ESI deduction for a period and ESI Monthly Contribution Report
        </p>
        <hr className="mb-3" />
      </div>
 
      {/* ✅ Filters */}
      <div className="row mb-3 align-items-center">
        <div className="row mb-1">
          <div className="col-md-2">
            <label className="form-label fw-semibold" style={{ fontSize: "12.25px" }}>
              Location
            </label>
            <select className="form-select form-select-sm fw-semibold">
              <option>All Locations</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label fw-semibold" style={{ fontSize: "12.25px" }}>
              Cost Center
            </label>
            <select className="form-select form-select-sm fw-semibold">
              <option>All Cost Centers</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label fw-semibold" style={{ fontSize: "12.25px" }}>
              Departments
            </label>
            <select className="form-select form-select-sm fw-semibold">
              <option>All Departments</option>
            </select>
          </div>
        </div>
      </div>
 
      {/* ✅ Month Navigation + Actions */}
      <div className="d-flex align-items-center gap-2 mb-3 mt-3">
        <div className="input-group" style={{ width: "210px" }}>
          <button className="btn btn-secondary " type="button" onClick={handlePrev}>
            <i className="fe fe-arrow-left-circle"></i>
          </button>
          <input
            type="text"
            className="form-control text-center fw-semibold form-control"
            value={formatMonth(month)}
            readOnly
            style={{ backgroundColor: "#f8f9fa" }}
          />
          <button className="btn btn-secondary " type="button" onClick={handleNext}>
            <i className="fe fe-arrow-right-circle"></i>
          </button>
        </div>
 
        <button className="btn btn-secondary  mx-2" onClick={handleViewSummary}>
          <i className="bi-table mx-1"></i>View Summary
        </button>
 
        <button className="btn btn-secondary  mx-2" onClick={handleExcelExport}>
          <i className="bi-file-earmark-excel-fill mx-1"></i>Excel Summary
        </button>
 
       
         <button className="btn btn-secondary  mx-2" onClick={handleExcelExport}>
          <i className="bi-file-earmark-excel-fill mx-1"></i>ESI Return
        </button>
      </div>
 
      {/* ✅ Show Summary */}
      {summary && <p className="text-success">{summary}</p>}
 
      {/* ✅ Rounded Table */}
      <div
        className="mt-2 p-2"
        style={{
          height: "",
          overflowY: "auto",
          borderRadius: "12px",
          border: "1px solid #dee2e6",
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <table
          className="table text-center align-middle mb-0"
          style={{
            borderCollapse: "separate",
            borderSpacing: "0",
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <thead
            style={{
              backgroundColor: "#f8f9fa",
              fontWeight: "600",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <tr>
              <th>SN</th>
              <th>EMPLOYEE</th>
              <th>IP NUMBER</th>
              <th>DAYS</th>
              <th>WAGES</th>
              <th>EMPLOYEE</th>
              <th>EMPLOYER</th>
              <th>REASON FOR 0 DAYS</th>
              <th>LAST WORKING DATE</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.ip}</td>
                  <td>{emp.days}</td>
                  <td>{emp.wages}</td>
                  <td>{emp.employee}</td>
                  <td>{emp.employer}</td>
                  <td>{emp.reason}</td>
                  <td>{emp.lastWorking}</td>
                </tr>
              ))
            ) : (
              <tr>
               
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
 