import React, {useState} from 'react'
import Sidebar from '../components/SideBar';
import Header from "../components/Header";
import AttendanceList from "../components/AttendanceList";
import RegisterButton from "../components/RegisterButton";
import RegisterModal from "../components/RegisterModal";

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [SideBarOpen, setSideBarOpen] = useState(false);

  function toggleNavMenu () {
    setSideBarOpen(!SideBarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <div
      className={`${
        SideBarOpen ? "w-64" : "w-16"
      } bg-[#834f9b] text-white transition-all duration-300 h-full flex flex-col`}
    >
      <button
        className="p-4 focus:outline-none text-white hover:bg-[#3b3b41]"
        onClick={toggleNavMenu}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
  
      {/* Render Sidebar only when SideBarOpen is true */}
      {SideBarOpen && <Sidebar />}
    </div>
  

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <div className="flex flex-1 p-4 relative">
          {/* Attendance List */}
          <AttendanceList />

          {/* Register Button */}
          <RegisterButton onClick={() => setIsModalOpen(true)} />

          {/* Register Modal */}
          {isModalOpen && <RegisterModal onClose={() => setIsModalOpen(false)} />}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
