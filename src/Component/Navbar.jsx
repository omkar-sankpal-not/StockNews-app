import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ setSelectedCategory, auth, setAuth }) {
  const categories = ["all", "dividend", "bonus", "merger", "fraud"];
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-title">Stock News</div>
      <div className="navbar-links">
        {categories.map((cat) => (
          <Link
            key={cat}
            to="/"
            className="nav-link-item"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        ))}
        <Link to="/bookmarks" className="nav-link-item">Bookmarks</Link>
        {!auth ? (
          <>
            <Link to="/login" className="nav-link-item">Login</Link>
            <Link to="/signup" className="nav-link-item">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-link-item btn-logout">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
