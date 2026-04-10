// Module Imports 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// App 
const app = express();

// Middleware 
app.use(express.json());
app.use(cors());

// MongoDB Connection 
mongoose.connect('mongodb+srv://Admin69:root69@cluster0.0u2vw.mongodb.net/flowerBookings?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema & Model 
const bookingSchema = new mongoose.Schema({
  name: String,
  flower: String,
  quantity: Number,
  address: String,
  date: String
});
const Booking = mongoose.model('Booking', bookingSchema);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Booking 
app.post('/api/book', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: 'Booking successful!' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
});

app.use(express.static(path.join(__dirname)));

// Serve snake.html 

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'snake.html'));
});

// Server Start 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
