import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrump from "../../Layout/UI/Breadcrump";
 
const Registerofleaves = () => {
  // sample data
  const [data, setData] = useState([
    {
      employeeName: "Abhilash Gurrampally",
      employeeCode: "LEV098",
      month: "July 2025",
      daysWorked: 0,
      maternity: "0.00",
      unpaidLeaves: "0.00",
      paidLeaves: "0.00",
      wages: "0.00",
    },
    {
      employeeName: "Akirala Saikiran",
      employeeCode: "LEV068",
      month: "August 2025",
      daysWorked: 0,
      maternity: "0.00",
      unpaidLeaves: "0.00",
      paidLeaves: "0.00",
      wages: "0.00",
    },
    {
      employeeName: "Anusha Enigalla",
      employeeCode: "LEV111",
      month: "August 2025",
      daysWorked: 0,
      maternity: "0.00",
      unpaidLeaves: "0.00",
      paidLeaves: "0.00",
      wages: "0.00",
    },
    {
      employeeName: "Karthik Reddy",
      employeeCode: "LEV145",
      month: "September 2025",
      daysWorked: 0,
      maternity: "0.00",
      unpaidLeaves: "0.00",
      paidLeaves: "0.00",
      wages: "0.00",
    },
  ]);
 
  const [filters, setFilters] = useState({
    location: "All Locations",
    costCenter: "All Cost Centers",
    year: "2025",
    month: "December",
  });
 
  const [showTable, setShowTable] = useState(false);
 
  // handlers
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
 
  const handleView = () => {
    setShowTable(true);
    toast.info("Report generated successfully!", { position: "top-right" });
  };
 
  const handlePDFDownload = () => {
    toast.success("PDF Download started!", { position: "top-right" });
  };
 
  const handleExport = () => {
    if (data.length === 0) {
      toast.warning("No data available to export!", { position: "top-right" });
      return;
    }
 
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Register of Leaves");
 
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
 
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "Register_of_Leaves.xlsx");
 
    toast.success("Excel exported successfully!", { position: "top-right" });
  };
 
  return (
    <>
      <ToastContainer />
      <div>
        {/* Breadcrumb */}
        <Breadcrump
          items={[
            { label: "Reports", link: "/Reports/Statutory Reports" },
            {
              label: "Statutory Reports",
              link: "/Statutory Reports/Register Of Leaves",
            },
            { label: "Register Of Leaves", active: true },
          ]}
        />
 
        <div className="mt-3">
          <h3 className="mb-1 title">Register of Leaves</h3>
          <p
            className="text-muted mb-3"
            style={{ fontSize: "13.2px" }}
          >
            Register of leaves with wages as Per Form No. 18, Rule 94
          </p>
          <hr className="mb-3" />
        </div>
 
        {/* Filters */}
        <div className="d-flex justify-content-start align-items-center gap-4 mt-3 flex-wrap">
          {/* Location */}
          <div>
            <label
              className="form-label"
              style={{
                fontSize: "12.25px",
                fontWeight: "600",
                display: "block",
              }}
            >
              Location
            </label>
            <select
              name="location"
              value={filters.location}
              onChange={handleChange}
              className="form-select"
              style={{
                fontSize: "13px",
                fontWeight: "600",
                width: "165px",
              }}
            >
              <option>All Locations</option>
            </select>
          </div>
 
          {/* Cost Center */}
          <div>
            <label
              className="form-label"
              style={{
                fontSize: "12.25px",
                fontWeight: "600",
                display: "block",
              }}
            >
              Cost Center
            </label>
            <select
              name="costCenter"
              value={filters.costCenter}
              onChange={handleChange}
              className="form-select"
              style={{
                fontSize: "13px",
                fontWeight: "600",
                width: "165px",
              }}
            >
              <option>All Cost Centers</option>
            </select>
          </div>
 
          {/* Year */}
          <div>
            <label
              className="form-label"
              style={{
                fontSize: "12.25px",
                fontWeight: "600",
                display: "block",
              }}
            >
              Select Year
            </label>
            <select
              name="year"
              value={filters.year}
              onChange={handleChange}
              className="form-select"
              style={{
                fontSize: "13px",
                fontWeight: "600",
                width: "165px",
              }}
            >
              <option>2025</option>
            </select>
          </div>
 
          {/* Month */}
          <div>
            <label
              className="form-label"
              style={{
                fontSize: "12.25px",
                fontWeight: "600",
                display: "block",
              }}
            >
              Jan to <i className="bi-info-circle-fill text-info"></i>
            </label>
            <select
              name="month"
              value={filters.month}
              onChange={handleChange}
              className="form-select"
              style={{
                fontSize: "13px",
                fontWeight: "600",
                width: "165px",
              }}
            >
              <option>December</option>
            </select>
          </div>
        </div>
 
        {/* Action Buttons */}
        <div className="mt-3 d-flex align-items-center flex-wrap">
          <button
            type="button"
            className="btn btn-secondary btn-dm m-1"
            onClick={handleView}
          >
            <i className="bi-table"></i> View
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-dm m-1"
            onClick={handlePDFDownload}
          >
            <i className="bi-file-earmark-pdf-fill"></i> Download (PDF)
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-dm m-1"
            onClick={handleExport}
          >
            <i className="bi-file-earmark-excel-fill"></i> Export to EXCEL
          </button>
        </div>
 
        {/* Rounded Table */}
        <div
          className="table-responsive mt-3"
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <table
            className="table align-middle mb-0"
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <thead
              className="table-light"
              style={{
                backgroundColor: "#f8f9fa",
                fontWeight: "600",
              }}
            >
              <tr>
                <th>EMPLOYEE NAME</th>
                <th>EMPLOYEE CODE</th>
                <th>MONTH</th>
                <th className="text-center">DAYS WORKED</th>
                <th className="text-center">MATERNITY</th>
                <th className="text-center">UNPAID LEAVES</th>
                <th className="text-center">PAID LEAVES</th>
                <th className="text-end">WAGES</th>
              </tr>
            </thead>
            <tbody>
              {showTable && data.length > 0 ? (
                data.map((row, index) => (
                  <>
                    <tr key={index}>
                      <td style={{ fontWeight: "600" }}>{row.employeeName}</td>
                      <td>{row.employeeCode}</td>
                      <td>{row.month}</td>
                      <td className="text-center">{row.daysWorked}</td>
                      <td className="text-center">{row.maternity}</td>
                      <td className="text-center">{row.unpaidLeaves}</td>
                      <td className="text-center">{row.paidLeaves}</td>
                      <td className="text-end">{row.wages}</td>
                    </tr>
 
                    {/* Add 2 empty rows gap after every 2 data rows */}
                    {(index + 1) % 2 === 0 && (
                      <>
                        <tr>
                          <td
                            colSpan="8"
                            style={{ height: "15px", border: "none" }}
                          ></td>
                        </tr>
                        <tr>
                          <td
                            colSpan="8"
                            style={{ height: "15px", border: "none" }}
                          ></td>
                        </tr>
                      </>
                    )}
                  </>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-3">
                    Click 'View' above to generate report
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
 
export default Registerofleaves;
 