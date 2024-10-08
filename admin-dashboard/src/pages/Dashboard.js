import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material"; // If using Material UI
import axios from "axios";
const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  useEffect(() => {
    fetchTotal();
  }, []);
  const fetchTotal = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/total-revenue"
      );
      console.log(response.data.TotalRevenue.totalRevenue);
      setTotalRevenue(response.data.TotalRevenue.totalRevenue);
      setTotalTickets(response.data.soLuongVe.totalTickets);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h5">Tổng số doanh thu</Typography>
            <Typography variant="h3" sx={{ color: "green", mt: 2 }}>
              {totalRevenue.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h5">Tổng số vé đã bán</Typography>
            <Typography variant="h3" sx={{ color: "blue", mt: 2 }}>
              {totalTickets.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
