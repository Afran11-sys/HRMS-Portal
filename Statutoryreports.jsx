import React, { useState } from "react";
import { FaTable, FaFileExcel, FaPlusCircle, FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
 
export default function Statutoryreports() {
  const [active, setActive] = useState("Statutory Reports");
  const navigate = useNavigate();
 
   const reports = [
    { name: "AI Reporting", path: "/reports/aireporting" },
    { name: "Salary Reports", path: "/reports/salaryreports" },
    { name: "Attendance Reports", path: "/reports/report" },
    { name: "Employee Reports", path: "/reports/employeereports" },
    { name: "Statutory Reports", path: "/reports/statutoryreports" },
    { name: "Annual Reports", path: "/reports/annualreports" },
    { name: "Other Reports", path: "/reports/otherreports" },
  ];
 
  // 14 cards with unique paths
  const cards = [
    { title: "ESI Deduction", description: "Employee salary and computed ESI deductions.", path: "Esideduction" },
    { title: "ESI Coverage", description: "List of employees covered in ESI for a month.", path: "Esicoverage" },
    { title: "PF Deduction ", description: "Employee salary and computed PF deduction .", path: "Pfdeduction" },
    { title: "PF Coverage", description: "List of employees covered for a month of pf coverage.", path: "Pfcoverage" },
    { title: "Overtime Register", description: "Overtime register as per Form XII 78(1)(a)(lll).", path: "overtimeregister" },
    { title: "Register of Leaves", description: "Register or leaves as per FORM NO 16 Rule 94.", path: "registerofleaves" },
    { title: "IT Deduction ", description: "Employee wise salary and computed tax.", path: "incometax" },
    { title: "IT Declarations", description: "Employee wise salary and computed tax.", path: "incometaxdec" },
    { title: "IT Computation", description: "Summary of annual tax computation for a month.", path: "incometaxcom" },
    { title: "Labour welfare fund ", description: "Employee salary state and deductions of LWF.", path: "LabourWelfarefund" },
    { title: "TDS Return", description: "FORM 94 for quality TDS Return filing for a month.", path: "tdsretrun" },
    { title: "IT Form 16", description: "Form16 contains details of income and tax deduction.", path: "incometaxform16" },
   
  ];
 
  return (
    <div className="mt-3">
      <h5>Reports / All Reports</h5>
      <h4 className="mt-3">Reports</h4>
      <h6>Generate and analyze reports related to attendance, salary, compliance, and more.</h6>
 
      <div className="d-flex">
        {/* Sidebar */}
        <div>
          <div className="card shadow-lg border-2 mt-1 rounded-5" style={{ width: "220px" }}>
            <div className="card-body">
              {/* Search Bar */}
              <div className="input-group mb-3">
                <input type="text" className="form-control form-control-sm" placeholder="Search Reports" />
                <span className="input-group-text bg-primary border-start-0">
                  <li><i class="fe fe-search " > </i>
                    </li>
                </span>
              </div>
              {/* Report List */}
              <ul className="list-group list-group-flush">
                {reports.map((report, index) => (
                   <li
                    key={index}
                    className={`list-group-item d-flex justify-content-between align-items-center border-0
                      ${active === report.name
                        ? "bg-primary text-white rounded"
                        : "bg-transparent text-primary fw-semibold"}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setActive(report.name);
                      navigate(report.path);
                    }}
                  >
                    <div className="d-flex align-items-center">{report.name}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
 
        {/* Cards Section */}
        <div className="p-1 w-100">
          <div className="row">
            {cards.map((card, index) => (
              <div key={index} className="col-md-3 mb-1">
                <div
                  className="card shadow-sm border-2 text-center p-3 rounded-5"
                  style={{ height: "210px", width: "180px", cursor: "pointer" }}
                >
                  <div className="d-flex justify-content-center mb-2">
                    <FaTable className="text-primary me-2" />
                    <FaFileExcel className="text-success" />
                  </div>
                  <h6 className="fw-bold">{card.title}</h6>
                  <p className="text-muted small">{card.description}</p>
                  <button
                    className="btn btn-primary btn-sm mt-auto"
                    onClick={() => navigate(card.path)}
                  >
                    Open <FaArrowCircleRight className="ms-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 
 