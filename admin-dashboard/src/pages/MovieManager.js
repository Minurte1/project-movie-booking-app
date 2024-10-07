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
  Container,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MovieManager = () => {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    cast: "",
    genre: "",
    release_date: "",
    duration: "",
    language: "",
    rating: "",
    description: "",
    trailer: "",
    poster: "",
    genre: "",
  });

  const [movies, setMovies] = useState([]);
  const [editingMovieId, setEditingMovieId] = useState(null); // ID của phim đang chỉnh sửa
  const [openModal, setOpenModal] = useState(false); // Trạng thái mở Modal

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/movies");
      console.log(response.data);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Mở Modal thêm hoặc chỉnh sửa phim
  const openMovieModal = (movie = null) => {
    if (movie) {
      setFormData({
        title: movie.title,
        director: movie.director,
        cast: movie.cast,
        genre: movie.genre,
        release_date: movie.release_date,
        duration: movie.duration,
        language: movie.language,
        rating: movie.rating,
        description: movie.description,
        trailer: movie.trailer,
        genre: movie.genre,
        poster: movie.poster,
      });
      setEditingMovieId(movie.movie_id); // Sửa phim
    } else {
      // Thêm phim
      setFormData({
        title: "",
        director: "",
        cast: "",
        genre: "",
        release_date: "",
        duration: "",
        language: "",
        rating: "",
        description: "",
        trailer: "",
        poster: "",
        genre: "",
        poster: "",
      });
      setEditingMovieId(null);
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

    const movieData = {
      title: formData.title,
      director: formData.director,
      cast: formData.cast,
      genre: formData.genre,
      release_date: formData.release_date,
      duration: formData.duration,
      language: formData.language,
      rating: formData.rating,
      description: formData.description,
      trailer: formData.trailer,
      genre: formData.genre,
      poster: formData.poster,
    };

    try {
      if (editingMovieId) {
        console.log("asd1");
        // Nếu đang chỉnh sửa, gọi API update
        await axios.put(
          `http://localhost:5000/api/movies/${editingMovieId}`,
          movieData
        );
        alert("Movie updated successfully");
      } else {
        // Nếu thêm mới
        await axios.post("http://localhost:5000/api/movies", movieData);
        alert("Movie added successfully");
      }

      // Reset form data
      setFormData({
        title: "",
        director: "",
        cast: "",
        genre: "",
        release_date: "",
        duration: "",
        language: "",
        rating: "",
        description: "",
        trailer: "",
        poster: "",
        genre: "",
      });

      setEditingMovieId(null);
      fetchMovies(); // Cập nhật lại danh sách phim
      setOpenModal(false); // Đóng modal
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${movieId}`);
      alert("Movie deleted successfully");
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };
  console.log(editingMovieId);
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => openMovieModal()}
        >
          Add Movie
        </Button>
      </Box>

      <TableContainer sx={{ maxHeight: "100vh" }}>
        <Table sx={{ mt: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Release Date</TableCell>

              <TableCell>Rating</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Cast</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Poster</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.director}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.release_date}</TableCell>

                <TableCell>{movie.rating}</TableCell>
                <TableCell>{movie.language}</TableCell>
                <TableCell>{movie.cast}</TableCell>
                <TableCell>{movie.description}</TableCell>
                <TableCell>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{
                      width: "100px",
                      height: "auto",
                      borderRadius: "4px",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => openMovieModal(movie)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(movie.movie_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal để thêm/sửa phim */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{editingMovieId ? "Edit Movie" : "Add Movie"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Director"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Cast"
                name="cast"
                value={formData.cast}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Release Date"
                name="release_date"
                type="date"
                value={formData.release_date}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              <TextField
                fullWidth
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Trailer"
                name="trailer"
                value={formData.trailer}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Poster"
                name="poster"
                value={formData.poster}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingMovieId ? "Update Movie" : "Save Movie"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MovieManager;
