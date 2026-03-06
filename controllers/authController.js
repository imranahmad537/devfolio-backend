const User = require('../models/userModel');
const { generateTokens } = require('../Utils/jwtProvider');
const jwt = require('jsonwebtoken');

// 1. Register User (Ideally, you'd disable this after creating your account)
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    let existingUser = null;
    if (email) existingUser = await User.findOne({ email });
    if (!existingUser && username) existingUser = await User.findOne({ username });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Ensure we provide username as it is required by the schema
    const newUsername = username || email.split('@')[0];
    const user = await User.create({ username: newUsername, email, password, role: 'admin' });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Set Refresh Token in Secure Cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ accessToken, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Login User
exports.login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // Support both username and email logins
    let query = {};
    if (email) query.email = email;
    else if (username) query.username = username;
    else return res.status(400).json({ message: "Username or email required" });

    // Find user and explicitly select password if we update userModel later to hide it
    const user = await User.findOne(query).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ accessToken, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Refresh Token
exports.refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret', (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid or expired token" });

      // Generate new tokens
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.id);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
