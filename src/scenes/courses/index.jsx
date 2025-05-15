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
  const [selectedProgram, setSelectedProgram] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const instructors = [
    {
      name: "Jane Doe",
      time: "08:00 AM – 10:00 AM",
      schedule: "MWF",
      program: "Computer Science",
      subject: "Data Structures",
      yearLevel: "2nd Year",
    },
    {
      name: "John Smith",
      time: "10:30 AM – 12:00 PM",
      schedule: "TTh",
      program: "Information Technology",
      subject: "Web Development",
      yearLevel: "3rd Year",
    },
  ];

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch = instructor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProgram =
      !selectedProgram || instructor.program === selectedProgram;
    return matchesSearch && matchesProgram;
  });

  const programOptions = [
    "Computer Science",
    "Information Technology",
    "Hospitality Management",
  ];

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Topbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3, fontFamily: "'Poppins', sans-serif" }}
          >
            Courses Management
          </Typography>

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
              <InputLabel>All</InputLabel>
              <Select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
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
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f0f2f5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Schedule</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Program & Subject Handled
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Year Level</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInstructors.map((instructor, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                    }}
                  >
                    <TableCell>{instructor.name}</TableCell>
                    <TableCell>{instructor.time}</TableCell>
                    <TableCell>{instructor.schedule}</TableCell>
                    <TableCell>
                      {instructor.program}
                      <br />
                      {instructor.subject}
                    </TableCell>
                    <TableCell>{instructor.yearLevel}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Courses;
