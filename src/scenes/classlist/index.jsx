import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const Classlist = () => {
  const navigate = useNavigate();

  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedYearLevel, setSelectedYearLevel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    rfid: "",
    contactNumber: "",
    guardianName: "",
    guardianContactNumber: "",
    program: "",
    yearLevel: "",
    docId: "", 
  });
  const [errorMessage, setErrorMessage] = useState("");

  const programOptions = [
    "Computer Science",
    "Hotel and Restaurant Services",
  ];

  const yearLevelsForProgram = {
    "Computer Science": ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    "Hotel and Restaurant Services": ["1st Year", "2nd Year"],
  };

  const yearLevelOptions =
    selectedProgram
      ? yearLevelsForProgram[selectedProgram]
      : ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  // Fetch students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsCol = collection(db, "students");
        const studentsSnapshot = await getDocs(studentsCol);
        const studentsList = studentsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        setStudents(studentsList);
      } catch (error) {
        console.error("Error fetching students: ", error);
        alert("Failed to load students data. Please try again later.");
      }
    };

    fetchStudents();
  }, []);

  const handleAddOrUpdateStudent = async () => {
    if (
      newStudent.id.trim() &&
      newStudent.firstName.trim() &&
      newStudent.lastName.trim() &&
      newStudent.rfid.trim() &&
      newStudent.program.trim() &&
      newStudent.yearLevel.trim()
    ) {
      try {
        const studentsCol = collection(db, "students");
        const q = query(studentsCol, where("rfid", "==", newStudent.rfid.trim()));
        const querySnapshot = await getDocs(q);

        const isDuplicateRFID = querySnapshot.docs.some(
          (docSnap) => docSnap.id !== newStudent.docId
        );

        if (isDuplicateRFID) {
          setErrorMessage("RFID already exists. Please use a different RFID.");
          return;
        }

        if (newStudent.docId) {
          // Update existing document
          const docRef = doc(db, "students", newStudent.docId);
          await setDoc(docRef, {
            id: newStudent.id.trim(),
            firstName: newStudent.firstName.trim(),
            lastName: newStudent.lastName.trim(),
            rfid: newStudent.rfid.trim(),
            contactNumber: newStudent.contactNumber.trim(),
            guardianName: newStudent.guardianName.trim(),
            guardianContactNumber: newStudent.guardianContactNumber.trim(),
            program: newStudent.program,
            yearLevel: newStudent.yearLevel,
          });
          setStudents((prev) =>
            prev.map((student) =>
              student.docId === newStudent.docId ? { ...newStudent } : student
            )
          );
        } else {
          // Add new document
          const docRef = await addDoc(studentsCol, {
            id: newStudent.id.trim(),
            firstName: newStudent.firstName.trim(),
            lastName: newStudent.lastName.trim(),
            rfid: newStudent.rfid.trim(),
            contactNumber: newStudent.contactNumber.trim(),
            guardianName: newStudent.guardianName.trim(),
            guardianContactNumber: newStudent.guardianContactNumber.trim(),
            program: newStudent.program,
            yearLevel: newStudent.yearLevel,
          });
          setStudents((prev) => [
            ...prev,
            { ...newStudent, docId: docRef.id },
          ]);
        }

        setNewStudent({
          id: "",
          firstName: "",
          lastName: "",
          rfid: "",
          contactNumber: "",
          guardianName: "",
          guardianContactNumber: "",
          program: "",
          yearLevel: "",
          docId: "",
        });
        setShowDialog(false);
        setErrorMessage("");
      } catch (error) {
        console.error("Error adding/updating student: ", error);
        alert("Error saving student. Please try again.");
      }
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const handleDeleteStudent = async (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmed) {
      try {
        const studentToDelete = students[index];
        if (studentToDelete.docId) {
          await deleteDoc(doc(db, "students", studentToDelete.docId));
          setStudents((prev) => prev.filter((_, i) => i !== index));
        } else {
          alert("Cannot find student document ID. Delete failed.");
        }
      } catch (error) {
        console.error("Error deleting student: ", error);
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  const handleUpdateStudent = (index) => {
    setNewStudent(students[index]);
    setErrorMessage("");
    setShowDialog(true);
  };

  const filteredStudents = students.filter((student) => {
    const fullName = (student.firstName + " " + student.lastName).toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesProgram =
      !selectedProgram || student.program === selectedProgram;
    const matchesYearLevel =
      !selectedYearLevel || student.yearLevel === selectedYearLevel;
    return matchesSearch && matchesProgram && matchesYearLevel;
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
              Class List
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
              onClick={() => {
                setNewStudent({
                  id: "",
                  firstName: "",
                  lastName: "",
                  rfid: "",
                  contactNumber: "",
                  guardianName: "",
                  guardianContactNumber: "",
                  program: "",
                  yearLevel: "",
                  docId: "",
                });
                setErrorMessage("");
                setShowDialog(true);
              }}
            >
              Add Student
            </Button>
          </div>

          <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontFamily: "'Poppins', Sans-Serif" }}>
              {newStudent.docId ? "Update Student" : "Add New Student"}
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
                  required
                />
                <TextField
                  label="First Name"
                  value={newStudent.firstName}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, firstName: e.target.value })
                  }
                  fullWidth
                  required
                />
                <TextField
                  label="Last Name"
                  value={newStudent.lastName}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, lastName: e.target.value })
                  }
                  fullWidth
                  required
                />
                <TextField
                  label="RFID No."
                  value={newStudent.rfid}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, rfid: e.target.value })
                  }
                  fullWidth
                  required
                />
                {errorMessage && (
                  <Typography color="error" sx={{ width: "100%" }}>
                    {errorMessage}
                  </Typography>
                )}
                <TextField
                  label="Contact Number"
                  value={newStudent.contactNumber}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      contactNumber: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Guardian Name"
                  value={newStudent.guardianName}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      guardianName: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Guardian Contact Number"
                  value={newStudent.guardianContactNumber}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      guardianContactNumber: e.target.value,
                    })
                  }
                  fullWidth
                />
                <FormControl fullWidth required>
                  <InputLabel>Program</InputLabel>
                  <Select
                    value={newStudent.program}
                    onChange={(e) => {
                      setNewStudent({
                        ...newStudent,
                        program: e.target.value,
                        yearLevel: "",
                      });
                    }}
                    label="Program"
                  >
                    {programOptions.map((program) => (
                      <MenuItem key={program} value={program}>
                        {program}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth required disabled={!newStudent.program}>
                  <InputLabel>Year Level</InputLabel>
                  <Select
                    value={newStudent.yearLevel}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        yearLevel: e.target.value,
                      })
                    }
                    label="Year Level"
                  >
                    {(yearLevelsForProgram[newStudent.program] || []).map(
                      (year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDialog(false)}>Cancel</Button>
              <Button
                onClick={handleAddOrUpdateStudent}
                variant="contained"
                sx={{
                  backgroundColor: "#0057A4",
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
              sx={{ width: "300px" }}
            />

            <FormControl sx={{ width: "200px" }}>
              <InputLabel>Program</InputLabel>
              <Select
                value={selectedProgram}
                onChange={(e) => {
                  setSelectedProgram(e.target.value);
                  setSelectedYearLevel("");
                }}
                label="Program"
              >
                <MenuItem value="">All</MenuItem>
                {programOptions.map((program) => (
                  <MenuItem key={program} value={program}>
                    {program}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ width: "200px" }}>
              <InputLabel>Year Level</InputLabel>
              <Select
                value={selectedYearLevel}
                onChange={(e) => setSelectedYearLevel(e.target.value)}
                label="Year Level"
                disabled={!selectedProgram}
              >
                {yearLevelOptions.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <TableContainer component={Paper}>
            <Table aria-label="students table">
              <TableHead sx={{ backgroundColor: "#F0F2F5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Student ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Program</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Year Level</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow key={student.docId} hover>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>
                      <span
                        style={{
                          color: "#1976d2",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => {
                          navigate(`/studentprof/${student.docId}`);
                        }}
                      >
                        {student.firstName} {student.lastName}
                      </span>
                    </TableCell>

                    <TableCell>{student.program}</TableCell>
                    <TableCell>{student.yearLevel}</TableCell>
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Actions for ${student.firstName} ${student.lastName}`}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleUpdateStudent(index)}
                        aria-label="Edit student"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteStudent(index)}
                        aria-label="Delete student"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No students found.
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

export default Classlist;
