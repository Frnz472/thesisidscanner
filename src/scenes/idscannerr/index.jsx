import React from 'react';
import { Box, Typography, Button, AppBar, Toolbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const IDScanner = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: "100vh",
      backgroundColor: '#f5f5f5'
    }}>
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: "#0057A4", 
          boxShadow: 'none', 
          mb: 3,
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        <Toolbar>
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ 
              color: "white", 
              fontFamily: "'Poppins', sans-serif", 
              mr: 2,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Back
          </Button>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              fontFamily: "'Poppins', sans-serif", 
              fontWeight: 600,
              fontSize: '1.25rem'
            }}
          >
            ID Scanner
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ 
        p: 4, 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh'
      }}>
        <Box sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          p: 4,
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%'
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontFamily: "'Poppins', sans-serif", 
              mb: 3,
              fontWeight: 600,
              color: '#0057A4'
            }}
          >
            ID Scanner
          </Typography>
          <Typography 
            sx={{ 
              fontFamily: "'Poppins', sans-serif",
              mb: 4,
              color: '#555'
            }}
          >
            Point your camera at the student's ID QR code to scan
          </Typography>
          
          {/* Placeholder for scanner */}
          <Box sx={{
            width: '100%',
            height: '300px',
            backgroundColor: '#e0e0e0',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4
          }}>
            <Typography sx={{ color: '#777' }}>
              Scanner Preview
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0057A4',
              color: 'white',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              padding: '10px 24px',
              '&:hover': {
                backgroundColor: '#003d7a'
              }
            }}
          >
            Scan Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default IDScanner;