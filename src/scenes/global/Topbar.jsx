import { Avatar, Box, IconButton, Typography, ButtonBase } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate("/notification");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        bgcolor: "#0057A4",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Logo */}
      <Box>
        <img src="/stilogoz.png" alt="Logo" style={{ height: "60px" }} />
      </Box>

      <Box display="flex" alignItems="center" marginLeft="auto">
        {/* Notification */}
        <IconButton
          sx={{ color: "white", mr: 2 }}
          onClick={handleNotificationClick}
        >
          <NotificationsOutlinedIcon sx={{ fontSize: 35 }} />
        </IconButton>

        {/* Separator */}
        <Box
          sx={{
            width: "1px",
            height: "40px",
            backgroundColor: "white",
            mr: 2,
          }}
        />

        {/* Teacher Profile Button */}
        <ButtonBase
          onClick={() => navigate("/profile")}
          sx={{
            backgroundColor: "#90A4AE",
            borderRadius: "20px",
            padding: "5px 12px",
            display: "flex",
            alignItems: "center",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#B0BEC5",
            },
          }}
        >
          <Avatar
            src="/path-to-your-image.png"
            sx={{ width: 32, height: 32, marginRight: 1 }}
          />
          <Typography sx={{ color: "black", fontWeight: "bold",fontFamily: "'Poppins', sans-serif"}}>
            Teacher
          </Typography>
        </ButtonBase>
      </Box>
    </Box>
  );
};

export default Topbar;
