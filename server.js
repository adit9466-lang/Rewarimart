const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// --- User Schema and Model ---
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('Hello! The backend server is running and connected to the database.');
});

// Registration Route
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Error: Email already in use.' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
