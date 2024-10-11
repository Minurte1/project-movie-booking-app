import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SeatManager = () => {
  const [formData, setFormData] = useState({
    name: "",
    mota: "",
  });

  const [seats, setSeats] = useState([]);
  const [editingSeatId, setEditingSeatId] = useState(null); // ID của ghế đang chỉnh sửa
  const [openModal, setOpenModal] = useState(false); // Trạng thái mở Modal

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/seat");
      setSeats(response.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  // Mở Modal thêm hoặc chỉnh sửa ghế
  const openSeatModal = (seat = null) => {
    if (seat) {
      setFormData({
        name: seat.name,
        mota: seat.mota,
      });
      setEditingSeatId(seat.id); // Sửa ghế
    } else {
      // Thêm ghế
      setFormData({
        name: "",
        mota: "",
      });
      setEditingSeatId(null);
    }
    setOpenModal(true); // Mở modal
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const seatData = {
      name: formData.name,
      mota: formData.mota,
    };

    try {
      if (editingSeatId) {
        // Nếu đang chỉnh sửa, gọi API update
        await axios.put(
          `http://localhost:5000/api/seat/${editingSeatId}`,
          seatData
        );
        alert("Seat updated successfully");
      } else {
        // Nếu thêm mới
        await axios.post("http://localhost:5000/api/seat", seatData);
        alert("Seat added successfully");
      }

      // Reset form data
      setFormData({
        name: "",
        mota: "",
      });

      //  setEditingSeatId(null);
      fetchSeats(); // Cập nhật lại danh sách ghế
      //   setOpenModal(false); // Đóng modal
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (seatId) => {
    try {
      await axios.delete(`http://localhost:5000/api/seat/${seatId}`);
      alert("Seat deleted successfully");
      fetchSeats();
    } catch (error) {
      console.error("Error deleting seat:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => openSeatModal()}
        >
          Add Seat
        </Button>
      </Box>

      <TableContainer sx={{ maxHeight: "100vh" }}>
        <Table sx={{ mt: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Movie_id</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seats.map((seat) => (
              <TableRow key={seat.id}>
                <TableCell>{seat.name}</TableCell>
                <TableCell>{seat.mota}</TableCell>
                <TableCell>{seat.status}</TableCell>
                <TableCell>{seat.id_movie}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openSeatModal(seat)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(seat.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal để thêm/sửa ghế */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editingSeatId ? "Edit Seat" : "Add Seat"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="mota"
                value={formData.mota}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingSeatId ? "Update Seat" : "Save Seat"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SeatManager;
