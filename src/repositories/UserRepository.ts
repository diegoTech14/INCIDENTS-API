import { PrismaClient, users } from "@prisma/client";
import { IUserRepository } from "./IUserRepository";
import { userCredentials, roles, roleRoute } from "../interfaces/userInterfaces";

import { Hasher } from '../utils/hasher';
import { JwtController } from '../utils/jwtController';

const prisma = new PrismaClient();

export class UsersRepository implements IUserRepository {

  hasher: Hasher = new Hasher();
  jwt: JwtController = new JwtController();

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
  private async getAuthDataByEmail(email: string): Promise<userCredentials | null> {
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
  async login(email: string, password: string): Promise<boolean | false> {

    if (!email || !password) {
      return false;
    }

    //I can create an specific class to improve this repeated code
    try {
      const credentials = await this.getAuthDataByEmail(email);
      if (!credentials) {
        return false;
      }
      await this.hasher.compareHashes(password, credentials.password);

      return true
    } catch (error) {
      return false;
    }
  }

  async addRoles(user_dni: string, roles: roles[]): Promise<roles[] | null> {

    let rolesFlag = false;
    let addedRoles = [];
    const currentRoles = await this.getUserRolesByDNI(user_dni);

    try {
      for (const rol of roles) {
        if (!currentRoles?.find(currentRole => currentRole.role_id === rol.role_id)) {
          await prisma.users_x_rol.create({
            data:
              { role_id: rol.role_id, user_dni: user_dni }
          });

          addedRoles.push(rol);
        };
        rolesFlag = true;
      }

      if (rolesFlag) {
        return addedRoles
      } else {
        return []
      }

    } catch (error) {
      console.log(error)
      return null;
    }
  }

  async generateToken(user_dni: string): Promise<string | null> {

    try {
      const roles = await this.getUserRolesByDNI(user_dni);
      let token: string | null = "";

      if (roles) {
        token = await this.jwt.jwtEncoder({ user_dni, roles });
      }

      if (!token) {
        return null
      }

      await prisma.user_x_token.create({
        data: {
          user_dni: user_dni,
          token: token
        }
      });

      return token;
    } catch (error) {
      return null;
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
    const hashedPassword = await this.hasher.hashPassword(user.password);

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