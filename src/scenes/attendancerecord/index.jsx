import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {
  TextField,
  InputAdornment,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Link,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Dummy data for courses, advisers, and attendance
const courseData = {
  "BSCS 101": {
    adviser: "Ms. Diega Ganda",
    records: [
      { date: "11/20/2024", name: "Juan D. Cruz", status: "Present" },
      { date: "11/19/2024", name: "Peter Diego Giraffe", status: "Absent" },
    ],
  },
  "BSCS 201": {
    adviser: "Mr. Juan del Cruz",
    records: [
      { date: "11/20/2024", name: "Stiphin Kyuri", status: "Present" },
      { date: "11/19/2024", name: "Peter Diego Giraffe", status: "Absent" },
    ],
  },
  "BSCS 301": {
    adviser: "Ms. Andrea Santos",
    records: [
      { date: "11/20/2024", name: "Juan D. Cruz", status: "Present" },
      { date: "11/19/2024", name: "Peter Diego Giraffe", status: "Absent" },
    ],
  },
  "HRS 101": {
    adviser: "Mr. Pedro Ramos",
    records: [
      { date: "11/20/2024", name: "Juan D. Cruz", status: "Present" },
      { date: "11/19/2024", name: "Peter Diego Giraffe", status: "Absent" },
    ],
  },
  "HRS 201": {
    adviser: "Ms. Liza Domingo",
    records: [
      { date: "11/20/2024", name: "Juan D. Cruz", status: "Present" },
      { date: "11/19/2024", name: "Peter Diego Giraffe", status: "Absent" },
    ],
  },
};

const Attendancerecord = () => {
  const navigate = useNavigate(); 
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleNameClick = (studentName) => {
    navigate(`/studentprof/${encodeURIComponent(studentName)}`);
  };

  const filteredCourses = Object.keys(courseData).filter((course) =>
    course.toLowerCase().includes(searchTerm)
  );

  const selectedData = courseData[selectedCourse] || {};

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Topbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "20px",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontWeight: "bold",
              fontSize: "16px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Attendance Record
          </Typography>

          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
            {/* Search Bar */}
            <TextField
              variant="outlined"
              placeholder="Search Courses"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              style={{ width: "300px" }}
            />

          
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="course-select-label">Filter by Program</InputLabel>
              <Select
                labelId="course-select-label"
                id="course-select"
                value={selectedCourse}
                label="Filter by Course"
                onChange={handleCourseChange}
              >
                <MenuItem value="">
                  <em>Select a program</em>
                </MenuItem>
                {filteredCourses.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Adviser Name and Attendance Table */}
          {selectedCourse && (
            <div style={{ marginTop: "20px" }}>
              <Typography
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  fontSize: "16px",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Adviser: {selectedData.adviser}
              </Typography>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Student Name</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedData.records && selectedData.records.length > 0 ? (
                      selectedData.records.map((record, index) => (
                        <TableRow key={index} hover>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>
                            <Link
                              component="button"
                              variant="body1"
                              onClick={() => handleNameClick(record.name)}
                              sx={{
                                textDecoration: 'none',
                                color: 'primary.main',
                                fontWeight: '500',
                                '&:hover': {
                                  textDecoration: 'underline',
                                  cursor: 'pointer'
                                }
                              }}
                            >
                              {record.name}
                            </Link>
                          </TableCell>
                          <TableCell>{record.status}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No attendance records available.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendancerecord;