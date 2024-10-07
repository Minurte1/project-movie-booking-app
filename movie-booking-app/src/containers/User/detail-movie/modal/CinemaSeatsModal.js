import React, { useEffect, useState } from "react";
import { Modal, Button, Box } from "@mui/material";
import axios from "axios";
const CinemaSeatsModal = ({ open, onClose, setChooseSeat }) => {
  const [seatData, setSeatData] = useState([]);
  useEffect(() => {
    fetchSeat();
  }, [open]);
  const fetchSeat = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/seat");
      console.log(response.data);
      setSeatData(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSeatClick = (seatId) => {
    setChooseSeat(seatId); // Lưu ghế đã chọn
    onClose(); // Đóng modal
  };
  const renderSeats = () => {
    const rows = ["A", "B", "C", "D"];
    return rows.map((row) => (
      <div key={row} className="seat-row">
        <div className="row-label">{`Dãy ${row}`}</div>
        <div className="seats">
          {seatData
            .filter((seat) => seat.name.startsWith(row))
            .map((seat) => (
              <Button
                key={seat.id}
                variant="contained"
                color="primary"
                style={{ marginRight: "10px", marginBottom: "10px" }}
                onClick={() => handleSeatClick(seat.name)} // Sử dụng onClick để chọn ghế
              >
                {seat.name}
              </Button>
            ))}
        </div>
      </div>
    ));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: "400px",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <h2>Chọn ghế của bạn</h2>
        {renderSeats()}
        {/* <Button
          variant="contained"
          color="success"
          onClick={onClose}
          style={{ marginTop: "20px" }}
        >
          Xác nhận
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={onClose}
          style={{ marginLeft: "10px", marginTop: "20px" }}
        >
          Hủy
        </Button> */}
      </Box>
    </Modal>
  );
};

export default CinemaSeatsModal;
