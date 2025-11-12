import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx"; // ✅ for Excel export
import Breadcrump from "../../Layout/UI/Breadcrump";

const LabourWelfarefund = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tableData, setTableData] = useState([]); // ✅ Dynamic table data

  // Format month as MMM-YYYY
  const formatMonth = (date) =>
    date
      .toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
      .toUpperCase();

  // ✅ Month navigation handlers
  const handlePrev = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
    setTableData([]); // Clear table when changing month
    toast.info(`⬅️ Moved to ${formatMonth(newDate)}`);
  };

  const handleNext = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
    setTableData([]);
    toast.info(`➡️ Moved to ${formatMonth(newDate)}`);
  };

  // ✅ Handle "View" button — shows sample data
  const handleView = () => {
    const mockData = [
      {
        sn: 1,
        code: "EMP001",
        name: "Rahul Sharma",
        location: "Mumbai",
        state: "Maharashtra",
        salary: 42000,
        deduction: 20,
        contribution: 40,
      },
      {
        sn: 2,
        code: "EMP002",
        name: "Priya Verma",
        location: "Delhi",
        state: "Delhi",
        salary: 39000,
        deduction: 20,
        contribution: 40,
      },
      {
        sn: 3,
        code: "EMP003",
        name: "Amit Patel",
        location: "Ahmedabad",
        state: "Gujarat",
        salary: 45000,
        deduction: 20,
        contribution: 40,
      },
    ];

    setTableData(mockData);
    toast.success(`📊 Showing LWF records for ${formatMonth(currentMonth)}`);
  };

  // ✅ Handle "Download" button — export to Excel
  const handleDownload = () => {
    if (tableData.length === 0) {
      toast.error("⚠️ No data to download!");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "LWF Report");

    const fileName = `LWF_Report_${formatMonth(currentMonth)}.xlsx`;
    XLSX.writeFile(wb, fileName);

    toast.success(`📥 ${fileName} downloaded successfully!`);
  };

  return (
    <div className="mt-4">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Breadcrumbs */}
      <Breadcrump
        items={[
          { label: "Dashboard", link: "/dashboard/overviews" },
          { label: "Reports", link: "/reports" },
          { label: "Statutory Reports", link: "/attendance" },
          { label: "Labour Welfare Fund", active: true },
        ]}
      />

      {/* Header */}
      <div className="mt-3">
        <h3
          className="mb-1"
          style={{ fontSize: "15.75px", fontWeight: "bold" }}
        >
          Labour Welfare Fund
        </h3>
        <p className="text-muted mb-3" style={{ fontSize: "13.2px" }}>
          View or download LWF deduction and contribution details for a month.
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

      {/* Month navigation + actions */}
      <div className="d-flex align-items-center row g-3 mb-3">
        <div className="col-auto">
          <div className="input-group" style={{ width: "210px" }}>
            <button
              className="btn btn-secondary btn-dm"
              type="button"
              onClick={handlePrev}
            >
              <i className="fe fe-arrow-left-circle"></i>
            </button>
            <input
              type="text"
              className="form-control text-center fw-semibold form-control-dm"
              value={formatMonth(currentMonth)}
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
        </div>

        <div className="col-auto">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleView}
            style={{ fontSize: "14px" }}
          >
            <i className="bi-table"></i> View
          </button>
        </div>

        <div className="col-auto">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleDownload}
            style={{ fontSize: "14px" }}
          >
            <i className="bi-file-earmark-excel"></i> Download
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="table-responsive shadow-sm bg-white p-2 rounded-4 overflow-hidden mt-3"
        style={{ border: "1px solid #dee2e6" }}
      >
        <table
          className="table table-bordered mb-0 align-middle"
          style={{ borderRadius: "12px", overflow: "hidden" }}
        >
          <thead
            className="table-light text-center"
            style={{
              fontWeight: "600",
              fontSize: "13px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <tr>
              <th>SN</th>
              <th>EMPLOYEE CODE</th>
              <th>EMPLOYEE NAME</th>
              <th>LOCATION</th>
              <th>STATE</th>
              <th>SALARY</th>
              <th>DEDUCTION</th>
              <th>CONTRIBUTION</th>
            </tr>
          </thead>
          <tbody className="text-center" style={{ fontSize: "14px" }}>
            {tableData.length > 0 ? (
              tableData.map((row, i) => (
                <tr key={i}>
                  <td className="text-center">{row.sn}</td>
                  <td className="text-center">{row.code}</td>
                  <td className="text-center">{row.name}</td>
                  <td className="text-center">{row.location}</td>
                  <td className="text-center">{row.state}</td>
                  <td className="text-center">₹{row.salary.toLocaleString()}</td>
                  <td className="text-center">₹{row.deduction}</td>
                  <td className="text-center">₹{row.contribution}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-muted py-3">
                  No records found for {formatMonth(currentMonth)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabourWelfarefund;
