import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrump from "../../Layout/UI/Breadcrump";
import { Row, Col, Form } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

const Tdsreturn = () => {
const fields = [
    {
      label: (
        <>
          Select Period <span className="text-danger">*</span>
        </>
      ),
      type: "select",
      options: ["- Select -", "January", "February", "March"],
      showCheckbox: true,
    },
    {
      label: (
        <>
          Deposit by book entry <span className="text-danger">*</span>
        </>
      ),
      type: "select",
      options: ["No", "Yes"],
    },
    {
      label: "Challan Serial No.",
      type: "input",
      inputType: "text",
    },
    {
      label: "Minor Head of Challan",
      type: "select",
      options: ["TDS Payable by Taxpayer", "TDS Paid by Book Entry"],
    },
    {
      label: (
        <>
          Bank Branch Code OR Form 24G Receipt Number{" "}
          <span className="text-danger">*</span>
        </>
      ),
      type: "input",
      inputType: "text",
    },
    {
      label: "Date of Challan / Transfer Voucher",
      type: "date",
    },
    {
      label: "Date of Payment",
      type: "date",
    },
    {
      label: (
        <>
          Date of Tax Deduction <FaInfoCircle className="text-primary ms-1" />
        </>
      ),
      type: "date",
    },
  ];

  // Define bottom part (amount fields)
  const amountFields = [
    "Income Tax",
    "Surcharge",
    "Cess",
    "Interest",
    "Others",
    "Fee",
  ];

  const initialChallan = {
    month: "",
    nilReturn: false,
    bookEntry: "No",
    serialNo: "",
    minorHead: "",
    branchCode: "",
    challanDate: "",
    paymentDate: "",
    deductionDate: "",
    incomeTax: "0",
    surcharge: "0",
    cess: "0",
    interest: "0",
    others: "0",
    fee: "0",
  };

  const initialForm = {
    year: "2025",
    quarter: "Quarter",
    regular24Q: "Yes",
    tokenNo: "",
    employerAddressChange: "No",
    responsibleAddressChange: "No",
    challans: [initialChallan],
  };

  const [formData, setFormData] = useState(initialForm);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChallanChange = (index, field, value) => {
    const updated = [...formData.challans];
    updated[index][field] = value;
    setFormData({ ...formData, challans: updated });
  };

  // ✅ Generate Return
  const handleSubmit = () => {
    if (!formData.tokenNo) {
      toast.error("❌ Token No is required!");
      return;
    }
    console.log("Submitting TDS Return:", formData);
    toast.success("✅ Return generated! (Check console for data)");
  };

  // ✅ Reset form
  const handleReset = () => {
    toast.info("ℹ️ Form reset successfully!");
    setFormData(initialForm);
  };

  // ✅ Add challan
  const handleAddChallan = () => {
    setFormData((prev) => ({
      ...prev,
      challans: [...prev.challans, { ...initialChallan }],
    }));
    toast.success("✅ Challan added!");
  };

  // ✅ Remove challan
  const handleRemoveChallan = (index) => {
    if (formData.challans.length === 1) {
      toast.warning("⚠️ At least one challan is required!");
      return;
    }
    const updated = formData.challans.filter((_, i) => i !== index);
    setFormData({ ...formData, challans: updated });
    toast.success("🗑️ Challan removed!");
  };

  return (
    <div>
      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Breadcrumbs */}
      <Breadcrump
        items={[
          { label: "Dashboard", link: "/dashboard/overviews" },
          { label: "Reports", link: "" },
          { label: "statutoryreports", link: "" },
          { label: "TDS Return", active: true },
        ]}
      />

      <h6 style={{ fontSize: "15px" }}>
        <b>TDS Return</b>
      </h6>
      <p style={{ fontSize: "14px" }}>
        Download Quarterly TDS return for tax deducted during a quarter.
      </p>
      <div className="card shadow w-100" style={{ fontSize: "14px" }}>
        <table border="1" width="100%" cellPadding="8" cellSpacing="0">
          <thead>
            <tr
              className="table-header"
              style={{ textAlign: "start", background: "#f2f2f2" }}
            >
              <th colSpan="6">
                <h6>
                  <b>TDS Return Details</b>
                </h6>
              </th>
            </tr>
          </thead>
          <tbody>
            <div className="row">
              <div className="col-auto">
                {/* Year and Quarter */}
                <tr>
                  <td>
                    Return Period <span className="text-danger">*</span>
                  </td>
                  <td>
                    <select
                      value={formData.year}
                      className="w-100"
                      onChange={(e) => handleChange("year", e.target.value)}
                    >
                      <option>2025</option>
                      <option>2024</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={formData.quarter}
                      className="w-100"
                      onChange={(e) => handleChange("quarter", e.target.value)}
                    >
                      <option>Quarter</option>
                      <option>Q2</option>
                      <option>Q3</option>
                      <option>Q4</option>
                    </select>
                  </td>
                  <td colSpan="3" align="right">
                    <i className="fe fe-message-square fs-2 bg-info rounded-5"></i>
                  </td>
                </tr>

                {/* Regular 24Q */}
                <tr>
                  <td>
                    Regular 24Q for previous period{" "}
                    <span className="text-danger">*</span>
                  </td>
                  <td colSpan="2">
                    <select
                      value={formData.regular24Q}
                      className="w-100"
                      onChange={(e) =>
                        handleChange("regular24Q", e.target.value)
                      }
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                </tr>

                {/* Token No */}
                <tr>
                  <td>
                    Token No <span className="text-danger">*</span>
                  </td>
                  <td colSpan="2">
                    <input
                      type="text"
                      placeholder="From Previous Regular 24Q"
                      value={formData.tokenNo}
                      onChange={(e) => handleChange("tokenNo", e.target.value)}
                    />
                  </td>
                </tr>

                {/* Address Changes */}
                <tr>
                  <td>
                    Change in Employer Address{" "}
                    <span className="text-danger">*</span>
                  </td>
                  <td colSpan="2">
                    <select
                      value={formData.employerAddressChange}
                      className="w-100"
                      onChange={(e) =>
                        handleChange("employerAddressChange", e.target.value)
                      }
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Change in Responsible Person Address{" "}
                    <span className="text-danger">*</span>
                  </td>
                  <td colSpan="2">
                    <select
                      value={formData.responsibleAddressChange}
                      className="w-100"
                      onChange={(e) =>
                        handleChange("responsibleAddressChange", e.target.value)
                      }
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </td>
                </tr>
              </div>
            </div>

            {/* Challan Header */}
            <tr style={{ background: "#f2f2f2" }}>
              <th colSpan="6">Challan Details</th>
            </tr>

            <div className="row">
     <div className="border rounded p-3">
      {/* === TOP SECTION === */}
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <Row className="align-items-center">
            {/* Left side label */}
            <Col md={2}>
              <label className="fw-semibold">{field.label}</label>
            </Col>

            {/* Right side months */}
            <Col md={10}>
              <Row>
                {[1, 2, 3].map((month) => (
                  <Col md={4} key={month}>
                    {/* <h6 className="text-center text-secondary fw-semibold mb-2">
                      Month {month}
                    </h6> */}

                    {/* Input / Select / Date */}
                    {field.type === "select" && (
                      <Form.Select className="mb-2">
                        {field.options.map((opt, i) => (
                          <option key={i}>{opt}</option>
                        ))}
                      </Form.Select>
                    )}

                    {field.type === "input" && (
                      <Form.Control
                        type={field.inputType}
                        className="mb-2"
                        placeholder={field.label}
                      />
                    )}

                    {field.type === "date" && (
                      <Form.Control type="date" className="mb-2" />
                    )}

                    {/* Nil Tax Return Checkbox */}
                    {field.showCheckbox && (
                      <Form.Check
                        type="checkbox"
                        label={
                          <>
                            Nil Tax Return{" "}
                            <FaInfoCircle className="text-primary ms-1" />
                          </>
                        }
                      />
                    )}
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      ))}

      {/* === AMOUNT SECTION === */}
      <div className="border-top pt-3">
        {amountFields.map((label, index) => (
          <Row className="align-items-center mb-3" key={index}>
            <Col md={2}>
              <label className="fw-semibold">{label}</label>
            </Col>
            <Col md={10}>
              <Row>
                {[1, 2, 3].map((month) => (
                  <Col md={4} key={month}>
                    <Form.Control
                      type="number"
                      placeholder="0"
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        ))}
      </div>
    </div>
            </div>
          </tbody>

          <tfoot>
            <tr>
              <td
                colSpan={formData.challans.length}
                style={{ textAlign: "start" }}
              >
                <button
                  type="button"
                  className="btn btn-info mt-3 "
                  onClick={handleSubmit}
                >
                  <i className="bi bi-check-circle"></i> Generate Return
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Tdsreturn;
