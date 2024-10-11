const pool = require("../db_connect"); // Kết nối đến MySQL từ file db.js

exports.getAllComments = async (req, res) => {
  const sql = "SELECT * FROM binh_luan";

  try {
    const [results] = await pool.query(sql);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  const { id_nguoi_dung, id_san_pham, danh_gia, noi_dung } = req.body;

  const sql =
    "INSERT INTO binh_luan (id_nguoi_dung, id_san_pham, danh_gia, noi_dung) VALUES (?, ?, ?, ?)";

  try {
    const [results] = await pool.query(sql, [
      id_nguoi_dung,
      id_san_pham,
      danh_gia,
      noi_dung,
    ]);
    res.status(201).json({
      id: results.insertId,
      id_nguoi_dung,
      id_san_pham,
      danh_gia,
      noi_dung,
      ngay_tao: new Date(), // Thêm thông tin ngày tạo để hiển thị cho client
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM binh_luan WHERE id_binh_luan = ?";

  try {
    const [results] = await pool.query(sql, [id]);
    if (results.length === 0) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.status(200).json(results[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getCommentByIdSanPham = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM binh_luan WHERE id_san_pham = ?";

  try {
    const [results] = await pool.query(sql, [id]);
    if (results.length === 0) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.status(200).json(results[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { id_nguoi_dung, id_san_pham, danh_gia, noi_dung } = req.body;

  const sql = `UPDATE binh_luan SET id_nguoi_dung = ?, id_san_pham = ?, danh_gia = ?, noi_dung = ? WHERE id_binh_luan = ?`;

  try {
    const [results] = await pool.query(sql, [
      id_nguoi_dung,
      id_san_pham,
      danh_gia,
      noi_dung,
      id,
    ]);
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.status(200).json({ message: "Comment updated successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM binh_luan WHERE id_binh_luan = ?";

  try {
    const [results] = await pool.query(sql, [id]);
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.status(200).json({ message: "Comment deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
