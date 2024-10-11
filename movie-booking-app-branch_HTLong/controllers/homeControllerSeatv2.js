const pool = require("../db_connect"); // Đảm bảo rằng bạn đã cấu hình kết nối database đúng

// Lấy danh sách ghế
exports.getSeats = async (req, res) => {
  const sql = "SELECT * FROM seatv2";

  try {
    const [results] = await pool.pool.query(sql);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSeats_ByID = async (req, res) => {
  const { id_movie } = req.params;

  // Câu lệnh SQL để lấy tất cả dữ liệu mà id_movie = id_movie hoặc id_movie là NULL
  const sql = "SELECT * FROM seatv2 WHERE id_movie = ? OR id_movie IS NULL";

  try {
    const [results] = await pool.pool.query(sql, [id_movie]);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm ghế mới
exports.addSeat = async (req, res) => {
  const { name, mota } = req.body;

  const sql = "INSERT INTO seatv2 (name, mota) VALUES (?, ?)";

  try {
    const [results] = await pool.pool.query(sql, [name, mota]);
    res.status(201).json({
      id: results.insertId,
      name,
      mota,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật ghế
exports.updateSeat = async (req, res) => {
  const { id } = req.params;
  const { name, mota } = req.body;

  const sql = "UPDATE seatv2 SET name = ?, mota = ? WHERE id = ?";

  try {
    const [results] = await pool.pool.query(sql, [name, mota, id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Seat not found" });
    }
    res.status(200).json({ message: "Seat updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa ghế
exports.deleteSeat = async (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM seatv2 WHERE id = ?";

  try {
    const [results] = await pool.pool.query(sql, [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Seat not found" });
    }
    res.status(200).json({ message: "Seat deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
