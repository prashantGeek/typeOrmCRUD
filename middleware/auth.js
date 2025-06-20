// Middleware to check if user is authenticated
export const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Authentication required" });
};

// Middleware to check if user is not authenticated (for login/register routes)
export const requireGuest = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.status(400).json({ message: "Already authenticated" });
};