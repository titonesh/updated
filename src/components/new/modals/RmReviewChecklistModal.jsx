// import React, { useState, useEffect } from "react";
// // Ant Design components used by the user's code
// import {
//   Button,
//   Table,
//   Tag,
//   Modal,
//   Input,
//   Card,
//   Descriptions,
//   message,
//   Space,
//   Upload,
// } from "antd";
// // Ant Design Icons used by the user's code
// import {
//   UploadOutlined,
//   EyeOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   ClockCircleOutlined,
//   SyncOutlined,
// } from "@ant-design/icons";

// import { useSubmitRmChecklistMutation } from "../../../api/checklistApi";

// // Theme Colors (kept here as the modal also uses them for document status)
// const PRIMARY_BLUE = "#164679"; // Dark corporate blue
// const ACCENT_LIME = "#b5d334"; // Key accent for success/approval
// const HIGHLIGHT_GOLD = "#fcb116"; // Accent for warnings/deferral
// const LIGHT_YELLOW = "#fcd716"; // Secondary warning/pending accent
// const SECONDARY_PURPLE = "#7e6496"; // Tertiary accent for labels/secondary info

// // Custom CSS for a clean, professional look
// const customStyles = `
//   /* Modal Header Customization */
//   .ant-modal-header {
//       background-color: ${PRIMARY_BLUE} !important;
//       padding: 18px 24px !important;
//   }
//   .ant-modal-title {
//       color: white !important;
//       font-size: 1.15rem !important;
//       font-weight: 700 !important;
//       letter-spacing: 0.5px;
//   }
//   .ant-modal-close-x {
//       color: white !important;
//   }

//   /* Info Card (Descriptions) Styling */
//   .checklist-info-card .ant-card-head {
//     border-bottom: 2px solid ${ACCENT_LIME} !important;
//   }
//   .checklist-info-card .ant-descriptions-item-label {
//       font-weight: 600 !important;
//       color: ${SECONDARY_PURPLE} !important;
//       padding-bottom: 4px;
//   }
//   .checklist-info-card .ant-descriptions-item-content {
//       color: ${PRIMARY_BLUE} !important;
//       font-weight: 700 !important;
//       font-size: 13px !important;
//   }

//   /* Table Customization */
//   .doc-table.ant-table-wrapper table {
//     border: 1px solid #e0e0e0;
//     border-radius: 8px;
//     overflow: hidden;
//   }
//   .doc-table .ant-table-thead > tr > th {
//       background-color: #f7f9fc !important;
//       color: ${PRIMARY_BLUE} !important;
//       font-weight: 600 !important;
//       padding: 12px 16px !important;
//   }
//   .doc-table .ant-table-tbody > tr > td {
//       padding: 10px 16px !important;
//       border-bottom: 1px dashed #f0f0f0 !important;
//   }

//   /* Input/Select Styling */
//   .ant-input, .ant-select-selector {
//     border-radius: 6px !important;
//     border-color: #e0e0e0 !important;
//   }
//   .ant-input:focus, .ant-select-focused .ant-select-selector {
//     box-shadow: 0 0 0 2px rgba(22, 70, 121, 0.2) !important;
//     border-color: ${PRIMARY_BLUE} !important;
//   }

//   /* Tag Customization (Pill Shape) */
//   .status-tag {
//     font-weight: 700 !important;
//     border-radius: 999px !important;
//     padding: 3px 8px !important;
//     text-transform: capitalize;
//     min-width: 80px;
//     text-align: center;
//     display: inline-flex;
//     align-items: center;
//     gap: 4px;
//     justify-content: center;
//   }
//   /* Footer Button Styling */
//   .ant-modal-footer .ant-btn {
//       border-radius: 8px;
//       font-weight: 600;
//       height: 38px;
//       padding: 0 16px;
//   }
//   .ant-modal-footer .ant-btn-primary {
//       background-color: ${PRIMARY_BLUE} !important;
//       border-color: ${PRIMARY_BLUE} !important;
//   }
// `;

// const ReviewChecklistModal = ({ checklist, open, onClose }) => {
//   const [docs, setDocs] = useState([]);
//   const [deferralModal, setDeferralModal] = useState({
//     open: false,
//     docIdx: null,
//   });
//   const [deferralComment, setDeferralComment] = useState("");

//   const [submitRmChecklist, { isLoading }] = useSubmitRmChecklistMutation();

//   useEffect(() => {
//     if (!checklist || !checklist.documents) return;

//     // 1. FLATTEN the NESTED documents structure
//     const flattenedDocs = checklist.documents.reduce((acc, categoryObj) => {
//       // Iterate over the docList inside each category
//       const categoryDocs = categoryObj.docList.map((doc, index) => ({
//         // Copy document properties (including _id from DB)
//         ...doc,
//         // Add or overwrite the category name for display
//         category: categoryObj.category,
//         // Important: Assign a continuous, unique docIdx for the local state/table rowKey
//         docIdx: acc.length + index,
//       }));

//       // Add all documents from this category to the accumulator
//       return acc.concat(categoryDocs);
//     }, []);

//     // 2. Map and prepare the necessary local state fields (like status/comment defaults)
//     const preparedDocs = flattenedDocs.map((doc, idx) => ({
//       ...doc,
//       // The docIdx is now a continuous index from the reduce step
//       docIdx: idx,
//       // Ensure default local state values if they are null/undefined
//       status: doc.status || "pending",
//       comment: doc.comment || "",
//       action: doc.action || "pending",
//       fileUrl: doc.fileUrl || null,
//       deferralRequested: doc.deferralRequested || false,
//       deferralReason: doc.deferralReason || "",
//     }));

//     setDocs(preparedDocs); // Set the flat, prepared array to state
//   }, [checklist]);

//   const isApprovedOrUnassigned =
//     checklist.status === "approved" || !checklist.assignedToCoChecker;

//   const handleCommentChange = (idx, value) => {
//     const updated = [...docs];
//     updated[idx].comment = value;
//     setDocs(updated);
//   };

//   // const handleDelete = (idx) => {
//   //   const updated = docs.filter((_, i) => i !== idx);
//   //   // Re-index remaining documents
//   //   const reIndexed = updated.map((doc, i) => ({ ...doc, docIdx: i }));
//   //   setDocs(reIndexed);
//   // };

//   const handleFileUpload = (docIdx, file) => {
//     const updated = [...docs];
//     updated[docIdx].fileUrl = URL.createObjectURL(file);
//     updated[docIdx].status = "uploaded";
//     setDocs(updated);
//     message.success(`File "${file.name}" uploaded successfully!`);
//     return false; // Prevent default Antd upload behavior
//   };

//   const openDeferral = (docIdx) => {
//     // Pre-populate comment if already deferred
//     const doc = docs.find((d) => d.docIdx === docIdx);
//     setDeferralComment(doc?.deferralReason || "");
//     setDeferralModal({ open: true, docIdx });
//   };

//   const submitDeferral = () => {
//     if (!deferralComment.trim())
//       return message.error("Enter a deferral reason");
//     const updated = [...docs];
//     const docIndex = updated.findIndex(
//       (doc) => doc.docIdx === deferralModal.docIdx
//     );
//     if (docIndex !== -1) {
//       updated[docIndex].status = "deferred";
//       updated[docIndex].deferralReason = deferralComment;
//       updated[docIndex].deferralRequested = true;
//       setDocs(updated);
//       message.success("Deferral request submitted");
//     }
//     setDeferralModal({ open: false, docIdx: null });
//   };

//   const submitToCO = async () => {
//     try {
//       if (!checklist?._id) throw new Error("Checklist ID missing");

//       const payload = {
//         checklistId: checklist._id,
//         documents: docs.map((doc) => ({
//           _id: doc._id || undefined,
//           name: doc.name,
//           category: doc.category,
//           status: doc.status,
//           action: doc.action,
//           comment: doc.comment,
//           fileUrl: doc.fileUrl || null,
//           deferralReason: doc.deferralReason || null,
//         })),
//       };

//       const response = await submitRmChecklist(payload);
//       message.success(response.data);
//       onClose();
//     } catch (err) {
//       console.error(err);
//       message.error(err?.data?.error || "Failed to submit checklist to CO");
//     }
//   };

//   const renderStatusTag = (status) => {
//     const statusMap = {
//       pending: {
//         color: SECONDARY_PURPLE,
//         text: "Pending",
//         icon: <ClockCircleOutlined />,
//       },
//       uploaded: {
//         color: PRIMARY_BLUE,
//         text: "Uploaded",
//         icon: <UploadOutlined />,
//       },
//       approved: {
//         color: ACCENT_LIME,
//         text: "Approved",
//         icon: <CheckCircleOutlined />,
//       },
//       deferred: {
//         color: HIGHLIGHT_GOLD,
//         text: "Deferred",
//         icon: <CloseCircleOutlined />,
//       },
//     };
//     const { color, text, icon } = statusMap[status] || {
//       color: "default",
//       text: status,
//       icon: <SyncOutlined spin />,
//     };

//     return (
//       <Tag
//         className="status-tag"
//         style={{
//           color: color,
//           backgroundColor: color + "22", // Light background tint
//           borderColor: color + "55",
//         }}
//       >
//         {icon}
//         {text}
//       </Tag>
//     );
//   };

//   const columns = [
//     {
//       title: "Document Name",
//       dataIndex: "name",
//       width: 280,
//       render: (text, record) => (
//         <Input
//           size="small"
//           value={record.name}
//           disabled
//           onChange={(e) => {
//             const updated = [...docs];
//             updated[record.docIdx].name = e.target.value;
//             setDocs(updated);
//           }}
//         />
//       ),
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       width: 120,
//       render: (text) => (
//         <span
//           style={{ fontSize: 12, color: SECONDARY_PURPLE, fontWeight: "500" }}
//         >
//           {text}
//         </span>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       width: 120,
//       render: (status) => renderStatusTag(status),
//     },
//     {
//       title: "Comment",
//       dataIndex: "comment",
//       width: 250,
//       render: (text, record) => (
//         <Input.TextArea
//           rows={1}
//           size="small"
//           value={text}
//           onChange={(e) => handleCommentChange(record.docIdx, e.target.value)}
//         />
//       ),
//     },
//     {
//       title: "Actions",
//       width: 300,
//       render: (_, record) => (
//         <Space size={4}>
//           <Upload
//             showUploadList={false}
//             beforeUpload={(file) => handleFileUpload(record.docIdx, file)}
//           >
//             <Button
//               size="small"
//               icon={<UploadOutlined />}
//               style={{
//                 borderRadius: 6,
//                 color: PRIMARY_BLUE,
//                 borderColor: PRIMARY_BLUE + "55",
//               }}
//             >
//               Upload
//             </Button>
//           </Upload>
//           {record.fileUrl && (
//             <Button
//               size="small"
//               icon={<EyeOutlined />}
//               onClick={() => window.open(record.fileUrl, "_blank")}
//               style={{
//                 borderRadius: 6,
//                 color: SECONDARY_PURPLE,
//                 borderColor: SECONDARY_PURPLE + "55",
//               }}
//             >
//               View
//             </Button>
//           )}
//           {/* <Button
//             size="small"
//             danger
//             onClick={() => handleDelete(record.docIdx)}
//             style={{ borderRadius: 6 }}
//           >
//             Delete
//           </Button> */}
//           <Button
//             size="small"
//             disabled={record.deferralRequested && record.status === "deferred"}
//             onClick={() => openDeferral(record.docIdx)}
//             style={{
//               borderRadius: 6,
//               borderColor: HIGHLIGHT_GOLD + "55",
//               backgroundColor:
//                 record.deferralRequested && record.status === "deferred"
//                   ? LIGHT_YELLOW + "88"
//                   : "white",
//               color:
//                 record.deferralRequested && record.status === "deferred"
//                   ? PRIMARY_BLUE
//                   : HIGHLIGHT_GOLD,
//             }}
//           >
//             {record.deferralRequested && record.status === "deferred"
//               ? "Deferred"
//               : "Request Deferral"}
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <>
//       <style>{customStyles}</style> {/* Inject Custom Styles */}
//       <Modal
//         title={`Review Checklist — ${checklist?.title || ""}`}
//         open={open}
//         onCancel={onClose}
//         width={1100} // Increased width for better table fit
//         bodyStyle={{ padding: "0 24px 24px" }}
//         footer={[
//           <Button key="cancel" onClick={onClose}>
//             Close
//           </Button>,
//           <Button
//             key="submit"
//             type="primary"
//             loading={isLoading}
//             // disabled={isApprovedOrUnassigned}
//             onClick={submitToCO}
//           >
//             Submit to CO
//           </Button>,
//         ]}
//       >
//         {checklist && (
//           <>
//             <Card
//               className="checklist-info-card"
//               size="small"
//               title={
//                 <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
//                   Checklist Details
//                 </span>
//               }
//               style={{
//                 marginBottom: 18,
//                 marginTop: 24,
//                 borderRadius: 10,
//                 border: `1px solid #e0e0e0`,
//               }}
//             >
//               <Descriptions size="middle" column={{ xs: 1, sm: 2, lg: 3 }}>
//                 <Descriptions.Item label="DCL No">
//                   {checklist.dclNo}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Title">
//                   {checklist.title}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Loan Type">
//                   {checklist.loanType}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Created By">
//                   {checklist.createdBy?.name}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="RM">
//                   {checklist.assignedToRM?.name}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Co-Checker">
//                   {checklist.assignedToCoChecker?.name || "Pending"}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             <h3
//               style={{
//                 margin: "16px 0 8px",
//                 color: PRIMARY_BLUE,
//                 fontWeight: "bold",
//               }}
//             >
//               Required Documents
//             </h3>

//             <Table
//               className="doc-table"
//               rowKey="docIdx"
//               size="middle"
//               pagination={false}
//               dataSource={docs}
//               columns={columns}
//               bordered={false}
//               scroll={{ x: "max-content" }}
//             />
//           </>
//         )}
//       </Modal>
//       {/* Deferral Modal */}
//       <Modal
//         title={
//           <span style={{ color: PRIMARY_BLUE, fontWeight: "bold" }}>
//             Request Deferral Reason
//           </span>
//         }
//         open={deferralModal.open}
//         onCancel={() => setDeferralModal({ open: false, docIdx: null })}
//         footer={[
//           <Button
//             key="cancel-defer"
//             onClick={() => setDeferralModal({ open: false, docIdx: null })}
//             style={{ borderRadius: 6 }}
//           >
//             Cancel
//           </Button>,
//           <Button
//             key="submit-defer"
//             type="primary"
//             onClick={submitDeferral}
//             style={{
//               backgroundColor: ACCENT_LIME,
//               borderColor: ACCENT_LIME,
//               color: ACCENT_LIME,
//               fontWeight: "bold",
//               borderRadius: 6,
//             }}
//           >
//             Submit Deferral
//           </Button>,
//         ]}
//       >
//         <p style={{ marginBottom: 12, color: SECONDARY_PURPLE }}>
//           Please clearly state the justification for requesting a deferral for
//           this document.
//         </p>
//         <Input.TextArea
//           rows={4}
//           size="middle"
//           value={deferralComment}
//           onChange={(e) => setDeferralComment(e.target.value)}
//           placeholder="Enter detailed deferral reason..."
//           style={{ borderRadius: 8 }}
//         />
//       </Modal>
//     </>
//   );
// };

// export default ReviewChecklistModal;


import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Tag,
  Modal,
  Input,
  Card,
  Descriptions,
  message,
  Space,
  Upload,
  Select,
} from "antd";

import {
  UploadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import { useSubmitRmChecklistMutation } from "../../../api/checklistApi";

// ------------------ COLORS ------------------
const PRIMARY_BLUE = "#164679";
const ACCENT_LIME = "#b5d334";
const SECONDARY_PURPLE = "#7e6496";

// CUSTOM STYLES ------------------
const customStyles = `... same as yours ...`;

const ReviewChecklistModal = ({ checklist, open, onClose }) => {
  const [docs, setDocs] = useState([]);
  const [rmGeneralComment, setRmGeneralComment] = useState("");

  const [submitRmChecklist, { isLoading }] = useSubmitRmChecklistMutation();

  // ------------------------------ PREPARE DOCS
  useEffect(() => {
    if (!checklist || !checklist.documents) return;

    const flattenedDocs = checklist.documents.reduce((acc, categoryObj) => {
      const filteredDocs = categoryObj.docList
        .filter((doc) => doc.name?.trim() !== "")
        .map((doc) => ({
          ...doc,
          category: categoryObj.category,
        }));
      return acc.concat(filteredDocs);
    }, []);

    const preparedDocs = flattenedDocs.map((doc, idx) => ({
      ...doc,
      docIdx: idx,
      status: doc.status || "pending",
      comment: doc.comment || "",
      action: doc.action || "pending",
      fileUrl: doc.fileUrl || null,
      rmStatus: doc.rmStatus || "Pending from Customer",
      deferralReason: doc.deferralReason || "",
    }));

    setDocs(preparedDocs);
  }, [checklist]);

  // ------------------------------ STATUS TAG
  const renderStatusTag = (key) => {
    const map = {
      sighted: { color: PRIMARY_BLUE, text: "Sighted", icon: <EyeOutlined /> },
      pending: { color: "#fadb14", text: "Pending", icon: <ClockCircleOutlined /> },
      submitted: { color: "#52c41a", text: "Submitted", icon: <CheckCircleOutlined /> },
      deferred: { color: "#ff4d4f", text: "Deferred", icon: <CloseCircleOutlined /> },
    };

    const s = map[key?.toLowerCase()] || {
      color: "gray",
      text: key || "Unknown",
      icon: <SyncOutlined spin />,
    };

    return (
      <Tag
        className="status-tag"
        style={{
          color: s.color,
          backgroundColor: s.color + "22",
          borderColor: s.color + "55",
        }}
      >
        {s.icon}
        {s.text}
      </Tag>
    );
  };

  // ------------------------------ UPLOAD
  const handleFileUpload = (docIdx, file) => {
    setDocs((prev) =>
      prev.map((d, idx) => (idx === docIdx ? { ...d, fileUrl: URL.createObjectURL(file) } : d))
    );
    message.success(`File "${file.name}" uploaded successfully!`);
    return false;
  };

  // ------------------------------ SUBMIT
  const submitToCO = async () => {
    try {
      const payload = {
        checklistId: checklist._id,
        documents: docs.map((doc) => ({
          _id: doc._id,
          name: doc.name,
          category: doc.category,
          status: doc.status,
          action: doc.action,
          comment: doc.comment,
          fileUrl: doc.fileUrl,
          deferralReason: doc.deferralReason,
          rmStatus: doc.rmStatus,
        })),
        rmGeneralComment,
      };

      const response = await submitRmChecklist(payload);
      message.success(response.data);
      onClose();
    } catch (err) {
      message.error("Failed to submit checklist");
      console.error(err);
    }
  };

  // ------------------------------ SUMMARY COUNTS
  const total = docs.length;
  const pending = docs.filter((d) => d.rmStatus === "Pending from Customer").length;
  const submitted = docs.filter((d) => d.rmStatus === "Submitted for review").length;
  const deferred = docs.filter((d) => d.rmStatus === "Deferral Requested").length;

  const progressPercent =
    total === 0 ? 0 : Math.round((submitted / total) * 100);

  // ------------------------------ COLUMNS
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      width: 100,
      render: (text) => (
        <span style={{ color: SECONDARY_PURPLE, fontWeight: 500 }}>{text}</span>
      ),
    },
    {
      title: "Document Name",
      dataIndex: "name",
      width: 150,
      render: (text) => <Input size="small" value={text} disabled />,
    },
    {
      title: "Status from CO",
      dataIndex: "status",
      width: 100,
      render: (status) => renderStatusTag(status),
    },
    {
      title: "Comment from CO",
      dataIndex: "comment",
      width: 150,
      render: (text) => <Input.TextArea rows={1} size="small" value={text} disabled />,
    },
    {
      title: "Actions",
      width: 150,
      render: (_, record) => (
        <Space size={4}>
          <Upload showUploadList={false} beforeUpload={(f) => handleFileUpload(record.docIdx, f)}>
            <Button size="small" icon={<UploadOutlined />} style={{ borderRadius: 6 }}>
              Upload
            </Button>
          </Upload>

          {record.fileUrl && (
            <>
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() => window.open(record.fileUrl, "_blank")}
                style={{ borderRadius: 6 }}
              >
                View
              </Button>
              <Button
                size="small"
                danger
                onClick={() => {
                  setDocs((p) =>
                    p.map((d, i) => (i === record.docIdx ? { ...d, fileUrl: null } : d))
                  );
                  message.success("Uploaded file deleted.");
                }}
              >
                Delete
              </Button>
            </>
          )}
        </Space>
      ),
    },
    {
      title: "RM Status",
      width: 200,
      render: (_, record) => {
        const statusKey =
          {
            "Pending from Customer": "pending",
            "Submitted for review": "submitted",
            "Deferral Requested": "deferred",
          }[record.rmStatus] || "pending";

        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {renderStatusTag(statusKey)}

            {record.rmStatus === "Deferral Requested" && (
              <Input
                size="small"
                placeholder="Deferral no."
                value={record.deferralReason}
                style={{ width: 120 }}
                onChange={(e) =>
                  setDocs((prev) =>
                    prev.map((d, idx) =>
                      idx === record.docIdx ? { ...d, deferralReason: e.target.value } : d
                    )
                  )
                }
              />
            )}
          </div>
        );
      },
    },
    {
      title: "RM Actions",
      width: 150,
      render: (_, record) => (
        <Select
          size="small"
          value={record.rmStatus}
          style={{ width: "100%" }}
          onChange={(value) =>
            setDocs((prev) =>
              prev.map((d, idx) =>
                idx === record.docIdx ? { ...d, rmStatus: value } : d
              )
            )
          }
          options={[
            { label: "Pending from Customer", value: "Pending from Customer" },
            { label: "Submitted for review", value: "Submitted for review" },
            { label: "Deferral Requested", value: "Deferral Requested" },
          ]}
        />
      ),
    },
  ];

  // ------------------------------ RENDER
  return (
    <>
      <style>{customStyles}</style>

      <Modal
        title={`Review Checklist — ${checklist?.title || ""}`}
        open={open}
        onCancel={onClose}
        width={1100}
        footer={[
          <Button key="cancel" onClick={onClose}>Close</Button>,
          <Button key="submit" type="primary" loading={isLoading} onClick={submitToCO}>
            Submit
          </Button>,
        ]}
      >
        {checklist && (
          <>
            <Card
              className="checklist-info-card"
              size="small"
              title="Checklist Details"
              style={{ marginBottom: 18, marginTop: 24 }}
            >
              <Descriptions column={{ xs: 1, sm: 2, lg: 3 }}>
                <Descriptions.Item label="DCL No">{checklist.dclNo}</Descriptions.Item>
                <Descriptions.Item label="Title">{checklist.title}</Descriptions.Item>
                <Descriptions.Item label="Loan Type">{checklist.loanType}</Descriptions.Item>
                <Descriptions.Item label="Created By">{checklist.createdBy?.name}</Descriptions.Item>
                <Descriptions.Item label="RM">{checklist.assignedToRM?.name}</Descriptions.Item>
                <Descriptions.Item label="Co-Checker">
                  {checklist.assignedToCoChecker?.name || "Pending"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* ------------------ SUMMARY BAR + PROGRESS BAR (UPDATED) ------------------ */}
            <div
              style={{
                padding: "16px",
                background: "#f7f9fc",
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                marginBottom: 18,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontWeight: "700", color: PRIMARY_BLUE }}>
                  Total Documents: {total}
                </div>

                <div style={{ fontWeight: "700", color: SECONDARY_PURPLE }}>
                  Pending: {pending}
                </div>

                <div style={{ fontWeight: "700", color: ACCENT_LIME }}>
                  Submitted: {submitted}
                </div>

                <div style={{ fontWeight: "700", color: "#ff4d4f" }}>
                  Deferred: {deferred}
                </div>
              </div>

              <div style={{ width: "100%", height: 12, background: "#e0e0e0", borderRadius: 50 }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progressPercent}%`,
                    background: PRIMARY_BLUE,
                    borderRadius: 50,
                    transition: "width 0.4s ease",
                  }}
                ></div>
              </div>

              <div
                style={{
                  textAlign: "right",
                  marginTop: 4,
                  fontWeight: "700",
                  color: PRIMARY_BLUE,
                }}
              >
                {progressPercent}%
              </div>
            </div>

            {/* ------------------------------------------- */}

            <h3 style={{ color: PRIMARY_BLUE, fontWeight: "bold" }}>Required Documents</h3>

            <Table
              className="doc-table"
              rowKey="docIdx"
              size="middle"
              pagination={false}
              dataSource={docs}
              columns={columns}
              scroll={{ x: "max-content" }}
            />

            <h3 style={{ marginTop: 24, color: PRIMARY_BLUE, fontWeight: "bold" }}>
              RM General Comment
            </h3>

            <Input.TextArea
              rows={3}
              value={rmGeneralComment}
              onChange={(e) => setRmGeneralComment(e.target.value)}
              placeholder="Enter RM general remarks..."
              style={{ borderRadius: 8, marginTop: 8 }}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default ReviewChecklistModal;
