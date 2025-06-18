import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

// Google OAuth routes
router.get("/google", 
    passport.authenticate("google", { 
        scope: ["profile", "email"] 
    })
);

router.get("/google/callback",
    passport.authenticate("google", { 
        failureRedirect: "/login" 
    }),
    (req, res) => {
        // Successful authentication
        res.redirect(process.env.CLIENT_URL || "http://localhost:3000/dashboard");
    }
);

// Logout route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            
            // Clear the session cookie
            res.clearCookie('connect.sid');
            
            // Check if this is an API request or browser request
            if (req.headers.accept && req.headers.accept.includes('application/json')) {
                res.json({ message: "Logged out successfully" });
            } else {
                res.redirect(process.env.CLIENT_URL || "http://localhost:3000");
            }
        });
    });
});

// Alternative logout route for API calls
router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }
        
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: "Session destruction failed" });
            }
            
            // Clear the session cookie
            res.clearCookie('connect.sid');
            res.json({ message: "Logged out successfully" });
        });
    });
});

// Get current user
router.get("/user", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
});

export default router;