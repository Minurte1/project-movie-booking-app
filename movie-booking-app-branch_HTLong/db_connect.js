"use strict";
const mysql = require("mysql2/promise"); // Sử dụng mysql2 với promise

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: "123456",
  database: "test",
  multipleStatements: true,
});

// Kiểm tra kết nối với async/await
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Kết nối MySQL thành công!");
    connection.release(); // Giải phóng kết nối sau khi kiểm tra xong
  } catch (err) {
    console.error("Không thể kết nối đến MySQL: ", err);
  }
})();

module.exports = {
  pool,
};
