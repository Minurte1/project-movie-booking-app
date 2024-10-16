const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const homeControllerSeatV2 = require("../controllers/homeControllerSeatv2");
const CommentController = require("../controllers/CommentController");
// Lấy danh sách phim
router.get("/movies", homeController.getMovies);

// Thêm phim mới
router.post("/movies", homeController.addMovie);

// Xóa phim
router.delete("/movies/:id", homeController.deleteMovie);

// Cập nhật phim
router.put("/movies/:id", homeController.updateMovie);
router.post("/login/admin", homeController.LoginAdmin);
router.post("/register/admin", homeController.RegisterAdmin);

//users
router.get("/users", homeController.getUsers);

//
router.get("/bookings", homeController.getBookings); // Lấy danh sách đặt vé
router.post("/bookings", homeController.addBooking); // Thêm đặt vé mới

// Lấy danh sách ghế
router.get("/seat", homeControllerSeatV2.getSeats);
router.get("/seat/id_movie/:id_movie", homeControllerSeatV2.getSeats_ByID);
// Thêm ghế mới
router.post("/seat", homeControllerSeatV2.addSeat);

// Cập nhật ghế
router.put("/seat/:id", homeControllerSeatV2.updateSeat);

// Xóa ghế
router.delete("/seat/:id", homeControllerSeatV2.deleteSeat);
router.get("/total-revenue", homeController.getTotalRevenue);
router.post("/login-gg", homeController.LoginGoogle);

// Định nghĩa các route cho CRUD
router.post("/comments", CommentController.addComment);
router.get("/comments", CommentController.getAllComments);
router.get("/comments/:id", CommentController.getCommentById);
router.get("/commentsSanPham/:id", CommentController.getCommentByIdSanPham);
router.put("/comments/:id", CommentController.updateComment);
router.delete("/comments/:id", CommentController.deleteComment);

module.exports = router;
