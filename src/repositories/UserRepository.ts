import { PrismaClient, users } from "@prisma/client";
import { IUserRepository } from "./IUserRepository";
import { userCredentials } from "../interfaces/userInterfaces";
import { Hasher } from './utils/hasher';

const prisma = new PrismaClient();

export class UsersRepository implements IUserRepository {

  hasher = new Hasher();

  //This method validates user credentials from the database by email
  private async getCredentialsByEmail(email: string): Promise<userCredentials | null> {
    return prisma.users.findUnique({
      where: { email: email },
      select: {
        email:true,
        password: true,
      }
    });
  }

  //This method validates the user authentication
  async login(email: string, password: string): Promise<boolean | false> {

    let response!:boolean;
    
    if (!email || !password) {
      response = false;
    }else{
      const credentials = await this.getCredentialsByEmail(email);
      if(credentials){
        response = await this.hasher.compareHashes(password, credentials.password);
      }
    }
    return response;
  }

  async findAll(): Promise<users[]> {
    return prisma.users.findMany();
  }

  async findById(dniParam: string): Promise<users | null> {
    return prisma.users.findUnique({
      where: { dni: dniParam }
    });
  }

  async create(user: users): Promise<users> {
    const hashedPassword = this.hasher.hashPassword(user.password);

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