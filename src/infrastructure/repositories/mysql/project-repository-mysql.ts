import { BaseRepository } from "../../../domain/base-repository";
import { PrismaClient } from "@prisma/client";
import { Project } from "../../../domain/entities/project";

const prisma = new PrismaClient();

export class ProjectRepositoryMysql implements BaseRepository<Project> {
  async getOne(id: string | number): Promise<any> {
    return await prisma.project.findFirst({
      where: {
        id: +id
      }
    });
  }

  async getAll(): Promise<any[]> {
    return await prisma.project.findMany();
  }

  async persist(data: any): Promise<any> {
    return await prisma.project.create(data);
  }
}
