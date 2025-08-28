import React from "react";
import axios from "axios";
import "./NewsItem.css";

export default function NewsItem({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  date,
  source,
}) {
  const handleBookmark = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ get token

      if (!token) {
        alert("Please login to bookmark news.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/bookmarks/add",
        {
          title,
          description,
          url: newsUrl,
          image: imageUrl,
          source,
          publishedAt: date,
          author: author || "Unknown",
        },
        {
          headers: {
            "x-auth-token": token, // ✅ send token in headers
          },
        }
      );

      alert("News bookmarked!");
    } catch (err) {
      console.error("Error bookmarking news:", err.response?.data || err.message);
      alert("Failed to bookmark news");
    }
  };

  return (
    <div className="my-3">
      <div className="card">
        <span className="badge rounded-pill bg-danger">{source}</span>

        <img
          src={imageUrl || "https://via.placeholder.com/400x200?text=No+Image"}
          alt="News"
          className="img-fluid"
        />

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author || "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <div className="d-flex justify-content-between">
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={handleBookmark}
            >
              🔖 Bookmark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
