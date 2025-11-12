import React, { useState } from "react";
import Breadcrump from "../../Layout/UI/Breadcrump";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function IncomeTax() {
  const [data, setData] = useState([]);
  const [excludeNoDecl, setExcludeNoDecl] = useState(false);
  const [month, setMonth] = useState(new Date());

  // ✅ Simulated backend data for different months
  const allMonthData = {
    "2025-06": [
      {
        id: 1,
        name: "Abhilash G",
        pan: "ABCDE1234F",
        updated: "2025-06-15",
        chapterVIA: "80C - ₹1,50,000",
        rent: "₹1,20,000",
        regime: "Old",
        designation: "Software Engineer",
      },
    ],
    "2025-07": [
      {
        id: 2,
        name: "Anusha E",
        pan: "PQRSX5678Y",
        updated: "2025-07-20",
        chapterVIA: "80D - ₹25,000",
        rent: "₹0",
        regime: "New",
        designation: "Developer",
      },
      {
        id: 3,
        name: "Chandu T",
        pan: "XYZPQ7890L",
        updated: "2025-07-10",
        chapterVIA: "",
        rent: "₹60,000",
        regime: "Old",
        designation: "Support Engineer",
      },
    ],
    "2025-08": [
      {
        id: 4,
        name: "Kavya R",
        pan: "LMNOP1234Q",
        updated: "2025-08-05",
        chapterVIA: "80C - ₹1,00,000",
        rent: "₹80,000",
        regime: "New",
        designation: "Finance Analyst",
      },
    ],
  };

  // ✅ Format month like "Jul 2025"
  const formatMonth = (date) =>
    date.toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });

  // ✅ Month key for simulated API
  const getMonthKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

  // ✅ Handle Prev/Next month buttons
  const handleMonthChange = (direction) => {
    setMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() + (direction === "next" ? 1 : -1));
      return newMonth;
    });
    setData([]); // Clear old data when month changes
    toast.info("📅 Month changed. Click 'View' to reload data.");
  };

  // ✅ Handle "View" button (fetch month-based data)
  const handleView = () => {
    const key = getMonthKey(month);
    let monthData = allMonthData[key] || [];

    // Exclude zero declaration if switch is on
    if (excludeNoDecl) {
      monthData = monthData.filter((item) => item.chapterVIA !== "");
    }

    setData(monthData);

    if (monthData.length > 0) {
      toast.success(`✅ Data loaded for ${formatMonth(month)}.`);
    } else {
      toast.warning(`⚠️ No data found for ${formatMonth(month)}.`);
    }
  };

  // ✅ Handle "Download" CSV
  const handleDownload = () => {
    if (data.length === 0) {
      toast.error("❌ No records to download. Please click 'View' first.");
      return;
    }

    const csvRows = [];
    const headers = [
      "EMPLOYEE",
      "DESIGNATION",
      "PAN NO.",
      "LAST UPDATED",
      "CHAPTER VI-A",
      "RENT PAID",
      "TAX REGIME",
    ];
    csvRows.push(headers.join(","));

    data.forEach((row) => {
      csvRows.push(
        [
          row.name,
          row.designation,
          row.pan,
          row.updated,
          row.chapterVIA || "-",
          row.rent,
          row.regime,
        ].join(",")
      );
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `income_tax_${formatMonth(month)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("📥 CSV file downloaded successfully!");
  };

  return (
    <div className="my-2">
      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ✅ Breadcrumb */}
      <Breadcrump
        items={[
          { label: "Dashboard", link: "/dashboard/overviews" },
          { label: "Reports", link: "" },
          { label: "Statutory Reports", link: "" },
          { label: "Income Tax", active: true },
        ]}
      />

      {/* ✅ Title */}
      <div className="mt-3">
        <h3
          className="mb-1"
          style={{ fontSize: "15.75px", fontWeight: "bold" }}
        >
          Income Tax
        </h3>
        <p className="text-muted mb-3" style={{ fontSize: "13.2px" }}>
          View or download employee tax declarations for a specific month.
        </p>
        <hr className="mb-3" />
      </div>

      {/* ✅ Filters */}
      <div className="d-flex justify-content-start align-items-center mb-3 gap-4 flex-wrap">
        <div className="col-md-2 d-flex flex-column align-items-center">
          <label
            className="form-label"
            style={{ fontSize: "12.25px", fontWeight: "600" }}
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

        {/* Switch */}
        <div className="form-check form-switch d-flex align-items-center mt-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="excludeZeroTax"
            checked={excludeNoDecl}
            onChange={(e) => setExcludeNoDecl(e.target.checked)}
            style={{ width: "2.5em", height: "1.3em" }}
          />
          <label
            className="form-check-label ms-2"
            htmlFor="excludeZeroTax"
            style={{ fontSize: "14px" }}
          >
            Exclude Zero Tax Items
          </label>
        </div>
      </div>

      {/* ✅ Month + Buttons */}
      <div className="d-flex justify-content-start align-items-center my-3 gap-3 flex-wrap">
        {/* Month Picker */}
        <div className="input-group" style={{ width: "220px" }}>
          <button
            className="btn btn-secondary btn-dm"
            type="button"
            onClick={() => handleMonthChange("prev")}
          >
            <i className="fe fe-arrow-left-circle"></i>
          </button>
          <input
            type="text"
            className="form-control text-center fw-semibold form-control-dm"
            value={formatMonth(month)}
            readOnly
            style={{ backgroundColor: "#f8f9fa" }}
          />
          <button
            className="btn btn-secondary btn-dm"
            type="button"
            onClick={() => handleMonthChange("next")}
          >
            <i className="fe fe-arrow-right-circle"></i>
          </button>
        </div>

        {/* View & Download */}
        <button
          className="btn btn-secondary"
          onClick={handleView}
          style={{ fontSize: "14px" }}
        >
          <i className="bi bi-table mx-1"></i> View
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleDownload}
          style={{ fontSize: "14px" }}
        >
          <i className="bi bi-file-earmark-excel mx-1"></i> Download
        </button>
      </div>

      {/* ✅ Table */}
      <div
        className="mt-3 shadow-sm bg-white p-2 rounded-4 overflow-hidden"
        style={{ border: "1px solid #dee2e6" }}
      >
        <table
          className="table table-hover align-middle mb-0 text-center"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <thead
            className="table-light"
            style={{
              fontSize: "13px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <tr>
              <th>EMPLOYEE</th>
              <th>DESIGNATION</th>
              <th>PAN NO.</th>
              <th>LAST UPDATED</th>
              <th>CHAPTER VI-A</th>
              <th>RENT PAID</th>
              <th>TAX REGIME</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id} style={{ fontSize: "14px" }}>
                  <td>{row.name}</td>
                  <td>{row.designation}</td>
                  <td>{row.pan}</td>
                  <td>{row.updated}</td>
                  <td>{row.chapterVIA || "-"}</td>
                  <td>{row.rent}</td>
                  <td>{row.regime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-3 text-muted"
                  style={{ fontSize: "14px" }}
                >
                  Select a month and click <b>View</b> to load employee tax
                  data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
