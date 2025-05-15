import { users } from "@prisma/client";
import { roles } from "../interfaces/userInterfaces";

export interface IUserRepository {
    login(email: string, password: string): Promise<string | null>;   
    addRoles(user_dni: string, roles: roles[]): Promise<boolean>;
    findAll(): Promise<users[]>;
    findById(dni: string): Promise<users | null>;
    create(user: users): Promise<users>
    update(dni: string, user: Partial<users>): Promise<users>;
    delete(dni: string): Promise<void>;
}