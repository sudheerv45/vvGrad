const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
