import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout"; // Icon đăng xuất

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa thông tin admin khỏi localStorage
    localStorage.removeItem("isAdmin");

    // Chuyển hướng tới trang login
    navigate("/");
  };

  return (
    <div
      style={{ width: "250px", backgroundColor: "#f0f0f0", height: "100vh" }}
    >
      <List>
        <ListItem button component={Link} to="/admin">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button component={Link} to="/admin/users">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        {/* Thêm các mục khác nếu cần */}

        {/* Mục Đăng xuất */}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default Navbar;
