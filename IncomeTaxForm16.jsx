import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./incometax16.css";
import Breadcrump from "../../Layout/UI/Breadcrump";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const IncomeTaxForm16 = () => {
  // ✅ Handlers for toast notifications
  const handleGenerate = () => {
    toast.success("Form-16 generated successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleSendEmail = () => {
    toast.info("Form-16 sent via email!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handlePrevYear = () => {
    toast.warning("Previous financial year selected.", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleNextYear = () => {
    toast.warning("Next financial year selected.", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className=" mt-2">
      {/* ✅ Toast container */}
      <ToastContainer />
      {/* Breadcrumbs */}
      <Breadcrump
        items={[
          { label: "Dashboard", link: "/dashboard/overviews" },
          { label: "Reports", link: "" },
          { label: "StatutoryReports", link: "" },
          { label: "IncomeTaxForm16", active: true },
        ]}
      />

      <div className="row mt-1">
     <div className="mt-3">
        <h3 className="mb-1" style={{ fontSize: "15.75px", fontWeight: "bold" }}>Income Tax Form-16</h3>
        <p className="text-muted mb-3" style={{ fontSize: "13.2px" }}>
        Download income tax FORM-16 for a financial year.
        </p>
        <hr className="mb-3" />
      </div>
 
 

        {/* Left Side */}
        <div className="col-lg-6 form-section">
          <div className="row mb-3 align-items-center">
        <div className="row d-flex gap-5 mb-1">
          
          <div className="col-md-3">
            <label className="form-label" style={{ fontSize:"12.25px", fontWeight:"600", width:"110px" }}>Location</label>
            <select className="form-select" style={{ fontSize:"13px", paddingRight:"8px", fontWeight:"600", width: "165px", paddingLeft:"8px" }}>
              <option>All Locations</option>
             
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" style={{ fontSize:"12.25px", fontWeight:"600", width:"110px" }}>Cost Center</label>
            <select className="form-select" style={{ fontSize:"13px", paddingRight:"8px", fontWeight:"600", width: "165px", paddingLeft:"8px" }}>
              <option>All Cost Centers</option>
             
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" style={{ fontSize:"12.25px", fontWeight:"600", width:"110px" }}>Departments</label>
            <select className="form-select" style={{ fontSize:"13px", paddingRight:"8px", fontWeight:"600", width: "165px", paddingLeft:"8px" }}>
              <option>All Departments</option>
             
            </select>
          </div>
        </div>
      </div>
 

          {/* Year & Date Selection */}
          <div className="row g-2 d-flex align-items-center mb-3">
            <div className="col-md-4">
              <div>
                <label className="form-label mb-0">Financial Year</label>
              </div>

              <div className="input-group" style={{ width: "210px" }}>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handlePrevYear}
                >
                  <i className="fe fe-arrow-left-circle"></i>
                </button>
                <input
                  type="text"
                  className="form-control text-center fw-semibold form-control"
                  value="2024-25"
                  readOnly
                  style={{ backgroundColor: "#f8f9fa" }}
                />
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleNextYear}
                >
                  <i className="fe fe-arrow-right-circle"></i>
                </button>
              </div>
            </div>
            &nbsp;
            <div className="col-md-4 mx-5">
              <label className="form-label mb-0">Date of Issue</label>
              <input
                type="date"
                className="form-control"
                defaultValue="2025-07-25"
              />
            </div>
          </div>

          {/* Search & Actions */}
          <div className="row d-flex align-items-center g-2 mb-4">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="All Employees"
                style={{ fontSize: "14px" }}
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-custom"
                onClick={handleGenerate}
                style={{ fontSize: "14px" }}
              >
                <i className="bi-file-earmark-pdf-fill"></i> Generate
              </button>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-custom"
                onClick={handleSendEmail}
                style={{ fontSize: "14px" }}
              >
                <i
                  class="fe fe-at-sign"
                  data-bs-toggle="tooltip"
                  aria-label="fe fe-at-sign"
                  data-bs-original-title="fe fe-at-sign"
                ></i>{" "}
                Send by E-Mail
              </button>
            </div>
          </div>

          {/* Report History */}
          <h6>
            <b>Report History</b>
          </h6>
       <div
  className="table-responsive shadow-sm bg-white p-2 rounded-4 overflow-hidden mt-3"
  style={{ border: "1px solid #dee2e6" }}
>
  <table
    className="table table-bordered mb-0 align-middle"
    style={{
      borderRadius: "12px",
      overflow: "hidden",
    }}
  >
    <thead
      className="table-light text-center"
      style={{
        fontWeight: "600",
        fontSize: "13px",
      }}
    >
      <tr>
        <th>DESCRIPTION</th>
        <th>REQUESTED ON</th>
        <th>DOWNLOAD</th>
      </tr>
    </thead>
    <tbody className="text-center" style={{ fontSize: "14px" }}>
      <tr>
        <td colSpan="3" className="text-muted py-3">
          No scheduled reports found.
        </td>
      </tr>
    </tbody>
  </table>
</div>

        </div>

        {/* Right Side Info Box */}
        <div className="col-lg-6 mt-3 mt-lg-0">
          <br></br>
          <div className="info-box">
            <h6 style={{fontSize:"15px"}}>
              <b>About Income Tax FORM-16</b>
            </h6>
            <ul className="mb-3">
              <li style={{ fontSize: "14px" }}>
                FORM-16/16A is the certificate of deduction of tax at source and
                issued on deduction of tax by the employer on behalf of the
                employees.
              </li>
              <li style={{ fontSize: "14px" }}>
                These certificates provide details of TDS / TCS for various
                transactions between deductor and deductee.
              </li>
              <li style={{ fontSize: "14px" }}>
                You can view bifurcation of salary in various heads, effect of
                income tax declarations (investments and others) on income tax.
              </li>
              <li style={{ fontSize: "14px" }}>
                This certificate should be downloaded after the payroll
                processing is finished for the last month of the fiscal year
                i.e. MARCH.
              </li>
            </ul>

            <h6 style={{fontSize:"15px"}}>
              <b>FORM-16 Generated from Runtime HRMS</b>{" "}
              <span class="badge bg-primary">Important</span>
            </h6>
            <ul>
              <li style={{ fontSize: "14px" }}>
                FORM-16 generated from Runtime HRMS is for reference purpose
                only.
              </li>
              <li style={{ fontSize: "14px" }}>
                This form/document should not be used as a legal document to
                apply for loans or submit as income proof.
              </li>
              <li style={{ fontSize: "14px" }}>
                To download actual FORM-16 based on TDS deposited, visit the{" "}
                <a
                  href="https://www.tdscpc.gov.in/app/tapn/tdstcscredit.xhtml"
                  target="_blank"
                  rel="noreferrer"
                >
                  TRACES website <i className="bi bi-box-arrow-up-right"></i>
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTaxForm16;
