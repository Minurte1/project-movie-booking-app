import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const CommentManager = () => {
  const [data_Comment, setData_Comment] = useState([]);

  useEffect(() => {
    fetchDataComment();
  }, []);

  // Fetch data từ API
  const fetchDataComment = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/comments");
      console.log(response.data); // Kiểm tra dữ liệu trả về
      setData_Comment(response.data); // Đặt dữ liệu vào state
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <>
      <h3>User Comments</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Người Dùng</TableCell>
              <TableCell>Nội Dung Bình Luận</TableCell>
              <TableCell>Số Sao</TableCell>
              <TableCell>Ngày Tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data_Comment.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.id_nguoi_dung}</TableCell>
                <TableCell>{comment.noi_dung}</TableCell>
                <TableCell>{comment.danh_gia}</TableCell>
                <TableCell>
                  {new Date(comment.ngay_tao).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CommentManager;
