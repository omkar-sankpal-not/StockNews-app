const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/bookmarks", require("./routes/bookmarks"));

mongoose.connect("mongodb+srv://OMKAR:NOTABLE%40123@cluster0.deo1iw6.mongodb.net/Stockapp?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api/bookmarks", require("./routes/bookmarks"));

app.listen(5000, () => console.log("Server running on port 5000"));
