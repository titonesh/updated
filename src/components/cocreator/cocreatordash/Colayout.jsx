// // import React, { useState } from "react";
// // import { Menu } from "antd";
// // import {
// //   HomeOutlined,
// //   FileTextOutlined,
// //   ClockCircleOutlined,
// //   CheckCircleOutlined,
// //   TeamOutlined,
// //   SettingOutlined,
// //   BellOutlined,
// //   UserOutlined,
// //   MenuOutlined,
// // } from "@ant-design/icons";
// // // import CombinedCharts from "../../stats";
// // // import Creatchecklistpage from "../creatorpage";
// // // import CompletedChecklists from "../checklists/CompletedChecklists";
// // // import DeferredChecklists from "../checklists/DeferredChecklists";
// // // import ActiveChecklists from "../checklists/ActiveChecklists";
// // // import ChecklistModal from "../checklists/ChecklistModal";
// // // import ChecklistDrawerCO from "../checklists/ChecklistDrawerCO";
// // // import ChecklistActionDrawerRM from "../checklists/ChecklistActionDrawerRM";
// // // import ChecklistTableCO from "../checklists/ChecklistTableCO";
// // // import ChecklistTableRM from "../checklists/ChecklistTableRM";
// // // import COChecklistPage from "../checklists/COChecklistPage";
// // // import RMChecklistPage from "../checklists/RMChecklistPage";
// // // import DashboardCo from "../checklists/dashboard";
// // import BaseChecklistTableCo from "./coChecker";
// // // import RMUpload from "../../Rm/RmUpload";
// // // import ChecklistsTablel from "../../Rm/checkpage";
// // // import RMUploadd from "../../Rm/rmTbb";
// // import CoChecklistPage from "../../new/cocreater/CoChecklistPage";
// // import { useSelector } from "react-redux";
// // import StatsReportModal from "../../new/cocreater/components/StatsReportModal";

// // // Sidebar Component
// // const Sidebar = ({
// //   selectedKey,
// //   setSelectedKey,
// //   collapsed,
// //   toggleCollapse,
// // }) => {
// //   const handleClick = (e) => {
// //     setSelectedKey(e.key);
// //   };

// //   return (
// //     <div
// //       style={{
// //         width: collapsed ? 80 : 250,
// //         background: "#3A2A82",
// //         paddingTop: 20,
// //         transition: "width 0.2s",
// //         color: "white",
// //       }}
// //     >
// //       <h2
// //         style={{
// //           textAlign: "center",
// //           fontSize: 22,
// //           marginBottom: 35,
// //           fontWeight: "bold",
// //         }}
// //       >
// //         {collapsed ? "N" : "CO creator Dashboard"}
// //       </h2>

// //       <Menu
// //         theme="dark"
// //         mode="inline"
// //         selectedKeys={[selectedKey]}
// //         onClick={handleClick}
// //         style={{ background: "#3A2A82" }}
// //         inlineCollapsed={collapsed}
// //         items={[
// //           // { key: "reports", icon: <SettingOutlined />, label: "Reports" },
// //           {
// //             key: "creatchecklist",
// //             icon: <ClockCircleOutlined />,
// //             label: "Create checklist",
// //           },
// //           {
// //             key: "myqueue",
// //             icon: <ClockCircleOutlined />,
// //             label: "My Queue",
// //           },
// //           {
// //             key: "active",
// //             icon: <ClockCircleOutlined />,
// //             label: "Active Dcls",
// //           },
// //           {
// //             key: "defferals",
// //             icon: <ClockCircleOutlined />,
// //             label: "Defferals",
// //           },
// //           { key: "reports", icon: <SettingOutlined />, label: "Reports" },
// //         ]}
// //       />

// //       <div
// //         style={{
// //           position: "absolute",
// //           bottom: 20,
// //           width: "100%",
// //           textAlign: "center",
// //         }}
// //       >
// //         <button
// //           onClick={toggleCollapse}
// //           style={{
// //             background: "#fff",
// //             color: "#3A2A82",
// //             border: "none",
// //             borderRadius: 4,
// //             padding: "5px 10px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           {collapsed ? "Expand" : "Collapse"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // // Navbar Component
// // const Navbar = ({ toggleSidebar }) => {
// //   return (
// //     <div
// //       style={{
// //         height: 60,
// //         background: "#fff",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "space-between",
// //         padding: "0 20px",
// //         boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
// //         position: "sticky",
// //         top: 0,
// //         zIndex: 100,
// //       }}
// //     >
// //       <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
// //         <MenuOutlined style={{ fontSize: 24 }} />
// //       </div>
// //       <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
// //         <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
// //         <UserOutlined style={{ fontSize: 20, cursor: "pointer" }} />
// //       </div>
// //     </div>
// //   );
// // };

// // // Main Layout Component
// // const MainLayout = () => {
// //   const { user } = useSelector((state) => state.auth);
// //   const userId = user?.id;
// //   const [selectedKey, setSelectedKey] = useState("dashboard");
// //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

// //   const toggleSidebar = () => {
// //     setSidebarCollapsed(!sidebarCollapsed);
// //   };

// //   const renderContent = () => {
// //     switch (selectedKey) {
// //       case "creatchecklist":
// //         return <CoChecklistPage userId={userId} />;
// //       case "myqueue":
// //         // return <ChecklistModal/>
// //         return <CoChecklistPage userId={userId} />;
// //       case "active":
// //         // return <ChecklistModal/>
// //         return <BaseChecklistTableCo userId={userId} />;
// //       case "defferals":
// //         return
// //       <StatsReportModal
// //         open={modalOpen}
// //         onClose={setModalOpen}
// //       />;

// //       case "reports":
// //         return <StatsReportModal />;
// //       default:
// //         return <h1>Dashboard Content</h1>;
// //     }
// //   };

// //   return (
// //     <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
// //       {/* Sidebar */}
// //       <Sidebar
// //         selectedKey={selectedKey}
// //         setSelectedKey={setSelectedKey}
// //         collapsed={sidebarCollapsed}
// //         toggleCollapse={toggleSidebar}
// //       />

// //       {/* Main Content */}
// //       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
// //         <Navbar toggleSidebar={toggleSidebar} />
// //         <div
// //           style={{
// //             padding: 20,
// //             flex: 1,
// //             overflowY: "auto",
// //             background: "#f0f2f5",
// //           }}
// //         >
// //           {renderContent()}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MainLayout;
// import { useSelector } from "react-redux";
// import React, { useState } from "react";
// const MainLayout = () => {
//   const { user } = useSelector((state) => state.auth);
//   const userId = user?.id;
//   const [selectedKey, setSelectedKey] = useState("dashboard");
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Modal state
//   const [modalOpen, setModalOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   const renderContent = () => {
//     switch (selectedKey) {
//       case "creatchecklist":
//         return <CoChecklistPage userId={userId} />;
//       case "myqueue":
//         return <CoChecklistPage userId={userId} />;
//       case "active":
//         return <BaseChecklistTableCo userId={userId} />;
//       case "defferals":
//         // example: show modal directly
//         return (
//           <StatsReportModal
//             open={modalOpen}
//             onClose={() => setModalOpen(false)}
//           />
//         );
//       case "reports":
//         return (
//           <StatsReportModal
//             open={modalOpen}
//             onClose={() => setModalOpen(false)}
//           />
//         );
//       default:
//         return <h1>Dashboard Content</h1>;
//     }
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
//       <Sidebar
//         selectedKey={selectedKey}
//         setSelectedKey={setSelectedKey}
//         collapsed={sidebarCollapsed}
//         toggleCollapse={toggleSidebar}
//       />
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <Navbar toggleSidebar={toggleSidebar} />
//         <div
//           style={{
//             padding: 20,
//             flex: 1,
//             overflowY: "auto",
//             background: "#f0f2f5",
//           }}
//         >
//           <button onClick={() => setModalOpen(true)}>Open Stats Modal</button>
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MainLayout;
import React, { useState } from "react";
import { Menu } from "antd";
import {
  ClockCircleOutlined,
  SettingOutlined,
  MenuOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom"; // <-- IMPORTANT

import StatsReportModal from "../../new/cocreater/components/StatsReportModal";
import BaseChecklistTableCo from "./coChecker";
import CoChecklistPage from "../../new/cocreater/CoChecklistPage";
import Reportss from "../../new/cocreater/components/reports";
import { Users } from "lucide-react";
import Active from "../../new/cocreater/components/active";
import MyQueue from "../../new/cocreater/components/myQueue";
import CreatorReview from "../../new/cocreater/components/creatorReview";
import Deferrals from "../../new/cocreater/components/deferrals";

// ----------------------- Sidebar -----------------------
const Sidebar = ({
  selectedKey,
  setSelectedKey,
  collapsed,
  toggleCollapse,
}) => {
  const handleClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <div
      style={{
        width: collapsed ? 80 : 250,
        background: "#3A2A82",
        paddingTop: 20,
        transition: "width 0.2s",
        color: "white",
        position: "relative",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: 22,
          marginBottom: 35,
          fontWeight: "bold",
        }}
      >
        {collapsed ? "N" : "CO creator Dashboard"}
      </h2>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleClick}
        inlineCollapsed={collapsed}
        style={{ background: "#3A2A82" }}
        items={[
          {
            key: "creatchecklist",
            icon: <ClockCircleOutlined />,
            label: "Create New DCL",
          },
          { key: "myqueue", icon: <ClockCircleOutlined />, label: "My Queue" },
          {
            key: "report",
            icon: <ClockCircleOutlined />,
            label: "Reports",
          },
          {
            key: "deferrals",
            icon: <ClockCircleOutlined />,
            label: "Deferrals",
          },
          {
            key: "completed",
            icon: <ClockCircleOutlined />,
            label: "Completed",
          },
          {
            key: "active",
            icon: <Users size={12} className="text-gray-200" />,
            label: "Active",
          },
        ]}
      />

      <div
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          textAlign: "center",
        }}
      >
        <button
          onClick={toggleCollapse}
          style={{
            background: "#fff",
            color: "#3A2A82",
            border: "none",
            borderRadius: 4,
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

// ----------------------- Navbar -----------------------
const Navbar = ({ toggleSidebar }) => {
  return (
    <div
      style={{
        height: 60,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
        <MenuOutlined style={{ fontSize: 24 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        <UserOutlined style={{ fontSize: 20, cursor: "pointer" }} />
      </div>
    </div>
  );
};

// ----------------------- Mock Data -----------------------
const mockChecklists = [
  {
    dclNo: "DCL001",
    assignedToRM: { name: "RM John" },
    loanType: "Home Loan",
    status: "approved",
    createdAt: "2025-11-01",
    approvedAt: "2025-11-05",
    documents: ["doc1", "doc2"],
  },
  {
    dclNo: "DCL002",
    assignedToRM: { name: "RM Jane" },
    loanType: "Car Loan",
    status: "rejected",
    createdAt: "2025-11-02",
    approvedAt: null,
    documents: ["doc1"],
  },
  {
    dclNo: "DCL003",
    assignedToRM: { name: "RM John" },
    loanType: "Personal Loan",
    status: "in progress",
    createdAt: "2025-11-03",
    approvedAt: null,
    documents: ["doc1", "doc2", "doc3"],
  },
];

// ----------------------- Main Layout -----------------------
const MainLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const [selectedKey, setSelectedKey] = useState("creatchecklist");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "creatchecklist":
        return <CoChecklistPage userId={userId} />;
      case "myqueue":
        return <MyQueue />;
      case "active":
        return <Active />;
      case "report":
        return <Reportss />;
      case "deferrals":
        return <Deferrals />;
      default:
        return <h1>Dashboard Content</h1>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />

      {/* Main Section */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar toggleSidebar={toggleSidebar} />

        {/* ---------- MAIN CONTENT WITH ROUTING ---------- */}
        <div
          style={{
            padding: 20,
            flex: 1,
            overflowY: "auto",
            background: "#f0f2f5",
          }}
        >
          <Routes>
            {/* Pages controlled by Sidebar buttons */}
            <Route path="/" element={renderContent()} />

            {/* Creator Review page (opens from MyQueue) */}
            <Route path="/creator/review/:id" element={<CreatorReview />} />

            {/* Example Stats Reports Modal route */}
            <Route
              path="/reports"
              element={
                <>
                  <button
                    onClick={() => setModalOpen(true)}
                    style={{ marginBottom: 20 }}
                  >
                    Open Stats Report
                  </button>

                  <StatsReportModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    checklists={mockChecklists}
                  />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
