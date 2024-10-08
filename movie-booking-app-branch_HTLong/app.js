"use strict";
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const validator = require("email-validator");
const uuid = require("uuid");
const https = require("https");
const crypto = require("crypto");
const db_conn = require("./db_connect");
const getToken = require("./getToken");
var cors = require("cors");
const { error } = require("console");
const { ALL } = require("dns");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.urlencoded({ extended: true }));
//test function
app.get("/test", (req, res) => {
  res.status(200).json({ data: "", message: "Working!" });
});

//user register function
app.post("/register", async (req, res, next) => {
  const obj_keys = Object.keys(req.body);

  for (let i = 0; i < obj_keys.length; i++) {
    if (!req.body[obj_keys[i]]) {
      res.status(400).json({ data: "", message: "Empty fields!" });
      return next();
    }
  }

  switch (obj_keys.length) {
    case 4:
      const user_id = uuid.v4();
      const username = req.body.username;
      const password = await bcrypt.hash(req.body.password, 10);
      const email = req.body.email;
      const phone_no = req.body.phone_no;
      const status = 1;

      try {
        const conn = await db_conn.pool.getConnection();

        const sql_search =
          "SELECT * FROM users WHERE username = ? OR email = ? OR phone_no = ?";
        const [result] = await conn.query(sql_search, [
          username,
          email,
          phone_no,
        ]);

        if (result.length === 0) {
          const sql_insert =
            "INSERT INTO users VALUES (?,?,?,?,?,ADDDATE(NOW(), INTERVAL -10 DAY),?)";
          await conn.query(sql_insert, [
            user_id,
            username,
            password,
            email,
            phone_no,
            status,
          ]);

          conn.release();
          res
            .status(200)
            .json({ data: "", message: "users created successfully!" });
        } else {
          conn.release();
          res.status(400).json({ data: "", message: "Duplicate values!" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ data: "", message: "Internal Server Error" });
      }
      break;
    default:
      res.status(400).json({ data: "", message: "Missing fields!" });
  }
});

//login function
app.post("/login", async (req, res, next) => {
  try {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (req.cookies["tokens"]) {
      res.status(400).json({ data: "", message: "Already logged in!" });
      return next();
    }

    const { username, password } = req.body;

    // Kiểm tra đầu vào
    if (!username) {
      res.status(400).json({ data: "", message: "Missing username!" });
      return next();
    }

    if (!password) {
      res.status(400).json({ data: "", message: "Missing password!" });
      return next();
    }

    // Kết nối cơ sở dữ liệu
    const conn = await db_conn.pool.getConnection();

    // Xây dựng câu truy vấn tìm kiếm
    let sql_search = "SELECT password, user_id, status FROM users WHERE ";
    if (validator.validate(username)) {
      sql_search += "email = ?";
    } else {
      sql_search += "username = ?";
    }

    // Ẩn tài khoản admin nếu đang trong môi trường production
    if (process.env.PRODUCTION == "true") {
      sql_search += ' AND NOT username = "admin"';
    }

    // Thực hiện truy vấn
    const [result] = await conn.query(sql_search, [username]);

    // Giải phóng kết nối
    conn.release();

    // Xử lý kết quả truy vấn
    if (result.length === 1) {
      const user = result[0];

      // Kiểm tra trạng thái tài khoản
      if (user.status === 0) {
        res.status(403).json({ data: "", message: "Account locked!" });
        return next();
      }

      // Kiểm tra mật khẩu
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const access_token = await getToken.getAccessToken(
          { user_id: user.user_id },
          "1h"
        );
        const refresh_token = await getToken.getRefreshToken(
          { user_id: user.user_id },
          "1d"
        );

        // Tạo cookie chứa token và trả về phản hồi thành công
        res
          .status(200)
          .cookie(
            "tokens",
            JSON.stringify({
              access_token,
              refresh_token,
            }),
            {
              httpOnly: true,
              sameSite: "strict",
              secure: process.env.PRODUCTION === "true",
            }
          )
          .json({ data: "", message: "Login successful!" })
          .end();
      } else {
        res.status(401).json({ data: "", message: "Wrong password!" });
      }
    } else {
      res.status(404).json({ data: "", message: "Wrong username!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: "", message: "Internal Server Error" });
  }
});

//logout function
app.delete("/logout", getToken.tokenExist, (req, res, next) => {
  //parameters (refresh_token), format json
  res
    .status(200)
    .clearCookie("tokens")
    .json({ data: "", message: "Logged out!" });
});

//renew login session function
app.post("/renewToken", getToken.tokenExist, async (req, res) => {
  const refresh_token = JSON.parse(req.cookies["tokens"]).refresh_token;

  if (!refresh_token) {
    res.status(400).json({ data: "", message: "Missing refresh token!" });
    return next();
  }

  await jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        res.status(401).json({ data: "", message: "Invalid refresh token!" });
        return next();
      }

      const access_token = await getToken.getAccessToken(
        { user_id: user.user_id },
        "1h"
      ); //create new access token
      res
        .status(200)
        .cookie(
          "tokens",
          JSON.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
          }),
          { httpOnly: true, sameSite: "strict", secure: false }
        )
        .json({ data: "", message: "Access token refreshed!" });
    }
  );
});

//get login user information
app.get(
  "/account",
  getToken.tokenExist,
  getToken.validateToken,
  async (req, res) => {
    //no parameters
    const user_id = req.user.user_id;
    const sql_search =
      "SELECT username, phone_no, email FROM Users where user_id = ?";
    const getUser_query = mysql.format(sql_search, [user_id]);

    db_conn.pool.getConnection(async (err, conn) => {
      if (err) throw err.message;

      await conn.query(getUser_query, (err, result) => {
        conn.release();
        if (err) throw err;

        res.status(200).json(result);
      });
    });
  }
);

//update user information
app.post(
  "/update_user",
  getToken.tokenExist,
  getToken.validateToken,
  getToken.validateFields,
  async (req, res, next) => {
    //only send updating field if password then also need to include old_password (send password first)
    const user_id = req.user.user_id;
    const update_fields = Object.keys(req.body);
    const allow_fields = ["username", "email", "phone_no", "password"];

    if (update_fields.length < 1) {
      res.status(400).json({ data: "", message: "Empty request!" });
      return next();
    }

    for (let i = 0; i < update_fields.length; i++) {
      //check for null value
      if (!req.body[update_fields[i]]) {
        res.status(400).json({ data: "", message: "Empty fields!" });
        return next();
      }
    }

    if (!allow_fields.includes(update_fields[0])) {
      res.status(400).json({ data: "", message: "Unknown field!" });
      return next();
    }

    if (
      update_fields.includes("password") &&
      update_fields.includes("old_password") &&
      update_fields.length == 2
    ) {
      //check for password
      const sql_search = "SELECT password FROM Users where user_id = ?";
      const password_search_query = mysql.format(sql_search, [user_id]);

      await db_conn.pool.getConnection(async (err, conn) => {
        await conn.query(password_search_query, async (err, result) => {
          if (err) throw err;

          if (await bcrypt.compare(req.body.old_password, result[0].password)) {
            const sql_update =
              "UPDATE Users SET " + update_fields[0] + " =? where user_id = ?";
            const updateUser_query = mysql.format(sql_update, [
              await bcrypt.hash(req.body[update_fields[0]], 10),
              user_id,
            ]);

            await conn.query(updateUser_query, async (err) => {
              conn.release();

              if (err) throw err;

              res
                .status(200)
                .json({ data: "", message: "User information updated!" });
            });
          } else {
            conn.release();
            res.status(401).json({ data: "", message: "Wrong old passowrd!" });
          }
        });
      });
    } else {
      if (update_fields.length != 1) {
        res
          .status(400)
          .json({ data: "", message: "Invalid number of fields!" });
        return next();
      }
      const sql_search =
        "SELECT * FROM Users where " + update_fields[0] + " = ?";
      const user_search_query = mysql.format(
        sql_search,
        req.body[update_fields[0]]
      );
      await db_conn.pool.getConnection(async (err, conn) => {
        await conn.query(user_search_query, async (err, result) => {
          if (err) throw err;

          switch (result.length) {
            case 0:
              //preparing update statement
              const sql_update =
                "UPDATE Users SET " +
                update_fields[0] +
                " =? where user_id = ?";
              const updateUser_query = mysql.format(sql_update, [
                req.body[update_fields[0]],
                user_id,
              ]);

              //execute the update statement
              await conn.query(updateUser_query, async (err) => {
                conn.release();
                if (err) throw err.message;
                res
                  .status(200)
                  .json({ data: "", message: "User information updated!" });
              });
              break;
            default:
              conn.release();
              res.status(400).json({ data: "", message: "Duplicate values!" });
          }
        });
      });
    }
  }
);

// admin function deactivate/activate user
app.post(
  "/changeUserStatus",
  getToken.tokenExist,
  getToken.validateToken,
  getToken.validateAdmin,
  async (req, res, next) => {
    const user_id = req.body.user_id;
    const status = req.body.status;

    if (!user_id || !status) {
      res.status(400).send("Missing input fields!");
      return next();
    }

    const sql_update = "UPDATE Users SET status = ? where user_id = ?";
    const changeStatus_query = mysql.format(sql_update, [status, user_id]);

    db_conn.pool.getConnection(async (err, conn) => {
      await conn.query(changeStatus_query, (err) => {
        if (err) throw err.message;

        if (status == 1) {
          res.status(200).json({ data: "", message: "User activated!" });
          return next();
        }

        res.status(200).json({ data: "", message: "User deactivated!" });
      });
    });
  }
);

//admin function see all users
app.get(
  "/manageUsers",
  getToken.tokenExist,
  getToken.validateToken,
  getToken.validateAdmin,
  async (req, res) => {
    let page = 1;
    if (
      typeof req.body.page != "undefined" &&
      Number.isInteger(req.body.page)
    ) {
      page = req.body.page;
    }
    const user_id = process.env.ADMIN_ID;
    const end = page * 10;
    const begin = end - 9;

    const sql_search =
      "WITH Paging AS ( SELECT *, ROW_NUMBER() OVER (ORDER BY username) AS RowNum FROM Users WHERE NOT user_id = ?) SELECT * FROM Paging WHERE RowNum BETWEEN ? AND ?";
    const user_query = mysql.format(sql_search, [user_id, begin, end]);

    db_conn.pool.getConnection(async (err, conn) => {
      await conn.query(user_query, (err, result) => {
        if (err) throw err.message;

        res.status(200).json(result);
      });
    });
  }
);

//search film list
app.get("/search_films", async (req, res) => {
  //paramter: page, search, (array) genre, date(YYYY-mm-dd), time
  let page = 1;
  if (typeof req.body.page != "undefined" && Number.isInteger(req.body.page)) {
    page = req.body.page;
  }
  const end = page * 8;
  const begin = end - 7;
  let params = [];

  let sql_search =
    'WITH Paging AS ( SELECT m.movie_id, m.title, m.director, m.cast, m.description, DATE_FORMAT(m.release_date, "%Y-%m-%d") AS release_date, m.duration, m.poster, ROW_NUMBER() OVER (ORDER BY movie_id) AS RowNum FROM movie m INNER JOIN screening s ON m.movie_id=s.movie_id';
  if (typeof req.body.search != "undefined") {
    sql_search += " WHERE m.title REGEXP ?";
    const search = "^" + req.body.search;
    params.push(search);
  }
  if (
    typeof req.body.date != "undefined" &&
    typeof req.body.time != "undefined"
  ) {
    if (!sql_search.match(/where/i)) {
      sql_search += " WHERE";
    } else {
      sql_search += " AND";
    }
    sql_search +=
      ' DATE_FORMAT(s.time_start, "%Y-%m-%d") = ? AND DATE_FORMAT(s.time_start, "%H:%i") > ?';
    params.push(req.body.date, req.body.time);
  }
  if (typeof req.body.genre != "undefined") {
    if (!sql_search.match(/where/i)) {
      sql_search += " WHERE";
    } else {
      sql_search += " AND";
    }
    const genre = req.body.genre;
    const genres = string.split(genre, ",");
    for (let i = 0; i < genres.length; i++) {
      if (i > 0) {
        sql_search += " AND";
      }
      sql_search += " genre REGEXP ?";
      params.push(genres[i]);
    }
  }

  params.push(begin, end);
  sql_search += ") SELECT * FROM Paging WHERE RowNum BETWEEN ? AND ?";
  const movieSearch_query = mysql.format(sql_search, params);

  await db_conn.pool.getConnection(async (err, conn) => {
    await conn.query(movieSearch_query, (err, result) => {
      conn.release();
      if (err) throw err.message;

      res.status(200).json(result);
    });
  });
});

//flims list
app.get("/films", async (req, res) => {
  // return up to 8 newest films and 8 upcoming films
  console.log("check film");

  try {
    if (typeof req.query.id !== "undefined") {
      const movie_id = req.query.id;
      const film_detail = "SELECT * FROM movie WHERE movie_id = ?";
      const query_one_film = mysql.format(film_detail, [movie_id]);

      // Lấy kết nối từ pool và sử dụng promise
      const conn = await db_conn.pool.getConnection();
      try {
        const [film] = await conn.query(query_one_film);
        film.forEach((item) => {
          item.seat_price = parseInt(process.env.SEAT_PRICE);
          item.VIP_price = parseInt(process.env.SEAT_PRICE) + 20000;
        });

        res.status(200).json(film);
      } finally {
        conn.release(); // Giải phóng kết nối
      }
    } else {
      const new_films_query = "SELECT * FROM movie LIMIT 8"; // Giới hạn 8 bộ phim mới nhất

      // Lấy kết nối từ pool và sử dụng promise
      const conn = await db_conn.pool.getConnection();
      try {
        const [all_films] = await conn.query(new_films_query);
        res.status(200).json(all_films);
      } finally {
        conn.release(); // Giải phóng kết nối
      }
    }
  } catch (err) {
    console.error(err); // Log lỗi nếu có
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//query film schedule
app.get("/schedule", async (req, res) => {
  try {
    if (typeof req.query.id !== "undefined") {
      const movie_id = req.query.id;
      const sql_search =
        'SELECT screening_id, movie_id, DATE_FORMAT(time_start, "%Y-%m-%d") AS time_start_d, DATE_FORMAT(time_start, "%H:%i") as time_start_t FROM screening WHERE movie_id = ?';
      const query_one_film = mysql.format(sql_search, [movie_id]);

      const conn = await db_conn.pool.getConnection();
      try {
        const [result] = await conn.query(query_one_film);
        res.status(200).json(result);
      } finally {
        conn.release();
      }
    } else {
      const sql_search =
        'SELECT s.screening_id, DATE_FORMAT(s.time_start, "%Y-%m-%d") AS time_start_d, DATE_FORMAT(s.time_start, "%H:%i") as time_start_t, s.price_id, m.title, m.rating, m.duration FROM screening s INNER JOIN movie m ON m.movie_id = s.movie_id';

      const conn = await db_conn.pool.getConnection();
      try {
        const [result] = await conn.query(sql_search);
        res.status(200).json(result);
      } finally {
        conn.release();
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//query seat layout
app.get("/seatLayout", async (req, res, next) => {
  const screening_id = req.query.scr_id;
  const all_seat = req.query.all;

  if (typeof all_seat === "undefined") {
    return res.status(400).json({ data: "", message: "Missing param!" });
  }

  if (all_seat == 1 || all_seat == 0) {
    const rsSeat_query = mysql.format(
      "SELECT * FROM Seat_Reservation WHERE screening_id = ?",
      [screening_id]
    );
    const allSeat_query = mysql.format(
      "SELECT seat_id, row, number, vip FROM Seat s INNER JOIN screening sc ON s.room_id = sc.room_id WHERE sc.screening_id = ?",
      [screening_id]
    );

    const conn = await db_conn.pool.getConnection();
    try {
      let result;
      if (all_seat == 1) {
        [result] = await conn.query(allSeat_query);
      } else {
        [result] = await conn.query(rsSeat_query);
      }
      res.status(200).json(result);
    } finally {
      conn.release();
    }
  } else {
    res.status(400).json({ data: "", message: "Invalid param!" });
  }
});

//create ticket reservation
app.post("/booking", async (req, res, next) => {
  const screening_id = req.body.screening_id;
  const seat_id = req.body.seat_id;

  if (typeof seat_id !== "object") {
    return res.status(400).json({ data: "", message: "Wrong seat_id format!" });
  }

  const transaction_id = uuid.v4();
  let input = [];
  let search = [screening_id];

  if (!screening_id || !seat_id) {
    return res.status(400).json({ data: "", message: "Fields Missing!" });
  }

  let reservation_check =
    "SELECT screening_id, seat_id FROM Seat_Reservation WHERE screening_id = ?";
  let booking_insert = "";

  seat_id.forEach((item, index) => {
    if (index === 0) {
      reservation_check += " AND seat_id = ?";
    } else {
      reservation_check += " OR seat_id = ?";
    }
    search.push(item);
    booking_insert += "INSERT INTO Seat_Reservation VALUES (?,?,?,?); ";
    input.push(uuid.v4(), item, transaction_id, screening_id);
  });

  const booking_query = mysql.format(booking_insert, input);
  const reservation_query = mysql.format(reservation_check, search);
  const price_query = mysql.format(
    "SELECT pr.price_amt FROM screening sr INNER JOIN Price pr ON sr.price_id = pr.price_id WHERE screening_id = ?",
    [screening_id]
  );

  const conn = await db_conn.pool.getConnection();
  try {
    await conn.beginTransaction();

    const [taken] = await conn.query(reservation_query);
    if (taken.length !== 0) {
      await conn.rollback();
      return res
        .status(401)
        .json({ data: "", message: "Seats are unavailable!" });
    }

    const [price] = await conn.query(price_query);
    const amount = price[0]?.price_amt;

    await conn.query(booking_query);
    await conn.commit();

    res.status(200).json({ data: "", message: "Booking successful!" });
  } catch (err) {
    console.error(err);
    await conn.rollback();
    res.status(500).json({ data: "", message: "Booking failed!" });
  } finally {
    conn.release();
  }
});
const homeRouter = require("./routes/homeRouter");
app.use("/api", homeRouter);
module.exports = app;
