import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const userRoutes = Router();

// Rotte CRUD per gli utenti
userRoutes.get("/", getUsers); // GET /api/users
userRoutes.get("/:id", verifyToken, getUserById); // GET /api/users/:id
userRoutes.put("/:id", updateUser); // PUT /api/users/:id
userRoutes.delete("/:id", deleteUser); // DELETE /api/users/:id

export default userRoutes;
