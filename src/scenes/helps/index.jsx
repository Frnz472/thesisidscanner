import React from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import MessageIcon from "@mui/icons-material/Message";
import { Box, Button, Typography } from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Helps = () => {
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
            position: "relative",
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
            Helps
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "",
              padding: "15px 20px",
              fontSize: "18px",
              fontWeight: "regular",
              fontFamily: "'Poppins', sans-serif",
              borderRadius: "10px",
              width: "350px",
              marginBottom: "15px",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              transition: "background 0.2s",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            <span>Adding attendance manually</span>
            <ArrowForwardIosIcon fontSize="small" style={{ color: "#333" }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "",
              padding: "15px 20px",
              fontSize: "18px",
              fontWeight: "regular",
              fontFamily: "'Poppins', sans-serif",
              borderRadius: "10px",
              width: "350px",
              marginBottom: "15px",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              transition: "background 0.2s",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            <span>Fixing errors in attendance records</span>
            <ArrowForwardIosIcon fontSize="small" style={{ color: "#333" }} />
          </Box>

          {/* Contact Support Button */}
          <div style={{ marginTop: "auto" }}>
            <Button
              variant="contained"
              startIcon={<MessageIcon />}
              sx={{
                backgroundColor: "#005BAB",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#004a94",
                },
              }}
            >
              Contact/Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Helps;
