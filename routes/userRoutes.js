import express from "express";
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/users", createUser);

// Protected routes (require authentication)
router.get("/users", requireAuth, getAllUsers);
router.get("/users/:id", requireAuth, getUserById);
router.put("/users/:id", requireAuth, updateUser);
router.delete("/users/:id", requireAuth, deleteUser);

export default router;