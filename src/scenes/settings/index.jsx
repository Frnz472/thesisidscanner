import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { Box, Typography } from "@mui/material";

const Settings = () => {
  const navigate = useNavigate();

  const handleProfileSettingsClick = () => {
    navigate("/profile-settings");
  };

  const handleNotificationPreferencesClick = () => {
    navigate("/notification-preferences");
  };

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
            Settings
          </Typography>

          {/* Profile Settings Button */}
          <Box
            onClick={handleProfileSettingsClick}
            sx={{
              fontFamily: "'Poppins', sans-serif",
              padding: "15px 142.3px",
              fontSize: "18px",
              fontWeight: "regular",
              textAlign: "center",
              borderRadius: "10px",
              width: "fit-content",
              marginBottom: "15px",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              transition: "background 0.2s",
              "&:hover": { backgroundColor: "#ddd" },
            }}
          >
            Profile Settings
          </Box>

          {/* Notification Preferences Button */}
          <Box
            onClick={handleNotificationPreferencesClick} // 👈 Added this onClick
            sx={{
              fontFamily: "'Poppins', sans-serif",
              padding: "15px 107.5px",
              fontSize: "18px",
              fontWeight: "regular",
              textAlign: "center",
              borderRadius: "10px",
              width: "fit-content",
              marginBottom: "15px",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              transition: "background 0.2s",
              "&:hover": { backgroundColor: "#ddd" },
            }}
          >
            Notification Preferences
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Settings;
