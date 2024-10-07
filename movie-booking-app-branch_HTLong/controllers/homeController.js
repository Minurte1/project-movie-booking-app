const pool = require("../db_connect");

const moment = require("moment"); // Nhập thư viện moment

// Lấy danh sách các bộ phim
exports.getMovies = async (req, res) => {
  try {
    const [movies] = await pool.pool.execute("SELECT * FROM movie");
    console.log("movies", movies);
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

  // Kiểm tra và thay thế giá trị undefined bằng null
  const movieData = [
    title || null,
    director || null,
    cast || null,
    genre || null,
    release_date || null,
    duration || null,
    language || null,
    rating || null,
    description || null,
    poster || null,
    trailer || null,
  ];

  console.log(req.body); // In ra để kiểm tra dữ liệu

  try {
    const sql = `INSERT INTO movie (title, director, cast, genre, release_date, duration, language, rating, description, poster, trailer)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Sử dụng pool.execute() để thực hiện câu lệnh SQL
    await pool.pool.execute(sql, movieData);
    const [result, field] = await pool.pool.execute(`select * from movie`);
    console.log("result", result);
    res.status(201).json({ message: "Movie added successfully", data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add movie" });
  }
};

// Xóa một bộ phim
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await pool.pool.execute("DELETE FROM movie WHERE movie_id = ?", [id]);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete movie" });
  }
};

exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
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
  console.log(req.body);
  // Chuyển đổi định dạng ngày sử dụng moment
  const formattedReleaseDate = moment(release_date).format("YYYY-MM-DD"); // Định dạng là YYYY-MM-DD
  console.log(formattedReleaseDate);
  try {
    const sql = `UPDATE movie SET title = ?, director = ?, cast = ?, genre = ?, release_date = ?, duration = ?, language = ?, rating = ?, description = ?, poster = ?, trailer = ? WHERE movie_id = ?`;
    await pool.pool.execute(sql, [
      title,
      director,
      cast,
      genre,
      formattedReleaseDate, // Sử dụng ngày đã chuyển đổi
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
    console.log(err);
    res.status(500).json({ error: "Failed to update movie" });
  }
};

exports.LoginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra xem người dùng có tồn tại không
    const [users] = await pool.pool.query(
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
  const { username, password, user_id, phoneNo, email } = req.body;
  console.log(req.body);
  try {
    // Kiểm tra xem người dùng đã tồn tại hay chưa
    const [existingUser] = await pool.pool.query(
      "SELECT * FROM users WHERE username = ? ",
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Xác định trạng thái của người dùng
    const status = user_id === "1333333a-d85e-4f7c-91b3-2beeb7db4172" ? 1 : 0;

    // Thực hiện câu truy vấn để thêm người dùng vào cơ sở dữ liệu
    const [result] = await pool.pool.query(
      "INSERT INTO users (user_id,username, password,email,phone_no,timer, status) VALUES (?, ?,?,?,?, NOW(), ?)",
      [user_id, username, password, email, phoneNo, status]
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
exports.getUsers = async (req, res) => {
  try {
    const [users] = await pool.pool.execute("SELECT * FROM users");
    console.log("movies", users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const [bookingUser] = await pool.pool.execute("SELECT * FROM bookingUser");
    console.log("bookingUser", bookingUser);
    res.json(bookingUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// Thêm đặt vé mới
exports.addBooking = async (req, res) => {
  const { bookingInfo, dayOfWeek, chooseSeat, day } = req.body;
  console.log(req.body);
  const sql =
    "INSERT INTO bookingUser (name, email, phone_number, showtime, payment_method, date, day_of_week, seat_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    const [results] = await pool.pool.query(sql, [
      bookingInfo.name,
      bookingInfo.email,
      bookingInfo.phone,
      bookingInfo.time,
      bookingInfo.payment,
      day,
      dayOfWeek,
      chooseSeat,
    ]);

    res.status(201).json({
      id: results.insertId,
      name: bookingInfo.name,
      email: bookingInfo.email,
      phone_number: bookingInfo.phone,
      showtime: bookingInfo.time,
      payment_method: bookingInfo.payment,
      date: day,
      day_of_week: dayOfWeek,
      seat_number: chooseSeat,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
