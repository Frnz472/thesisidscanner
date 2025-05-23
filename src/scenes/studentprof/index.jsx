import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, AppBar, Toolbar, TextField, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, "students", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent(docSnap.data());
        } else {
          setError("Student not found");
        }
      } catch (err) {
        setError("Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif" }}>
        Loading student data...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif" }}>
        {error}
      </Typography>
    );
  }

  const filteredAttendance = selectedDate
    ? (student.attendance || []).filter(record =>
        record.date === new Date(selectedDate).toLocaleDateString("en-US")
      )
    : (student.attendance || []);

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
              <strong>Name:</strong> {student.firstName} {student.lastName}
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}>
              <strong>ID Number:</strong> {student.id}
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}>
              <strong>Contact No.:</strong> {student.contactNumber}
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}>
              <strong>Program:</strong> {student.program}
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}>
              <strong>Year Level:</strong> {student.yearLevel}
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem', mt: 1 }}>
              <strong>Parent's Name:</strong> {student.guardianName}
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}>
              <strong>Parent's Contact No.:</strong> {student.guardianContactNumber}
            </Typography>
          </Box>

          {/* Right: Student Image */}
          <Box 
            sx={{ 
              position: "absolute", 
              top: 0, 
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar 
              alt={`${student.firstName} ${student.lastName}`}
              src={student.photoURL || ""} 
              sx={{ width: 150, height: 150, borderRadius: 2 }}
              variant="square"
            />
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
