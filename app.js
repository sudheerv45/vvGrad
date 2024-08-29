const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(cors({
    origin: '*' // Allow only requests from this origin
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
