import React, { useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import axios from "axios";

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
  });
  const [poster, setPoster] = useState(null);

  // Hàm xử lý thay đổi giá trị input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm xử lý upload poster
  const handlePosterUpload = (event) => {
    setPoster(event.target.files[0]);
  };

  // Hàm xử lý submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const movieData = new FormData();
      // Append tất cả các giá trị từ form
      Object.keys(formData).forEach((key) => {
        movieData.append(key, formData[key]);
      });

      if (poster) {
        movieData.append("poster", poster); // Append poster nếu có
      }

      // Gửi dữ liệu tới API
      await axios.post("/api/movies", movieData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Movie added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Director */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Director"
              name="director"
              value={formData.director}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Cast */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cast"
              name="cast"
              value={formData.cast}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Genre */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Release Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Release Date"
              type="date"
              name="release_date"
              value={formData.release_date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* Duration */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Duration (minutes)"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Language */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Rating */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Rating"
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              inputProps={{ min: 0, max: 10 }}
              required
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
            />
          </Grid>

          {/* Poster */}
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Poster
              <input type="file" hidden onChange={handlePosterUpload} />
            </Button>
            {poster && <p>{poster.name}</p>}
          </Grid>

          {/* Trailer */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Trailer URL"
              name="trailer"
              value={formData.trailer}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Movie
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default MovieManager;
