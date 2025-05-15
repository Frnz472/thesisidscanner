import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const IDScanner = () => {
  const [scannedStudents, setScannedStudents] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch student data from API based on RFID tag
  const fetchStudentData = async (rfidTag) => {
    try {
      // Simulated API response with mock data
      const mockStudents = {
        "123456789": {
          id: 1,
          name: 'Jane Smith',
          studentId: 'STU2023002',
          faculty: 'Engineering',
          department: 'Computer Science',
          year: '3rd Year',
          subjects: [
            { code: 'CS101', name: 'Introduction to Programming', time: 'Mon 9:00-11:00' },
            { code: 'CS203', name: 'Data Structures', time: 'Wed 13:00-15:00' }
          ],
          image: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        "987654321": {
          id: 2,
          name: 'John Doe',
          studentId: 'STU2023001',
          faculty: 'Science',
          department: 'Physics',
          year: '4th Year',
          subjects: [
            { code: 'PHY301', name: 'Quantum Mechanics', time: 'Tue 9:00-11:00' }
          ],
          image: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
      };

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockStudents[rfidTag] || null);
        }, 500);
      });
    } catch (err) {
      console.error('Error fetching student data:', err);
      return null;
    }
  };

  // Handle RFID tag detection
  const handleRFIDDetection = async (rfidTag) => {
    if (isScanning) return;

    setIsScanning(true);
    setError(null);

    try {
      const studentData = await fetchStudentData(rfidTag);
      
      if (studentData) {
        const newScan = {
          ...studentData,
          scanType: 'RFID',
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
          rfidTag: rfidTag
        };

        setScannedStudents(prev => [newScan, ...prev]);
      } else {
        setError('Student not found in database');
      }
    } catch (err) {
      setError('Error processing RFID scan');
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  // Setup keyboard wedge reader (most common RFID reader type)
  useEffect(() => {
    let rfidBuffer = '';
    let reading = false;

    const handleKeyDown = (e) => {
      // Start of RFID scan
      if (e.key === 'Enter' || e.key === '~') {
        rfidBuffer = '';
        reading = true;
        return;
      }

      if (reading) {
        // End of RFID scan
        if (e.key === 'Enter') {
          reading = false;
          if (rfidBuffer.length > 0) {
            handleRFIDDetection(rfidBuffer);
          }
          rfidBuffer = '';
        } else {
          // Append character to buffer
          rfidBuffer += e.key;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isScanning]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#0057A4] text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-white hover:text-blue-200"
          >
            <ArrowBackIcon className="mr-2" />
          </button>
          <h1 className="text-xl font-bold text-center flex-1">Student Attendance Scanner</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Scanner Status */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            {isScanning && (
              <div className="flex items-center text-blue-600">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Scanning...</span>
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <p className="text-sm text-gray-600">Tap student ID card to scan</p>
        </div>
      </div>

      {/* Scanned Students List */}
      <main className="flex-1 flex flex-col p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm h-full overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Recently Scanned</h2>
          
          {scannedStudents.length > 0 ? (
            <ul className="space-y-4">
              {scannedStudents.map((student, index) => (
                <li key={index} className="p-4 hover:bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="h-16 w-16 rounded-full object-cover border-2 border-blue-200"
                    />
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.studentId}</p>
                          <p className="text-sm text-gray-600">{student.faculty} • {student.department} • {student.year}</p>
                          <p className="text-xs text-gray-500 mt-1">RFID: {student.rfidTag}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 mb-1">{student.scanType}</span>
                          <span className="text-xs text-gray-500">{student.time}</span>
                          <span className="text-xs text-gray-500">{student.date}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h3 className="text-sm font-medium text-gray-700 mb-1">Enrolled Subjects:</h3>
                        <div className="space-y-2">
                          {student.subjects.map((subject, subIndex) => (
                            <div key={subIndex} className="text-sm p-2 bg-gray-50 rounded border border-gray-100">
                              <p className="font-medium">{subject.code} - {subject.name}</p>
                              <p className="text-gray-600">{subject.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
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