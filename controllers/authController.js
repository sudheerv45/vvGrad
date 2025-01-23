const jwt = require('jsonwebtoken');

// Static credentials
const STATIC_USER = {
  email: 'admin@example.com',
  password: 'admin123',
};

// Sign-in function
const signIn = (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if credentials match the static user
    if (email !== STATIC_USER.email || password !== STATIC_USER.password) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful.',
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signIn };
