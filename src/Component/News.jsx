import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

export default function News({ selectedCategory, setProgress }) {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "pub_18c0d4dc106840779bc6e609ca081933";
  const query = "stock AND (dividend OR bonus OR merger OR acquisition OR split OR scam OR fraud)";
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&country=in&language=en`;

  useEffect(() => {
    fetchAllArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const classify = (article) => {
    const text = ((article.title || "") + " " + (article.description || "")).toLowerCase();
    if (text.includes("dividend")) return "dividend";
    if (text.includes("bonus") || text.includes("split")) return "bonus";
    if (text.includes("merger") || text.includes("acquisition")) return "merger";
    if (text.includes("fraud") || text.includes("scam")) return "fraud";
    return "general";
  };

  const fetchAllArticles = async () => {
    setProgress(10);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        setError("No news articles found.");
        setLoading(false);
        setProgress(100);
        return;
      }

      const filtered = data.results
        .filter(a => a.title && a.description)
        .map(article => ({
          ...article,
          category: classify(article),
        }));

      setAllArticles(filtered);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load news articles.");
    }

    setLoading(false);
    setProgress(100);
  };

  const filteredArticles = selectedCategory === "all"
    ? allArticles
    : allArticles.filter(a => a.category === selectedCategory);

  return (
    <div>
      <h2 className="text-center text-capitalize my-3">{selectedCategory} News</h2>

      {loading && <p className="text-center my-3">Loading news...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && (
        <div className="row">
          {filteredArticles.length === 0 ? (
            <p className="text-center">No articles found in this category.</p>
          ) : (
            filteredArticles.map((article, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  imageUrl={article.image_url || "https://via.placeholder.com/400x200?text=No+Image"}
                  newsUrl={article.link}
                  author={article.creator}
                  date={article.pubDate}
                  source={article.source_name}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
