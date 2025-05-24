import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const IDScanner = () => {
  const [scannedStudents, setScannedStudents] = useState(() => {
  
    const saved = localStorage.getItem("scannedStudents");
    return saved ? JSON.parse(saved) : [];
  });
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
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

    if (studentData) {
     
      const newScan = {
        name: (studentData.firstName && studentData.lastName) ? 
          `${studentData.firstName} ${studentData.lastName}` : "Unknown",
        studentId: studentData.id || studentData.studentId || "N/A",
        rfidTag: studentData.rfid || studentData.RFID || rfidTag,
        year: studentData.yearLevel || studentData.year || "N/A",
        scanType: "RFID",
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      };

      setScannedStudents((prev) => [newScan, ...prev]);
    } else {
      setError("Student not found in database");
    }

    setIsScanning(false);
  }, [isScanning]);

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
    // Save scannedStudents to localStorage whenever it changes
    localStorage.setItem("scannedStudents", JSON.stringify(scannedStudents));
  }, [scannedStudents]);

  useEffect(() => {
    if (error) {
      
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-[#0057A4] text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-white hover:text-blue-200"
            aria-label="Back to Dashboard"
          >
            <ArrowBackIcon className="mr-2" />
          </button>
          <h1 className="text-xl font-bold text-center flex-1">
            Student Attendance Scanner
          </h1>
          <div className="w-10" />
          <button
            onClick={() => {
              setScannedStudents([]);
              localStorage.removeItem("scannedStudents");
            }}
            className="text-white hover:text-blue-200 ml-4"
            aria-label="Clear Scanned Students"
          >
            Clear
          </button>
        </div>
      </header>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            {isScanning && (
              <div className="flex items-center text-blue-600" role="status" aria-live="polite">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Scanning...</span>
              </div>
            )}
            {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
          </div>
          <p className="text-sm text-gray-600">Tap student ID card to scan</p>
        </div>
      </div>

      <main className="flex-1 flex flex-col p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm h-full overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Recently Scanned</h2>

          {scannedStudents.length > 0 ? (
            <ul className="space-y-4">
              {scannedStudents.map((student, index) => (
                <li
                  key={index}
                  className="p-4 hover:bg-gray-50 rounded-lg border border-gray-200"
                  tabIndex={0}
                  aria-label={`Scanned student ${student.name}, ID ${student.studentId}, Year ${student.year}`}
                >
                  <div className="flex items-start">
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-blue-200">
                      <span className="text-xl" aria-hidden="true">👤</span>
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-600">ID: {student.studentId}</p>
                          <p className="text-sm text-gray-600">Year: {student.year}</p>
                          <p className="text-xs text-gray-500 mt-1">RFID: {student.rfidTag}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 mb-1">{student.scanType}</span>
                          <span className="text-xs text-gray-500">{student.time}</span>
                          <span className="text-xs text-gray-500">{student.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <p className="mt-2">No students scanned yet</p>
              <p className="text-sm mt-1">Tap a student's ID card to begin</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default IDScanner;

