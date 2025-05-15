import { PrismaClient, users } from "@prisma/client";
import { IUserRepository } from "./IUserRepository";
import { userCredentials, roles } from "../interfaces/userInterfaces";
import jwt from "jsonwebtoken";

import { Hasher } from './utils/hasher';

const prisma = new PrismaClient();

export class UsersRepository implements IUserRepository {

  hasher = new Hasher();
  userRoles!: roles[];

  //This method returns all roles related to an specific user
  private async getUserRolesByDNI(dni: string): Promise<roles[] | null> {
    const roles = prisma.users_x_rol.findMany({
      where: { user_dni: dni },
      select: {
        role_id: true
      }
    });
    return roles;
  }

  //This method validates user credentials from the database by email
  private async getCredentialsByEmail(email: string): Promise<userCredentials | null> {
    return prisma.users.findUnique({
      where: { email: email },
      select: {
        dni: true,
        email: true,
        password: true
      }
    });
  }

  //This method validates the user authentication
  async login(email: string, password: string): Promise<string | null> {

    if (!email || !password) {
      return null;
    }
    const secret = process.env.SECRET_KEY;
    if (!secret) {
      throw new Error("SECRET_KEY is not configured");
    }

    try {
      const credentials = await this.getCredentialsByEmail(email);
      if (!credentials) {
        return null;
      }
      await this.hasher.compareHashes(password, credentials.password);
      const roles = await this.getUserRolesByDNI(credentials.dni);
      return jwt.sign(
        {
          dni: credentials.dni,
          roles: roles
        },
        secret, { expiresIn: "1h" }
      );
    } catch (error) {
      return null;
    }
  }
  
  async addRoles(user_dni:string, roles:roles[]): Promise<boolean> {
    
    try{
      for(const rol of roles) {
        let userRol = await prisma.users_x_rol.create({
          data:
            {role_id: rol.role_id, user_dni:user_dni}
        });
      }
      return true;
    
    }catch(error) {
      return false;
    }
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