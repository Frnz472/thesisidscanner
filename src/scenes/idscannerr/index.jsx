import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const IDScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchStudentData = async (rfidTag) => {
    try {
      const docRef = doc(db, "students", rfidTag);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      }

      const q = query(collection(db, "students"), where("rfid", "==", rfidTag));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      }

      return null;
    } catch (err) {
      console.error("Error fetching student data:", err);
      setError("Error fetching student data. Please try again.");
      return null;
    }
  };

  const handleRFIDDetection = useCallback(async (rfidTag) => {
    if (isScanning) return;

    setIsScanning(true);
    setError(null);

    const studentData = await fetchStudentData(rfidTag);

    if (!studentData) {
      setError("Student not found in database");
    }

    setIsScanning(false);
  }, [isScanning]);

  // RFID scanner input (keyboard simulation)
  useEffect(() => {
    let rfidBuffer = "";
    let timeout = null;

    const handleKeyDown = (e) => {
      if (timeout) clearTimeout(timeout);

      if (/^\d$/.test(e.key)) {
        rfidBuffer += e.key;
      }

      if (e.key === "Enter") {
        if (rfidBuffer.length > 0) {
          handleRFIDDetection(rfidBuffer.trim());
          rfidBuffer = "";
        }
      }

      timeout = setTimeout(() => {
        rfidBuffer = "";
      }, 2000);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (timeout) clearTimeout(timeout);
    };
  }, [isScanning, handleRFIDDetection]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-gray-200 to-gray-100">
      {/* Header */}
      <header className="w-full bg-white text-gray-800 py-4 shadow-md text-center text-xl font-semibold">
        STI College Vigan
      </header>

      {/* Main card */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl mt-16 p-6 flex flex-col items-center">
        {/* Blue banner */}
        <div className="bg-blue-600 text-white w-full py-3 text-center rounded-lg font-semibold text-lg">
          TAP RFID CARD TO TIME IN / TIME OUT
        </div>

        {/* Clock */}
        <div className="text-center my-6">
          <p className="text-4xl font-bold">
            {currentTime.toLocaleTimeString()}
          </p>
          <p className="text-gray-600 mt-2 text-lg">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* System message */}
        <div className="bg-blue-100 w-full py-3 text-center rounded-lg text-blue-700 font-medium mb-6">
          {isScanning
            ? "Scanning..."
            : error
            ? error
            : "Waiting for scan..."}
        </div>

        {/* Buttons */}
        <div className="flex space-x-6">
          <button className="bg-blue-700 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-800">
            Time In
          </button>
          <button className="bg-blue-700 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-800">
            Time Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default IDScanner;
