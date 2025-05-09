import { PrismaClient, users } from "@prisma/client";
import { IUserRepository } from "./IUserRepository";
import { Hasher } from './utils/hasher';

const prisma = new PrismaClient();

export class UsersRepository implements IUserRepository{
      async findAll(): Promise<users[]> {
          return prisma.users.findMany();
      }
    
      async findById(dniParam: string): Promise<users | null> {
        return prisma.users.findUnique({ 
          where: { dni: dniParam} 
        });
      }
      
      async create(user: users): Promise<users> {
        const hasher = new Hasher();
        const hashedPassword = hasher.hashPassword(user.password);

        const userWithHashedPassword = {
          ...user,
          password: hashedPassword
        };

        return prisma.users.create({ data: userWithHashedPassword });
      }
    
      async update(dni: string, users: Partial<users>): Promise<users> {
        return prisma.users.update({ where: { dni }, data: users });
      }
    
      async delete(dni: string): Promise<void> {
        await prisma.users.delete({ where: { dni } });
      }
}