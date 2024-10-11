const pool = require("../db_connect"); // Kết nối đến MySQL từ file db.js

exports.getAllComments = async (req, res) => {
  const sql = "SELECT * FROM binh_luan";

  try {
    const [results] = await pool.pool.execute(sql);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  const { id_nguoi_dung, id_san_pham, danh_gia, noi_dung } = req.body;
  console.log(req.body);

  const sql =
    "INSERT INTO binh_luan (id_nguoi_dung, id_san_pham, danh_gia, noi_dung,ngay_tao) VALUES (?, ?, ?, ?,NOW())";

  try {
    // const [results_user] = await pool.pool.execute(
    //   `select user_id from users where username = ?`,
    //   [id_nguoi_dung]
    // );
    // console.log(results_user[0].user_id);
    // const id_user = results_user[0].user_id;
    const [results] = await pool.pool.execute(sql, [
      id_nguoi_dung,
      id_san_pham,
      danh_gia,
      noi_dung,
    ]);

    const [results_comment] = await pool.pool.execute(
      `SELECT * FROM binh_luan WHERE id_san_pham = ?`,
      [id_san_pham]
    );
    console.log(results_comment);
    res.status(200).json({ DT: results_comment, EC: 1 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM binh_luan WHERE id_binh_luan = ?";

  try {
    const [results] = await pool.pool.execute(sql, [id]);
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
    const [results] = await pool.pool.execute(sql, [id]);
    if (results.length === 0) {
      res.status(200).json({ DT: [], EC: 0 });
    } else {
      res.status(200).json(results);
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
    const [results] = await pool.pool.execute(sql, [
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
    const [results] = await pool.pool.execute(sql, [id]);
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.status(200).json({ message: "Comment deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
