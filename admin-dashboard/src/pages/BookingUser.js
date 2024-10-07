import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import axios from "axios";
const BookingUser = () => {
  const [bookingData, setBookingData] = useState([]);
  useEffect(() => {
    fetchBooking();
  }, []);
  const fetchBooking = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings");
      console.log(response.data);
      setBookingData(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <>
      {" "}
      <h3>Booking User</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Showtime</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Day of Week</TableCell>
              <TableCell>Seat Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone_number}</TableCell>
                <TableCell>{row.showtime}</TableCell>
                <TableCell>{row.payment_method}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.day_of_week}</TableCell>
                <TableCell>{row.seat_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookingUser;
