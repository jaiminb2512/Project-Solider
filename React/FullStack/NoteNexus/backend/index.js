const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const noteRoute = require("./routes/notes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/NoteNexus", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Enable CORS
app.use(cors());

app.use(express.json());

// Use routes
app.use("/api/users", userRoute);
app.use("/api/notes", noteRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
