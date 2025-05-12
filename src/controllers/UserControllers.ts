import { Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { UsersRepository } from "../repositories/UserRepository";


const userRepository = new UsersRepository();
const userService = new UserService(userRepository);

export const UserController = {
  async getAllUsers(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.json(users);
  },

  async getUserById(req: Request, res: Response) {
    const user = await userService.getUserById(req.params.dni);
    (user) ? res.json(user) : res.status(404).json({ message: "User not found" })
  },

  async createUser(req: Request, res: Response) {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  },

  async updateUser(req: Request, res: Response) {
    const updatedUser = await userService.updateUser(req.params.dni, req.body);
    res.json(updatedUser);
  },

  async deleteUser(req: Request, res: Response) {
    await userService.deleteUser(req.params.dni);
    res.status(204).send();
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const login = await userService.login(email, password);
    (login) ? res.status(202).json({ login: true }) : res.status(404).json({ login: false });
  }
};