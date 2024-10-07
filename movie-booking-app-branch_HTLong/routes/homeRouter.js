const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// Lấy danh sách phim
router.get("/movies", homeController.getMovies);

// Thêm phim mới
router.post("/movies", homeController.addMovie);

// Xóa phim
router.delete("/movies/:id", homeController.deleteMovie);

// Cập nhật phim
router.put("/movies/:id", homeController.updateMovie);
router.post("login/admin", homeController.LoginAdmin);
router.post("register/admin", homeController.RegisterAdmin);
module.exports = router;
