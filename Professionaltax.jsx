
import { useState } from "react";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Professionaltax = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // previous month
  const handlePrev = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
    toast.info("Moved to previous month!");
  };

  // next month
  const handleNext = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
    toast.info("Moved to next month!");
  };

  // Sample Data for multiple sheets
  const employees = [
    { ID: 1, Name: "John", Department: "HR" },
    { ID: 2, Name: "Ravi", Department: "IT" },
    { ID: 3, Name: "Anita", Department: "Finance" },
  ];

  const projects = [
    { Code: "P001", Title: "Website Revamp", Manager: "Ravi" },
    { Code: "P002", Title: "Mobile App", Manager: "Anita" },
  ];

  // Export Excel
  const handleExport = () => {
    const workbook = XLSX.utils.book_new();

    const employeeSheet = XLSX.utils.json_to_sheet(employees);
    const projectSheet = XLSX.utils.json_to_sheet(projects);

    XLSX.utils.book_append_sheet(workbook, employeeSheet, "Employees");
    XLSX.utils.book_append_sheet(workbook, projectSheet, "Projects");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "CompanyData.xlsx");

    toast.success("Exported to Excel successfully!");
  };

  // View Button
  const handleView = () => {
    toast.info("Viewing Professional Tax records...");
  };

  return (
    <div>
      <p>&lt; Reports / Statutory Reports / Professional Tax</p>
      <h3>Professional Tax</h3>
      <p>View or download details of Professional tax deduction for a period</p>

      {/* Location Filter */}
      <div className="d-flex">
        <div className="mx-2" style={{ width: "220px" }}>
          <label>Location</label>
          <select className="form-select">
            <option>All Locations</option>
          </select>
        </div>
      </div>

      {/* Controls */}
      <div className="d-flex align-items-center gap-3 my-3">
        {/* Prev Button */}
        <button className="btn btn-secondary px-3" onClick={handlePrev}>
          <i className="fe fe-arrow-left-circle"></i>
        </button>

        {/* Month-Year Display */}
        <div className="px-4 py-2 border bg-light fw-semibold text-center">
          {format(currentDate, "MMM-yyyy").toUpperCase()}
        </div>

        {/* Next Button */}
        <button className="btn btn-secondary px-3" onClick={handleNext}>
          <i className="fe fe-arrow-right-circle"></i>
        </button>

        {/* View Button */}
        <button type="button" className="btn btn-secondary m-2" onClick={handleView}>
          <i className="fe fe-calendar"></i> View
        </button>

        {/* Export Button */}
        <button type="button" className="btn btn-secondary m-2" onClick={handleExport}>
          <i className="fe fe-file-plus"></i> Export to EXCEL
        </button>

        <p className="ms-3 mb-0">No records found</p>
      </div>

      {/* Table */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th className="border">STATE</th>
            <th className="border">CODE</th>
            <th className="border">EMPLOYEE NAME</th>
            <th className="border">WAGES</th>
            <th className="border">DEDUCTION</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Professionaltax;
