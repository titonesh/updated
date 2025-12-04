// import React, { useState } from "react";
// import { Menu } from "antd";
// import {
//   CheckCircle,
//   Clock,
//   FileBarChart,
//   Settings,
// } from "lucide-react";
// import {
//   BellOutlined,
//   UserOutlined,
//   MenuOutlined,
// } from "@ant-design/icons";

// // Existing components (functionality unchanged)
// // import CompletedChecklists from "../../cocreator/checklists/CompletedChecklists";
// import CombinedCharts from "../../stats";
// // import DeferredChecklists from "../../cocreator/checklists/DeferredChecklists";
// // import ActiveChecklists from "../../cocreator/checklists/ActiveChecklists";
// import Hero from "../../../pages/Hero";
// import BaseChecklistTable from "./Checkertable";

// /* ---------------------------------------------------------------------- */
// /*  Enhanced SIDEBAR — NCBA-grade, sleek, modern corporate UI            */
// /* ---------------------------------------------------------------------- */
// const Sidebar = ({ selectedKey, setSelectedKey, collapsed, toggleCollapse }) => {
//   const handleClick = (e) => setSelectedKey(e.key);

//   return (
//     <div
//       style={{
//         width: collapsed ? 80 : 260,
//         background: "#2B1C67",
//         color: "white",
//         transition: "0.25s ease",
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
//       }}
//     >
//       {/* Brand */}
//       <div
//         style={{
//           padding: collapsed ? "20px 0" : "25px 20px",
//           fontSize: collapsed ? 28 : 24,
//           fontWeight: "bold",
//           letterSpacing: collapsed ? 2 : 1,
//           textAlign: collapsed ? "center" : "left",
//         }}
//       >
//         {collapsed ? "NC" : "NCBA Checker Portal"}
//       </div>

//       {/* Menu */}
//       <Menu
//         theme="dark"
//         mode="inline"
//         selectedKeys={[selectedKey]}
//         onClick={handleClick}
//         style={{
//           background: "transparent",
//           borderRight: "none",
//           fontSize: 15,
//         }}
//         inlineCollapsed={collapsed}
//         items={[
//           {
//             key: "completed",
//             icon: <CheckCircle size={20} />,
//             label: "Completed Checklists",
//           },
//           {
//             key: "deferred",
//             icon: <Clock size={20} />,
//             label: "Deferred Checklists",
//           },
//           {
//             key: "reports",
//             icon: <FileBarChart size={20} />,
//             label: "Reports & Analytics",
//           },
//           {
//             key: "checklists",
//             icon: <Settings size={20} />,
//             label: "Checklists",
//           },
//            {
//             key: "action",
//             icon: <Settings size={20} />,
//             label: "All Checklists",
//           },
//         ]}
//       />

//       {/* Collapse Button */}
//       <div
//         style={{
//           marginTop: "auto",
//           padding: 20,
//           textAlign: "center",
//         }}
//       >
//         <button
//           onClick={toggleCollapse}
//           style={{
//             width: "100%",
//             padding: "8px 0",
//             borderRadius: 6,
//             border: "none",
//             background: "#fff",
//             color: "#2B1C67",
//             fontWeight: 600,
//             cursor: "pointer",
//             transition: "0.2s",
//           }}
//         >
//           {collapsed ? "Expand" : "Collapse"}
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */
// /*  Enhanced NAVBAR — clean, polished, corporate-grade                   */
// /* ---------------------------------------------------------------------- */
// const Navbar = ({ toggleSidebar }) => {
//   return (
//     <div
//       style={{
//         height: 65,
//         background: "#ffffff",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "0 25px",
//         boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
//         position: "sticky",
//         top: 0,
//         zIndex: 1000,
//       }}
//     >
//       <MenuOutlined
//         onClick={toggleSidebar}
//         style={{
//           fontSize: 24,
//           cursor: "pointer",
//           color: "#2B1C67",
//         }}
//       />

//       <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
//         <BellOutlined
//           style={{
//             fontSize: 22,
//             cursor: "pointer",
//             color: "#2B1C67",
//           }}
//         />
//         <UserOutlined
//           style={{
//             fontSize: 22,
//             cursor: "pointer",
//             color: "#2B1C67",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */
// /*  Main Layout — cleaner, more enterprise, improved spacing & look      */
// /* ---------------------------------------------------------------------- */
// const CheckerLayout = () => {
//   const [selectedKey, setSelectedKey] = useState("completed");
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

//   const renderContent = () => {
//     switch (selectedKey) {
//       case "completed":
//         return <CompletedChecklists />;
//       case "reports":
//         return <CombinedCharts />;
//       case "deferred":
//         return <DeferredChecklists />;
//       case "checklists":
//         return <Hero />;
//         case "action":
//         return <BaseChecklistTable />;
//       default:
//         return <ActiveChecklists />;
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "100vh",
//         overflow: "hidden",
//         background: "#f4f5f9",
//       }}
//     >
//       {/* Sidebar */}
//       <Sidebar
//         selectedKey={selectedKey}
//         setSelectedKey={setSelectedKey}
//         collapsed={sidebarCollapsed}
//         toggleCollapse={toggleSidebar}
//       />

//       {/* Main Content */}
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <Navbar toggleSidebar={toggleSidebar} />

//         <div
//           style={{
//             padding: "25px",
//             flex: 1,
//             overflowY: "auto",
//             background: "#f4f6ff",
//           }}
//         >
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckerLayout;



import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  BarChartOutlined,
  MenuOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

// Page imports
import ActiveDCLs from "./ActiveDCLs";
import CompletedDCLs from "./CompletedDCLs";
import ReportsPage from "./ReportsPage";
import CoChecklistPage from "../CoChecklistPage"; // My Queue
import { useSelector } from "react-redux";

// Sidebar Component
const Sidebar = ({ selectedKey, setSelectedKey, collapsed, toggleCollapse }) => {
  const handleClick = (e) => setSelectedKey(e.key);

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
        {collapsed ? "N" : "CO Checker Dashboard"}
      </h2>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleClick}
        style={{ background: "#3A2A82" }}
        inlineCollapsed={collapsed}
        items={[
          { key: "myQueue", icon: <ClockCircleOutlined />, label: "My Queue" },
          { key: "activeDCLs", icon: <FileTextOutlined />, label: "Active DCLs" },
          { key: "completedDCLs", icon: <CheckCircleOutlined />, label: "Completed DCLs" },
          { key: "reports", icon: <BarChartOutlined />, label: "Reports" },
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

// Navbar Component
const Navbar = ({ toggleSidebar }) => (
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

// Main Layout
const CheckerLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const [selectedKey, setSelectedKey] = useState("myQueue");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  // Keep the active menu item highlighted correctly after collapse/expand
  useEffect(() => {
    if (!selectedKey) setSelectedKey("myQueue");
  }, [sidebarCollapsed, selectedKey]);

  const renderContent = () => {
    switch (selectedKey) {
      case "myQueue":
        return <CoChecklistPage userId={userId} />;
      case "activeDCLs":
        return <ActiveDCLs />;
      case "completedDCLs":
        return <CompletedDCLs />;
      case "reports":
        return <ReportsPage />;
      default:
        return <CoChecklistPage userId={userId} />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div
          style={{
            padding: 20,
            flex: 1,
            overflowY: "auto",
            background: "#f0f2f5",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CheckerLayout;
