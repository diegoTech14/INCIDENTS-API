import { Router } from "express";
import { UserController } from "../controllers/UserControllers";

const usersRouter = Router();

usersRouter.get("/users", UserController.getAllUsers);
usersRouter.get("/users/:dni", UserController.getUserById);
usersRouter.post("/users", UserController.createUser);
usersRouter.put("/users/:dni", UserController.updateUser);
usersRouter.delete("/users/:dni", UserController.deleteUser);
usersRouter.post("/users/authentication", UserController.login);
usersRouter.post("/users/roles", UserController.addRoles);
usersRouter.post("/users/token", UserController.generateToken);

export default usersRouter;