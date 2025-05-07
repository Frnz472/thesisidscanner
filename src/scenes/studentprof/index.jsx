import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, AppBar, Toolbar, TextField, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const StudentProfile = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");

  const studentData = {
    "Juan D. Cruz": {
      idNumber: "0872638718",
      contactNo: "098732632",
      program: "BS Computer Science",
      yearLevel: "1st Year",
      parentName: "Maria Kusinti",
      parentContactNo: "09171234567",
      attendance: [
        { date: "11/20/2024", status: "Present", course: "Computer Programming" },
        { date: "11/19/2024", status: "Present", course: "Calculus" },
        { date: "11/18/2024", status: "Absent", course: "Calculus" },
      ],
    },
    "Peter Diego Giraffe": {
      idNumber: "0872638719",
      contactNo: "098732633",
      program: "BS Computer Science",
      yearLevel: "1st Year",
      parentName: "Laura Macapagal",
      parentContactNo: "09179876543",
      attendance: [
        { date: "11/20/2024", status: "Present", course: "Computer Programming" },
      ],
    }
  };

  const student = studentData[decodeURIComponent(name)];

  const handleScanClick = () => {
    navigate('/id-scanner'); // Updated to match your folder name

  };

  if (!student) {
    return (
      <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif" }}>
        Student not found
      </Typography>
    );
  }

  const filteredAttendance = selectedDate
    ? student.attendance.filter(record =>
        record.date === new Date(selectedDate).toLocaleDateString("en-US")
      )
    : student.attendance;

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar 
        position="static" 
        sx={{ bgcolor: "#0057A4", boxShadow: 'none', mb: 3 }}
      >
        <Toolbar>
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ color: "white", fontFamily: "'Poppins', sans-serif", mr: 2 }}
          />
          <Typography 
            variant="h6" 
            sx={{ flexGrow: 1, fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
          >
            Student Profile
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ p: 3 }}>
        {/* Student Information with Profile Image */}
        <Box 
          sx={{ 
            mb: 4,
            position: "relative",
            minHeight: 200,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between"
          }}
        >
          {/* Left: Student Details */}
          <Box sx={{ maxWidth: "60%" }}>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}>
              <strong>Name:</strong> {decodeURIComponent(name)}
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}>
              <strong>ID Number:</strong> {student.idNumber}
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}>
              <strong>Contact No.:</strong> {student.contactNo}
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}>
              <strong>Program:</strong> {student.program}
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}>
              <strong>Year Level:</strong> {student.yearLevel}
            </Typography>
           
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem', mt: 1 }}>
              <strong>Parent's Name:</strong> {student.parentName}
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}>
              <strong>Parent's Contact No.:</strong> {student.parentContactNo}
            </Typography>
          </Box>

          {/* Right: Student Image and SCAN Button */}
          <Box sx={{ 
            position: "absolute", 
            top: 0, 
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Avatar 
              alt={decodeURIComponent(name)}
              src="" 
              sx={{ width: 150, height: 150, borderRadius: 2 }}
              variant="square"
            />
            {/* SCAN button with onClick handler */}
            <Button 
              variant="contained" 
              startIcon={<QrCodeScannerIcon />}
              onClick={handleScanClick}
              sx={{ 
                mt: 2,
                backgroundColor: '#0057A4', 
                color: 'white',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#003d7a',
                }
              }}
            >
              SCAN
            </Button>
          </Box>
        </Box>

        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            mb: 2 
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
          >
            Attendance Records
          </Typography>

          <TextField
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            size="small"
            sx={{ width: 200, fontFamily: "'Poppins', sans-serif" }}
          />
        </Box>

        {/* Attendance Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Subject</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>{record.date}</TableCell>
                    <TableCell sx={{ 
                      color: record.status === 'Present' ? 'green' : 'red',
                      fontFamily: "'Poppins', sans-serif"
                    }}>
                      {record.status}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>{record.course}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: 'center', fontFamily: "'Poppins', sans-serif", color: 'gray' }}>
                    No attendance record found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
export default StudentProfile;
