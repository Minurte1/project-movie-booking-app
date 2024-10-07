const db = require("../db_connect");

// Lấy danh sách các bộ phim
exports.getMovies = async (req, res) => {
  try {
    const [movies] = await db.query("SELECT * FROM movies");
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// Thêm một bộ phim mới
exports.addMovie = async (req, res) => {
  const {
    title,
    director,
    cast,
    genre,
    release_date,
    duration,
    language,
    rating,
    description,
    poster,
    trailer,
  } = req.body;

  try {
    const sql = `INSERT INTO movies (title, director, cast, genre, release_date, duration, language, rating, description, poster, trailer)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.query(sql, [
      title,
      director,
      cast,
      genre,
      release_date,
      duration,
      language,
      rating,
      description,
      poster,
      trailer,
    ]);
    res.status(201).json({ message: "Movie added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add movie" });
  }
};

// Xóa một bộ phim
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM movies WHERE id = ?", [id]);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete movie" });
  }
};

// Cập nhật thông tin một bộ phim
exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    director,
    cast,
    genre,
    release_date,
    duration,
    language,
    rating,
    description,
    poster,
    trailer,
  } = req.body;

  try {
    const sql = `UPDATE movies SET title = ?, director = ?, cast = ?, genre = ?, release_date = ?, duration = ?, language = ?, rating = ?, description = ?, poster = ?, trailer = ? WHERE id = ?`;
    await db.query(sql, [
      title,
      director,
      cast,
      genre,
      release_date,
      duration,
      language,
      rating,
      description,
      poster,
      trailer,
      id,
    ]);
    res.status(200).json({ message: "Movie updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update movie" });
  }
};

exports.LoginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra xem người dùng có tồn tại không
    const [users] = await db.pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Kiểm tra user_id
    const user = users[0];
    const isAdmin = user.user_id === "1333333a-d85e-4f7c-91b3-2beeb7db4172";

    if (isAdmin) {
      // Nếu user_id trùng, trả về thông báo thành công
      return res
        .status(200)
        .json({ message: "Login successful!", user_id: "Admin" });
    } else {
      // Nếu không phải admin
      return res.status(403).json({ message: "Not an admin!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to login" });
  }
};

exports.RegisterAdmin = async (req, res) => {
  const { username, password, user_id } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại hay chưa
    const [existingUser] = await db.pool.query(
      "SELECT * FROM users WHERE username = ? OR user_id = ?",
      [username, user_id]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Xác định trạng thái của người dùng
    const status = user_id === "1333333a-d85e-4f7c-91b3-2beeb7db4172" ? 1 : 0;

    // Thực hiện câu truy vấn để thêm người dùng vào cơ sở dữ liệu
    const [result] = await db.pool.query(
      "INSERT INTO users (user_id,username, password,email,phone_no,timer, status) VALUES (?, ?,?,?,?, NOW(), ?)",
      [username, password, user_id, status]
    );

    // Trả về phản hồi thành công
    res.status(201).json({
      message: "User registered successfully!",
      user_id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
};
