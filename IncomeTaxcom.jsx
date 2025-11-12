import React, { useState } from "react";
import Breadcrump from "../../Layout/UI/Breadcrump";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function IncomeTaxCom() {
  const months = [
    "JAN-2025",
    "FEB-2025",
    "MAR-2025",
    "APR-2025",
    "MAY-2025",
    "JUN-2025",
    "JUL-2025",
    "AUG-2025",
    "SEP-2025",
    "OCT-2025",
    "NOV-2025",
    "DEC-2025",
  ];

  const [monthIndex, setMonthIndex] = useState(7); // Default: AUG-2025
  const [reports, setReports] = useState([
    {
      id: 1,
      description: "Income Tax Computation for AUG-2025 for 46 employee(s)",
      requestOn: "02-Aug-2025 10:33:22",
      status: "ready",
    },
  ]);
  const [allEmployees, setAllEmployees] = useState(false);

  // ✅ Handle Previous/Next Month
  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev === 0 ? months.length - 1 : prev - 1));
    toast.info("⬅️ Moved to previous month");
  };

  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev === months.length - 1 ? 0 : prev + 1));
    toast.info("➡️ Moved to next month");
  };

  // ✅ Handle Generate Report
  const handleGenerate = () => {
    const newReport = {
      id: reports.length + 1,
      description: `Income Tax Computation for ${months[monthIndex]} ${
        allEmployees ? "for ALL employees" : "for selected employees"
      }`,
      requestOn: new Date().toLocaleString(),
      status: "ready",
    };

    setReports([newReport, ...reports]);
    toast.success(`✅ Report generated for ${months[monthIndex]}!`);
  };

  // ✅ Handle Download Button
  const handleDownload = (desc) => {
    toast.success(`📥 Download started for "${desc}"`);
  };

  return (
    <div className="container-fluid">
      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ✅ Breadcrumbs */}
      <Breadcrump
        items={[
          { label: "Dashboard", link: "/dashboard/overviews" },
          { label: "Reports", link: "" },
          { label: "Statutory Reports", link: "" },
          { label: "Income Tax Computation", active: true },
        ]}
      />

      {/* ✅ Page Header */}
      <div className="mt-3">
        <h3
          className="mb-1"
          style={{ fontSize: "15.75px", fontWeight: "bold" }}
        >
          Income Tax Computation
        </h3>
        <p className="text-muted mb-3" style={{ fontSize: "13.2px" }}>
          Download income tax computation for employees in a given period.
        </p>
        <hr className="mb-3" />
      </div>

      {/* ✅ Main Layout */}
      <div className="row">
        {/* Left Section */}
        <div className="col-lg-7 mb-4">
          {/* Filters */}
          <div className="row mb-3 d-flex gap-2 align-items-center">
            <div className="row mb-1">
              <div className="col-md-4">
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
              <div className="col-md-4">
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
              <div className="col-md-4">
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

          {/* Actions */}
          <div className="d-flex align-items-center flex-wrap gap-2 mt-3">
            <div className="d-flex align-items-center gap-2 ">
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
                  className="form-control text-center fw-semibold form-control-dm"
                  value={months[monthIndex]}
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
            </div>

            <div style={{ width: "180px" }}>
              <input
                type="text"
                className="form-control form-control-dm"
                placeholder="All Employees"
                value={allEmployees ? "All Employees" : ""}
                onChange={(e) =>
                  setAllEmployees(e.target.value.toLowerCase() === "all")
                }
              />
            </div>

            <button
              className="btn btn-secondary d-flex align-items-center p-2"
              onClick={handleGenerate}
              style={{ fontSize: "14px" }}
            >
              <i className="bi-file-earmark-pdf-fill me-2"></i> Generate
            </button>
          </div>

          {/* ✅ Report History Table */}
          <div
            className="bg-white shadow-dm rounded-3 p-3"
            style={{ minHeight: "350px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold mb-0" style={{ fontSize: "14px" }}>
                Report History
              </h6>
              <span className="text-muted dmall" style={{ fontSize: "14px" }}>
                Total: {reports.length} record(s)
              </span>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr style={{ fontSize: "13px" }}>
                    <th style={{ width: "50%" }}>DESCRIPTION</th>
                    <th style={{ width: "30%" }}>REQUESTED ON</th>
                    <th className="text-center" style={{ width: "20%" }}>
                      DOWNLOAD
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length > 0 ? (
                    reports.map((report) => (
                      <tr key={report.id}>
                        <td>{report.description}</td>
                        <td>{report.requestOn}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleDownload(report.description)}
                          >
                            <i className="fe fe-download"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-3">
                        No reports found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ✅ Right Section: About Card */}
        <div className="col-lg-5">
          <div
            className="card bg-white shadow-dm rounded-3 p-3 h-100"
            style={{ fontSize: "14px", minHeight: "100%", width: "440px" }}
          >
            <h6 className="fw-semibold mb-3" style={{ fontSize: "14px" }}>
              About this report
            </h6>
            <p>
              The Income Computation Report provides a detailed breakdown of
              income tax calculated on an employee’s salary during a specific
              month.
            </p>
            <p>
              It shows salary components, declared investments, and how they
              impact the monthly tax deduction.
            </p>
            <p>
              This report also includes total tax liability for the financial
              year and how it’s distributed across remaining months.
            </p>

            <div className="bg-light p-3 rounded mt-3">
              <p className="fw-semibold mb-1">Example:</p>
              <p className="mb-1">
                <strong>Month of April</strong> — Total Tax:{" "}
                <span className="text-primary">₹12,000</span>
                <br />
                Deducted: ₹12,000 ÷ 12 ={" "}
                <span className="text-danger fw-semibold">₹1,000</span>
              </p>
              <p className="mb-0">
                <strong>Month of May</strong> — Updated Tax:{" "}
                <span className="text-primary">₹15,000</span>
                <br />
                Deducted: (15,000 - 1,000) ÷ 11 ={" "}
                <span className="text-danger fw-semibold">₹1,273</span>
              </p>
            </div>
            <p className="mt-3 mb-0 text-muted dmall">
              *These values adjust dynamically based on declarations and
              revisions throughout the financial year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
