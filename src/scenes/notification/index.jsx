import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const initialNotifications = [
  {
    date: "Today",
    items: [
      {
        type: "warning",
        message: "Student absent for 3 days",
        student: "Juan D. Cruz, BSCS 101",
      },
      {
        type: "info",
        message: "Professor has logged into the server",
      },
    ],
  },
  {
    date: "Yesterday",
    items: [
      {
        type: "warning",
        message: "Student absent for 3 days",
        student: "Diego D. Diega, BSCS 101",
      },
      {
        type: "info",
        message: "Professor 1 has logged into the server",
      },
    ],
  },
];

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="flex items-center text-white text-sm hover:text-blue-200 transition"
    >
      <IoArrowBack className="w-5 h-5 mr-1" />
      Back
    </button>
  );
}

function MarkAllAsReadButton({ onMarkAllRead }) {
  return (
    <button
      onClick={onMarkAllRead}
      className="text-sm text-white hover:text-blue-200 transition"
    >
      Mark all as read
    </button>
  );
}

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAllAsRead = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-white text-[#333] font-sans">
      
      {/* Top bar */}
      <div className="bg-[#005BAC] text-white p-4 relative flex items-center justify-between">
        <BackButton />
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-white">
          Notifications
        </h1>
        <MarkAllAsReadButton onMarkAllRead={handleMarkAllAsRead} />
      </div>

      {/* Notifications Content */}
      <div className="px-6 pt-4">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-10">No new notifications.</p>
        ) : (
          notifications.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-6">
              <div className="text-xs font-semibold text-gray-500 mb-3">
                {section.date}
              </div>

              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="p-3 mb-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <p
                    className={`text-sm font-medium ${
                      item.type === "warning" ? "text-red-600" : "text-gray-800"
                    }`}
                  >
                    {item.type === "warning" && "⚠️ Warning! "}
                    {item.message}
                  </p>
                  {item.student && (
                    <p className="text-xs text-gray-600">{item.student}</p>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
