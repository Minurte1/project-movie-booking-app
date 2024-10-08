const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const homeControllerSeatV2 = require("../controllers/homeControllerSeatv2");
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

// Thêm ghế mới
router.post("/seat", homeControllerSeatV2.addSeat);

// Cập nhật ghế
router.put("/seat/:id", homeControllerSeatV2.updateSeat);

// Xóa ghế
router.delete("/seat/:id", homeControllerSeatV2.deleteSeat);
router.get("/total-revenue", homeController.getTotalRevenue);
router.post("/login-gg", homeController.LoginGoogle);
module.exports = router;
