const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/users');
const cors = require('cors'); // Import CORS

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Use CORS
app.use(express.json()); // For parsing application/json

// Database connection
// mongoose.connect(process.env.MONGO_URL, {
mongoose.connect("mongodb://localhost:27017/RegistrationPage", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

// Routes
app.use('/api/users', userRoute);

app.listen(5000, () => {
  console.log('Backend server is running on http://localhost:5000');
});
