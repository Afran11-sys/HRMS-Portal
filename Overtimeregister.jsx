import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import Breadcrump from "../../Layout/UI/Breadcrump";

const OvertimeRegister = () => {
  const [month, setMonth] = useState(new Date("2025-06-01"));
  const [paymentDate, setPaymentDate] = useState("2025-08-01");
  const [summaryMsg, setSummaryMsg] = useState("");
  const [overtimeData, setOvertimeData] = useState([]); // initially empty

  // ✅ Sample Data for Different Months (Simulated Backend)
  const allOvertimeData = {
    "2025-05": [
      {
        id: 1,
        name: "Vikram Reddy",
        fatherName: "Raghav Reddy",
        sex: "Male",
        designation: "Software Engineer",
        date: "2025-05-12",
        overtimeHrs: 2,
        fixedGross: 18000,
        normalRate: 75,
        overtimeRate: 110,
        overtimeEarnings: 220,
      },
    ],
    "2025-06": [
      {
        id: 1,
        name: "Abhilash Gurrampally",
        fatherName: "G.Ramakrishna Goud",
        sex: "Male",
        designation: "Associate Software Engineer",
        date: "2025-06-10",
        overtimeHrs: 4,
        fixedGross: 16456,
        normalRate: 69,
        overtimeRate: 100,
        overtimeEarnings: 400,
      },
      {
        id: 2,
        name: "Akirala Saikiran",
        fatherName: "Santhosh",
        sex: "Male",
        designation: "Associate Software Engineer",
        date: "2025-06-15",
        overtimeHrs: 3,
        fixedGross: 15000,
        normalRate: 60,
        overtimeRate: 90,
        overtimeEarnings: 270,
      },
    ],
    "2025-07": [
      {
        id: 1,
        name: "Deepika Sharma",
        fatherName: "R.K. Sharma",
        sex: "Female",
        designation: "HR Executive",
        date: "2025-07-08",
        overtimeHrs: 5,
        fixedGross: 20000,
        normalRate: 80,
        overtimeRate: 120,
        overtimeEarnings: 600,
      },
    ],
  };

  // Helpers
  const formatMonth = (date) =>
    date
      .toLocaleString("default", { month: "short", year: "numeric" })
      .toUpperCase();

  const getMonthKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

  // Handlers
  const handlePrev = () => {
    const prevMonth = new Date(month);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setMonth(prevMonth);
    setOvertimeData([]); // clear data when switching months
    setSummaryMsg("");
  };

  const handleNext = () => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setMonth(nextMonth);
    setOvertimeData([]); // clear data when switching months
    setSummaryMsg("");
  };

  const handleView = () => {
    const key = getMonthKey(month);
    const dataForMonth = allOvertimeData[key] || [];

    setOvertimeData(dataForMonth);
    setSummaryMsg(
      `📊 Viewing Overtime Register for ${formatMonth(
        month
      )} (Payment Date: ${paymentDate})`
    );

    if (dataForMonth.length > 0)
      toast.success(`✅ Data loaded for ${formatMonth(month)}!`);
    else toast.warning(`⚠️ No records found for ${formatMonth(month)}.`);
  };

  const handleDownload = () => {
    if (overtimeData.length === 0) {
      toast.error("❌ No data to download. Click 'View' first!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(overtimeData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Overtime Register");
    XLSX.writeFile(workbook, `Overtime_Register_${formatMonth(month)}.xlsx`);

    toast.success("📥 Download started!");
  };

  return (
    <div>
      <Breadcrump
        items={[
          { label: "Dashboard", link: "/dashboard/overviews" },
          { label: "Reports", link: "" },
          { label: "Statutory Reports", link: "" },
          { label: "Overtime Register", active: true },
        ]}
      />

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="mt-3">
        <h3
          className="mb-1"
          style={{ fontSize: "15.75px", fontWeight: "bold" }}
        >
          Overtime Register
        </h3>
        <p className="text-muted mb-3" style={{ fontSize: "13.2px" }}>
          Overtime register in FORM XXIII, Rule 78(1)(a)(iii)
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
        </div>
      </div>

      {/* Month & Actions */}
      <div className="d-flex row g-2 align-items-center mb-3">
        <div className="col-auto d-flex align-items-center gap-2 mb-3 mt-3">
          <div className="input-group" style={{ width: "210px" }}>
            <button
              className="btn btn-secondary btn-sm"
              type="button"
              onClick={handlePrev}
            >
              <i className="fe fe-arrow-left-circle"></i>
            </button>
            <input
              type="text"
              className="form-control text-center fw-semibold form-control-sm"
              value={formatMonth(month)}
              readOnly
              style={{ backgroundColor: "#f8f9fa" }}
            />
            <button
              className="btn btn-secondary btn-sm"
              type="button"
              onClick={handleNext}
            >
              <i className="fe fe-arrow-right-circle"></i>
            </button>
          </div>
        </div>

        <div className="col-auto mb-3 mt-3">
          <input
            type="date"
            className="form-control"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
        </div>

        <div className="col-auto mb-3 mt-3">
          <button
            className="btn btn-secondary"
            style={{ fontSize: "14px" }}
            onClick={handleView}
          >
            <i className="bi bi-table"></i> View
          </button>
        </div>
        <div className="col-auto mb-3 mt-3">
          <button
            className="btn btn-secondary"
            style={{ fontSize: "14px" }}
            onClick={handleDownload}
          >
            <i className="bi bi-file-earmark-excel"></i> Download
          </button>
        </div>
      </div>

      {/* Summary Message */}
      {summaryMsg && <p className="text-success">{summaryMsg}</p>}

      {/* Table */}
      <div className="table-responsive mt-3">
        <table
          className="table table-bordered table-hover mb-0 align-middle text-center shadow-sm rounded-3 overflow-hidden"
          style={{
            borderRadius: "10px",
            border: "1px solid #dee2e6",
            backgroundColor: "#fff",
          }}
        >
          <thead
            className="table-light"
            style={{
              fontSize: "13px",
              fontWeight: "600",
              backgroundColor: "#f8f9fa",
            }}
          >
            <tr>
              <th>SN</th>
              <th>NAME OF WORKMAN</th>
              <th>FATHER/HUSBAND NAME</th>
              <th>SEX</th>
              <th>DESIGNATION</th>
              <th>DATE</th>
              <th>OVERTIME HRS.</th>
              <th>FIXED GROSS</th>
              <th>NORMAL RATE</th>
              <th>OVERTIME RATE</th>
              <th>OVERTIME EARNINGS</th>
            </tr>
          </thead>
          <tbody>
            {overtimeData.length > 0 ? (
              overtimeData.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{emp.name}</strong>
                  </td>
                  <td>{emp.fatherName}</td>
                  <td>{emp.sex}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.date}</td>
                  <td>{emp.overtimeHrs}</td>
                  <td>{emp.fixedGross}</td>
                  <td>{emp.normalRate}</td>
                  <td>{emp.overtimeRate}</td>
                  <td>{emp.overtimeEarnings}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center text-muted py-3">
                  ⚠️ No records to display. Click <b>“View”</b> to load data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OvertimeRegister;
