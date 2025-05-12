import { IUserRepository } from "../repositories/IUserRepository";
import { users } from "@prisma/client";

export class UserService {

    constructor(private userRepository: IUserRepository) { }

    async getAllUsers(): Promise<users[]> {
        return this.userRepository.findAll();
    }

    async getUserById(dni: string): Promise<users | null> {
        return this.userRepository.findById(dni);
    }

    async createUser(user: users): Promise<users> {
        return this.userRepository.create(user);
    }

    async updateUser(dni: string, user: Partial<users>): Promise<users> {
        return this.userRepository.update(dni, user);
    }

    async deleteUser(dni: string): Promise<void> {
        return this.userRepository.delete(dni);
    }

    async login(email: string, password: string): Promise<boolean> { 
        return this.userRepository.login(email, password);
    }
}