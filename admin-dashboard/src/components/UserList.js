import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { getUsers } from "../services/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      console.log(response.data); // Kiểm tra dữ liệu trong console
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Status</TableCell>
            {/* <TableCell>Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.user_id}>
              {" "}
              {/* Thay đổi key thành user.user_id */}
              <TableCell>
                {user.user_id === "1333333a-d85e-4f7c-91b3-2beeb7db4172"
                  ? "Admin"
                  : `${user.user_id}`}
              </TableCell>{" "}
              {/* Hiển thị user_id */}
              <TableCell>{user.username}</TableCell> {/* Hiển thị username */}
              <TableCell>{user.email}</TableCell> {/* Hiển thị email */}
              <TableCell>{user.phone_no}</TableCell> {/* Hiển thị phone_no */}
              <TableCell>
                {user.status === 1 ? "Active" : "Inactive"}
              </TableCell>{" "}
              {/* Hiển thị trạng thái */}
              {/* <TableCell>
                <Button variant="contained" color="primary">
                  View
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 10 }}
                >
                  Delete
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
