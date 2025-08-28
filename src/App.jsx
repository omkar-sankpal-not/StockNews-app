import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import News from "./Component/News";
import Bookmarks from "./Component/Bookmark";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [auth, setAuth] = useState(!!localStorage.getItem("token")); // logged in?

  return (
    <Router>
      <Navbar setSelectedCategory={setSelectedCategory} auth={auth} setAuth={setAuth} />
      <LoadingBar color="#f11946" progress={progress} />

      <div className="container my-4">
        <Routes>
          <Route
            path="/"
            element={<News setProgress={setProgress} selectedCategory={selectedCategory} />}
          />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
