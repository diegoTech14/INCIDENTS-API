import { PrismaClient, users } from "@prisma/client";
import { IUserRepository } from "./IUserRepository";

const prisma = new PrismaClient();

export class UsersRepository implements IUserRepository{
    async findAll(): Promise<users[]> {
        return prisma.users.findMany();
      }
    
      async findById(dni: string): Promise<users | null> {
        return prisma.users.findUnique({ where: { dni } });
      }
    
      async create(user: users): Promise<users> {
        return prisma.users.create({ data: user });
      }
    
      async update(dni: string, users: Partial<users>): Promise<users> {
        return prisma.users.update({ where: { dni }, data: users });
      }
    
      async delete(dni: string): Promise<void> {
        await prisma.users.delete({ where: { dni } });
      }
}