import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import RouterAdmin from "./admin-view/router-admin";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login"; // Import trang Login
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route cho layout chính */}

          {/* Route cho layout admin với bảo vệ quyền truy cập */}
          <Route
            path="/admin/*"
            element={<PrivateRoute element={<AdminLayout />} />}
          />
          {/* Route cho trang login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Redirect từ đường dẫn không hợp lệ */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

const AdminLayout = () => (
  <>
    <Routes>
      {/* Các route cho phần admin */}
      <Route path="/*" element={<RouterAdmin />} />
    </Routes>
  </>
);

export default App;
