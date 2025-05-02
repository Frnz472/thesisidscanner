import React, { useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { MdSearch } from "react-icons/md";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    {
      date: "02/04/2025",
      name: "Juan D. Cruz",
      id: "02003267548",
      program: "BSCS 301",
      timeIn: "7:48 AM",
      timeOut: "1:04 PM",
    },
    { 
      date: "03/04/2025",
      name: "Stiphin Kyuri", 
      id: "030002312",                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      program: "BSCS 301", 
      timeIn: "2:00 PM", 
      timeOut: "4:00 PM" 
    },
    { 
      date: "04/04/2025",
      name: "Camsi D. Pamagmahal", 
      id: "0300016352", 
      program: "HRS 201", 
      timeIn: "8:00 AM", 
      timeOut: "2:00 PM" 
    },
    { 
      date: "05/04/2025",
      name: "Marky L. Malupiton", 
      id: "0400045678", 
      program: "BSCS 202", 
      timeIn: "9:00 AM", 
      timeOut: "3:30 PM" 
    }
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.includes(searchQuery) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.date.includes(searchQuery);
  
    const matchesDate = selectedDate
      ? student.date === new Date(selectedDate).toLocaleDateString("en-GB")
      : true;
  
    return matchesSearch && matchesDate;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6"> 
          <h1 
            className="text-2xl mb-4" 
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"bold" }}
          >
            Dashboard
          </h1>

          <div className="flex items-center space-x-4 bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg font-semibold">Attendance History</h2>
            
            <label className="text-sm font-medium">Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded-md px-2 py-1 w-40 text-center"
            />
          </div>

          <div className="mt-4 mb-6 flex">
            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-md w-1/4">
              <MdSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none px-2 w-full"
              />
            </div>
          </div>

          <table className="w-full border-collapse border bg-white shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left border">Date</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left border">Student Name</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left border">ID Number</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left border">Program</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left border">Time In</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left border">Time Out</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="p-3 text-sm text-gray-700 border">{student.date}</td>
                    <td className="p-3 text-sm text-gray-700 border">{student.name}</td>
                    <td className="p-3 text-sm text-gray-700 border">{student.id}</td>
                    <td className="p-3 text-sm text-gray-700 border">{student.program}</td>
                    <td className="p-3 text-sm text-gray-700 border">{student.timeIn}</td>
                    <td className="p-3 text-sm text-gray-700 border">{student.timeOut}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-3 text-sm text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
