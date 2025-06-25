// ✅ server.js (Corrected Backend Code with OTP Functionality)
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const User = require('./models/User');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

// Configure transporter (use your email provider)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Temporary user store for OTP registration
let tempUsers = {}; // email → { name, email, phone, password, otp }

// Register temp user and send OTP (via Email)
app.post('/api/register-temp', async (req, res) => {
  const { name, email, phone, password } = req.body;
  const exists = await User.findOne({ $or: [{ email }, { mobile: phone }] });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedPassword = await bcrypt.hash(password, 10);

  tempUsers[email] = { name, email, phone, password: hashedPassword, otp };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Verification',
    text: `Hello ${name},\n\nYour OTP is ${otp}. It is valid for 5 minutes.\n\nThank you!`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Email send error:', err);
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }
    res.status(200).json({ message: 'OTP sent to your email', email });
  });
});

// Verify OTP and create user
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const record = tempUsers[email];

  if (!record || record.otp !== otp) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const newUser = new User({
    name: record.name,
    email: record.email,
    mobile: record.phone,
    password: record.password
  });

  await newUser.save();
  delete tempUsers[email];

  res.status(201).json({ message: 'Account verified and created' });
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, name: user.name });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: 'Login error' });
  }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
