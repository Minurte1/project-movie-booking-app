import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material"; // Import MUI components
import "./SignInForm.scss"; // Import the CSS file

const SignInForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
    console.log("Form data:", formData);
    handleClose(); // Close the modal after submission
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body2" gutterBottom>
          Use your Google Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="email"
            type="email"
            required
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            required
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default SignInForm;
