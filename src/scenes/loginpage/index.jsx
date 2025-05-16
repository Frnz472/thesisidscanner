import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

const Login = ({ setAuth }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyCLZ3YCKtTNjJzM-1h1cSeqEuKYYODwxAo",
    authDomain: "stiidscanner-b8e8b.firebaseapp.com",
    projectId: "stiidscanner-b8e8b",
    storageBucket: "stiidscanner-b8e8b.firebasestorage.app",
    messagingSenderId: "881024085386",
    appId: "1:881024085386:web:9bc270dbc22d9011e2ac73",
    measurementId: "G-GX896CEYJ6",
  };

  const firebaseapp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseapp);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuth(true);
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      });
    } catch (error) {
      console.log(`There was an error: ${error}`);
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box mb={2}>
        <img src="/stilogoin.png" alt="Logo" style={{ height: "60px" }} />
      </Box>

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 350,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Log In
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#0054a6" }}
          onClick={handleLogin}
        >
          LOG IN
        </Button>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
