import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import dotenv from "dotenv";
import { connectDatabase } from "./database/database.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "./config/passport.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Correctly invoke middleware functions
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // Allow cookies to be sent
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    name: 'connect.sid', // Default session name
    cookie: {
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        httpOnly: true, // Prevent XSS attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: 'lax' // CSRF protection
    },
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", userRoutes)
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Server is running",
    });
});

// Initialize database connection and start server
const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();