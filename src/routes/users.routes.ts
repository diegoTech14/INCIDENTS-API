import { Router } from "express";
import { UserController } from "../controllers/UserControllers";

const usersRouter = Router();

usersRouter.get("/users", UserController.getAllUsers);
usersRouter.get("/users/:id", UserController.getUserById);
usersRouter.post("/users", UserController.createUser);
usersRouter.put("/users/:id", UserController.updateUser);
usersRouter.delete("/users/:id", UserController.deleteUser);

export default usersRouter;