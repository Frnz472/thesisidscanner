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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const StudentManagement = () => {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);

  const [showDialog, setShowDialog] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    rfid: "",
    program: "",
  });

  const programOptions = ["Computer Science", "Hospitality Management"];

  const handleAddStudent = () => {
    if (
      newStudent.id &&
      newStudent.name &&
      newStudent.rfid &&
      newStudent.program
    ) {
      setStudents((prev) => [...prev, newStudent]);
      setNewStudent({ id: "", name: "", rfid: "", program: "" });
      setShowDialog(false);
    } else {
      alert("Please Fill Out All Fields.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProgram =
      !selectedProgram || student.program === selectedProgram;
    return matchesSearch && matchesProgram;
  });

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        fontFamily: "'Poppins', Sans-Serif",
      }}
    >
      <Topbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "'Poppins', Sans-Serif" }}
            >
              Student Management
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0057A4",
                fontFamily: "'Poppins', Sans-Serif",
                "&:hover": {
                  backgroundColor: "#004A8C",
                },
              }}
              onClick={() => setShowDialog(true)}
            >
              Add Student
            </Button>
          </div>

          <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
            <DialogTitle sx={{ fontFamily: "'Poppins', Sans-Serif" }}>
              Add New Student
            </DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  marginTop: 1,
                  fontFamily: "'Poppins', Sans-Serif",
                }}
              >
                <TextField
                  label="Student ID"
                  value={newStudent.id}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, id: e.target.value })
                  }
                  fullWidth
                  sx={{ fontFamily: "'Poppins', Sans-Serif" }}
                />
                <TextField
                  label="Name"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  fullWidth
                  sx={{ fontFamily: "'Poppins', Sans-Serif" }}
                />
                <TextField
                  label="RFID"
                  value={newStudent.rfid}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, rfid: e.target.value })
                  }
                  fullWidth
                  sx={{ fontFamily: "'Poppins', Sans-Serif" }}
                />
                <FormControl fullWidth>
                  <InputLabel sx={{ fontFamily: "'Poppins', Sans-Serif" }}>
                    Program
                  </InputLabel>
                  <Select
                    value={newStudent.program}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, program: e.target.value })
                    }
                    label="Program"
                    sx={{ fontFamily: "'Poppins', Sans-Serif" }}
                  >
                    {programOptions.map((program) => (
                      <MenuItem
                        key={program}
                        value={program}
                        sx={{ fontFamily: "'Poppins', Sans-Serif" }}
                      >
                        {program}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setShowDialog(false)}
                sx={{
                  fontFamily: "'Poppins', Sans-Serif",
                  textTransform: "capitalize",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddStudent}
                variant="contained"
                sx={{
                  backgroundColor: "#0057A4",
                  fontFamily: "'Poppins', Sans-Serif",
                  textTransform: "capitalize",
                  "&:hover": { backgroundColor: "#004A8C" },
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "300px", fontFamily: "'Poppins', Sans-Serif" }}
            />

            <FormControl
              sx={{ width: "200px", fontFamily: "'Poppins', Sans-Serif" }}
            >
              <InputLabel sx={{ fontFamily: "'Poppins', Sans-Serif" }}>
                All
              </InputLabel>
              <Select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                label="Program"
                sx={{ fontFamily: "'Poppins', Sans-Serif" }}
              >
                <MenuItem value="" sx={{ fontFamily: "'Poppins', Sans-Serif" }}>
                  All
                </MenuItem>
                {programOptions.map((program) => (
                  <MenuItem
                    key={program}
                    value={program}
                    sx={{ fontFamily: "'Poppins', Sans-Serif" }}
                  >
                    {program}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#F0F2F5" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "'Poppins', Sans-Serif",
                    }}
                  >
                    Student ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "'Poppins', Sans-Serif",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "'Poppins', Sans-Serif",
                    }}
                  >
                    RFID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "'Poppins', Sans-Serif",
                    }}
                  >
                    Program
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#FFF" : "#F9F9F9",
                      }}
                    >
                      <TableCell sx={{ fontFamily: "'Poppins', Sans-Serif" }}>
                        {student.id}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Poppins', Sans-Serif" }}>
                        {student.name}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Poppins', Sans-Serif" }}>
                        {student.rfid}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Poppins', Sans-Serif" }}>
                        {student.program}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      align="center"
                      sx={{ fontFamily: "'Poppins', Sans-Serif" }}
                    >
                      No Students Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
