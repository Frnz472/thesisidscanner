import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotificationPreferences = () => {
  const navigate = useNavigate();
  const [attendanceWarnings, setAttendanceWarnings] = useState(true);
  const [loginNotification, setLoginNotification] = useState(true);

  const handleAttendanceChange = () => {
    setAttendanceWarnings(!attendanceWarnings);
  };

  const handleLoginChange = () => {
    setLoginNotification(!loginNotification);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-[Poppins]">
      {/* Top Bar */}
      <div className="bg-[#0057A4] p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-white">
          Notification Preferences
        </h2>
        <div></div> {/* Empty div to balance space */}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 items-center">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow space-y-6">
          <h3 className="text-lg font-semibold">Notification Notifications</h3>

          {/* Attendance warnings */}
          <div className="flex justify-between items-center border rounded p-4">
            <span className="font-medium">Attendance warnings</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={attendanceWarnings}
                onChange={handleAttendanceChange}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer ${attendanceWarnings ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 h-5 w-5 bg-white rounded-full transition-transform duration-300 ${attendanceWarnings ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
              </div>
            </label>
          </div>

          {/* Log in notification */}
          <div className="flex justify-between items-center border rounded p-4">
            <span className="font-medium">Log in notification</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={loginNotification}
                onChange={handleLoginChange}
                className="sr-only peer"    
              />
              <div className={`w-11 h-6 rounded-full peer ${loginNotification ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 h-5 w-5 bg-white rounded-full transition-transform duration-300 ${loginNotification ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
              </div>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;