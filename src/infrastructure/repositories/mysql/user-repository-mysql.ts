import { BaseRepository } from "../../../domain/base-repository";
import { User } from "../../../domain/entities/user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepositoryMysql implements BaseRepository<User> {
  async getOne(id: string | number): Promise<any> {
    return await prisma.user.findFirst({
      where: {
        id: +id
      }
    });
  }

  async getAll(): Promise<any[]> {
    return await prisma.user.findMany();
  }

  async persist(data: any): Promise<any> {
    return await prisma.user.create(data);
  }
}
