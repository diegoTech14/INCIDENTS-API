import { users } from "@prisma/client";

export interface IUserRepository {
    findAll(): Promise<users[]>;
    findById(dni: string): Promise<users | null>;
    create(user: users): Promise<users>
    update(dni: string, user: Partial<users>): Promise<users>;
    delete(dni: string): Promise<void>;
}