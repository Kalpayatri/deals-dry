import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      console.log("Login response:", response);
      if (response.status === 201 || response.status === 200) {
        console.log("Login successful");
        localStorage.setItem("username", username);
        router.push("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        console.error("Error logging in:", error.message);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            type="text"
            value={username}
            onChange={handleUsernameChange}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
            required
          />
          <Box marginTop={2}>
            <Button variant="contained" sx={{background:'#6c757d'}} type="submit" fullWidth>
              Login
            </Button>
          </Box>
          {error && (
            <Typography variant="body2" color="error" marginTop={2}>
              {error}
            </Typography>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default Login;