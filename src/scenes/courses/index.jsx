import React, { useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const courseList = [
    "BSCS 101",
    "BSCS 201",
    "BSCS 301",
    "BSCS 401",
    "HRS 101",
    "HRS 201",
  ];

  const subjectData = {
    "BSCS 101": ["Introduction to Computing", "Computer Programming 1", "Mathematics in the Modern World"],
    "BSCS 201": ["Computer Programming 3", "Data Structures and Algorithms","The Entrepreneurial Mind"],
    "BSCS 301": ["Intermediate Mobile Programming", "Artificial Intelligence"],
    "BSCS 401": ["Thesis Writing", "Mobile Development"],
    "HRS 101": ["Hospitality Basics"],
    "HRS 201": ["Hotel Management"],
  };

  const courseData = {
    "BSCS 101": [
      { id: "02003267548", name: "Eren Yeager", subject: "Introduction to Computing" },
      { id: "03000231212", name: "Mikasa Ackerman", subject: "Computer Programming 1" },
      { id: "03000163521", name: "Armin Arlert", subject: "Mathematics in the Modern World" },
    ],
    "BSCS 201": [{ id: "03000254312", name: "Stiphin Kyuri", subject: "Computer Programming 3" }],
    "BSCS 301": [{ id: "03000238712", name: "LeBran Jhames", subject: "Data Structures and Algorithms" }],
    "BSCS 401": [
      { id: "02003267554", name: "Naruto Castillo", subject: "Intermediate Mobile Programming" },
      { id: "02003267541", name: "Sasuke Tubon", subject: "Mobile Development" },
    ],
    "HRS 101": [{ id: "02003267566", name: "Armin Armin", subject: "Hospitality Basics" }],
    "HRS 201": [{ id: "02003267565", name: "James Harden", subject: "Hotel Management" }],
  };

  const filteredStudents = courseData[selectedCourse]?.filter((student) =>
    selectedSubject ? student.subject === selectedSubject : true
  );

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
          {/* Header */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
              mb: 2,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Courses
          </Typography>

          {/* Filters Section: Search, Course, Subject */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            {/* Search Bar */}
            <TextField
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "300px" }}
            />

            {/* Course Filter */}
            <FormControl sx={{ width: "300px" }}>
              <InputLabel>Filter by Program</InputLabel>
              <Select
                value={selectedCourse}
                label="Filter by Course"
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setSelectedSubject(""); // reset subject when course changes
                }}
              >
                {courseList.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Subject Filter */}
            {selectedCourse && subjectData[selectedCourse] && (
              <FormControl sx={{ width: "300px" }}>
                <InputLabel>Filter by Subject</InputLabel>
                <Select
                  value={selectedSubject}
                  label="Filter by Subject"
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <MenuItem value="">All Subjects</MenuItem>
                  {subjectData[selectedCourse].map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>

          {/* Course Table */}
          {selectedCourse && (
            <>
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                Students in {selectedCourse}{" "}
                {selectedSubject && ` - ${selectedSubject}`}
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f0f2f5" }}>
                      <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                        Student ID
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                        Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                        Subject
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents?.map((student, index) => (
                      <TableRow
                        key={student.id}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                        }}
                      >
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.subject}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;