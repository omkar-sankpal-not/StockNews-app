import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Bookmark.css";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login to see your bookmarks.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/bookmarks", {
          headers: { "x-auth-token": token },
        });

        setBookmarks(res.data);
      } catch (err) {
        console.error(
          "Error fetching bookmarks:",
          err.response?.data || err.message
        );
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="bookmarks-container">
      <h2 className="bookmarks-title">My Bookmarked News</h2>

      {bookmarks.length === 0 ? (
        <p className="empty-text">No bookmarks yet.</p>
      ) : (
        <div className="bookmarks-grid">
          {bookmarks.map((bm) => (
            <div key={bm._id} className="bookmark-card">
              <span className="badge bg-danger">{bm.source}</span>

              <img
                src={bm.image || "https://via.placeholder.com/400x200?text=No+Image"}
                alt={bm.title}
              />

              <div className="card-body">
                <h3 className="card-title">{bm.title}</h3>
                <p className="card-text">{bm.description}</p>
                <div className="d-flex justify-content-between">
                  <a
                    href={bm.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-dark"
                  >
                    Read More
                  </a>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={async () => {
                      const token = localStorage.getItem("token");
                      await axios.delete(
                        `http://localhost:5000/api/bookmarks/${bm._id}`,
                        {
                          headers: { "x-auth-token": token },
                        }
                      );
                      setBookmarks(bookmarks.filter((b) => b._id !== bm._id));
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
