const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer'); 
const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const Email = require('./models/Email');
const User = require('./models/User');

// Load environment variables first
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['GOOGLE_CLIENT_ID', 'JWT_SECRET', 'MONGO_URI'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars);
    process.exit(1);
}

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); 
app.use(express.json());

// Use authentication routes
app.use('/auth', authRoutes);

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create Nodemailer Transporter with app email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Middleware to verify JWT token
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
};

// Email Sending API with HTML and Attachments
app.post('/send-email', authenticateUser, upload.single('attachment'), async (req, res) => {
    try {
        const { to, subject, message } = req.body;
        const file = req.file;

        // Get user from database
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Prepare email options
        const mailOptions = {
            from: {
                name: user.name || 'Email Sender App',
                address: process.env.EMAIL_USER
            },
            to: to,
            subject: subject,
            text: message,
            html: `<div style="font-family: Arial, sans-serif;">
                    <p>${message}</p>
                   </div>`
        };

        // Add attachment if present
        if (file) {
            mailOptions.attachments = [{
                filename: file.originalname,
                content: file.buffer
            }];
        }

        // Send email
        await transporter.sendMail(mailOptions);

        // Store email in MongoDB
        await Email.create({
            userId: user._id,
            from: process.env.EMAIL_USER,
            to,
            subject,
            message,
            timestamp: new Date()
        });

        res.json({ 
            success: true, 
            message: 'Email sent successfully'
        });
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email',
            error: error.message 
        });
    }
});

// Health check endpoint
app.get('/send-email', (req, res) => {
    res.status(200).json({ message: "Server is running." });
});

// Fetch sent email history
app.get('/email-history', authenticateUser, async (req, res) => {
    const emails = await Email.find({ userId: req.user.userId });
    res.json(emails);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
