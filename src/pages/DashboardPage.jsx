import React, {useState} from 'react'
import Sidebar from '../components/SideBar';
import Header from "../components/Header";
import AttendanceList from "../components/AttendanceList";
import RegisterButton from "../components/RegisterButton";
import RegisterModal from "../components/RegisterModal";

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

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
