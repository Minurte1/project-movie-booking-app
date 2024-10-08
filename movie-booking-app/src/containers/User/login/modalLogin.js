import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios"; // Import axios for API calls

import "./SignInForm.scss"; // Import the CSS file

const SignInForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [otp, setOtp] = useState(null); // Mã OTP
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Thêm logic đăng nhập vào đây
    console.log("Logging in with:", formData);
    handleClose(); // Close the modal after submission
  };

  const handleSendOtp = async () => {
    const { email } = formData;

    if (loading) {
      alert("Đang gửi...");
      return;
    }

    if (!email) {
      alert("Email Invalid");
      return;
    }

    setLoading(true);

    // Tạo mã OTP ngẫu nhiên
    let code = "";
    for (let i = 0; i < 6; i += 1) {
      code += Math.floor(Math.random() * 10).toString();
    }

    setOtp(parseInt(code)); // Lưu mã OTP vào state

    const data = {
      emailTo: email,
      template: "Mã Xác Nhận: " + code,
    };

    try {
      const response = await axios.post(
        "http://emailservice.somee.com/Email/sendMail",
        data
      );

      setLoading(false);
      alert("OTP Sent to Your Email");
      setIsOtpSent(true); // Hiện trường nhập OTP sau khi gửi email
      setCountdown(60); // Đặt lại đếm ngược về 60 giây

      // Bắt đầu đếm ngược
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = () => {
    if (parseInt(formData.otp) === otp) {
      alert("OTP Verified");
      // Cho phép người dùng đăng nhập ở đây
      handleSubmit(); // Hoặc bạn có thể redirect đến trang đăng nhập
    } else {
      alert("Invalid OTP");
    }
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
        <div className="box">
          <div className="logo"></div>
          <Typography variant="h6" component="h2">
            Sign In
          </Typography>
          <Typography variant="body2">Use your Google Account</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSendOtp}
              disabled={isOtpSent || loading} // Disable button if OTP has been sent or while loading
            >
              {isOtpSent ? `Resend OTP (${countdown}s)` : "Send OTP"}
            </Button>

            {isOtpSent && (
              <TextField
                label="OTP"
                name="otp"
                type="text"
                required
                fullWidth
                margin="normal"
                value={formData.otp}
                onChange={handleChange}
              />
            )}

            {isOtpSent && (
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={verifyOtp}
              >
                Verify OTP
              </Button>
            )}

            <Button
              className="mt-4"
              type="submit"
              variant="contained"
              color="success"
              fullWidth
            >
              Sign In
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default SignInForm;
