import React, { useState } from "react";
import Breadcrump from "../../Layout/UI/Breadcrump";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function IncomeTaxdec() {
  const [data, setData] = useState([]);
  const [activeOnly, setActiveOnly] = useState(false);
  const [excludeNoDecl, setExcludeNoDecl] = useState(false);

  // Dummy employee declaration data
  const sampleData = [
    {
      id: 1,
      name: "Abhilash G",
      pan: "ABCDE1234F",
      updated: "2025-07-15",
      chapterVIA: "80C - ₹1,50,000",
      rent: "₹1,20,000",
      regime: "Old",
    },
    {
      id: 2,
      name: "Anusha E",
      pan: "PQRSX5678Y",
      updated: "2025-07-20",
      chapterVIA: "80D - ₹25,000",
      rent: "₹0",
      regime: "New",
    },
  ];

  // ✅ Handle View
  const handleView = () => {
    let filtered = [...sampleData];

    if (activeOnly) {
      filtered = filtered.filter((emp) => emp.id !== 2); // simulate filtering
    }

    if (excludeNoDecl) {
      filtered = filtered.filter((emp) => emp.chapterVIA !== "");
    }

    setData(filtered);

    if (filtered.length > 0) {
      toast.success(`✅ ${filtered.length} records loaded successfully.`);
    } else {
      toast.warning("⚠️ No records found for the selected filters.");
    }
  };

  // ✅ Handle Download (CSV)
  const handleDownload = () => {
    if (data.length === 0) {
      toast.error("❌ No records to download. Please click 'View' first.");
      return;
    }

    const csvRows = [];
    const headers = [
      "EMPLOYEE DETAILS",
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
          row.pan,
          row.updated,
          row.chapterVIA,
          row.rent,
          row.regime,
        ].join(",")
      );
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "income_tax_declarations.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast.success("📥 CSV file downloaded successfully!");
  };

  return (
    <div className="my-2">
      {/* ✅ Toastify Container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Breadcrumbs */}
      <Breadcrump
        items={[
          { label: "Dashboard", link: "/dashboard/overviews" },
          { label: "Reports", link: "" },
          { label: "StatutoryReports", link: "" },
          { label: "Income Tax Declarations", active: true },
        ]}
      />

      {/* Title */}
      <div className="mt-3">
        <h3
          className="mb-1"
          style={{ fontSize: "15.75px", fontWeight: "bold" }}
        >
          Income Tax Declarations
        </h3>
        <p className="text-muted mb-3" style={{ fontSize: "13.2px" }}>
          Check income tax declarations by employees for a given financial year.
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
              Financial year
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
              <option>2025-26</option>
            </select>
          </div>
        </div>
      </div>

      {/* Switches */}
      <div className="d-flex align-items-center mb-3">
        <div className="form-check form-switch mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="activeEmployeesOnly"
            checked={activeOnly}
            onChange={(e) => setActiveOnly(e.target.checked)}
            style={{ width: "2.5em", height: "1.3em" }}
          />
          &nbsp;&nbsp;
          <label
            className="form-check-label"
            htmlFor="activeEmployeesOnly"
            style={{ fontSize: "14px" }}
          >
            Active Employees only
          </label>
        </div>
        &nbsp;
        <div className="form-check form-switch mt-2 mx-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="excludeNoDeclarations"
            checked={excludeNoDecl}
            onChange={(e) => setExcludeNoDecl(e.target.checked)}
            style={{ width: "2.5em", height: "1.3em" }}
          />
          &nbsp;&nbsp;
          <label
            className="form-check-label"
            htmlFor="excludeNoDeclarations"
            style={{ fontSize: "14px" }}
          >
            Exclude records with no declarations
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex my-3">
        <button
          className="btn btn-secondary mx-2"
          onClick={handleView}
          style={{ fontSize: "14px" }}
        >
          <i className="bi-table mx-1"></i> View
        </button>
        <button
          className="btn btn-secondary btn-dm mx-2"
          onClick={handleDownload}
          style={{ fontSize: "14px" }}
        >
          <i className="bi bi-file-earmark-excel mx-1"></i> Download
        </button>
      </div>

      {/* Table */}
      <div
        className="mt-3 shadow-sm bg-white p-2 rounded-4 overflow-hidden"
        style={{ height: "250px", border: "1px solid #dee2e6" }}
      >
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f2f2f2",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              <th>EMPLOYEE DETAILS</th>
              <th>PAN NO.</th>
              <th>LAST UPDATED</th>
              <th>CHAPTER VI-A</th>
              <th>RENT PAID</th>
              <th>TAX REGIME</th>
              <th>DOWNLOAD</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id}>
                  <td className="text-center">{row.name}</td>
                  <td className="text-center">{row.pan}</td>
                  <td className="text-center">{row.updated}</td>
                  <td className="text-center">{row.chapterVIA}</td>
                  <td className="text-center">{row.rent}</td>
                  <td className="text-center">{row.regime}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-success">
                      <i className="fe fe-save"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-muted py-3"
                  style={{ fontSize: "14px" }}
                >
                  No records to display. Click <b>View</b> to load data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
