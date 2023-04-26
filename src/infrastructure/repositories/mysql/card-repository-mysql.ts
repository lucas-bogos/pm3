import { BaseRepository } from "../../../domain/base-repository";
import { PrismaClient } from "@prisma/client";
import { Card } from "../../../domain/entities/card";

const prisma = new PrismaClient();

export class CardRepositoryMysql implements BaseRepository<Card> {
  async getOne(id: number): Promise<any> {
    return await prisma.card.findFirst({
      where: {
        id: +id
      }
    });
  }

  async getAll(): Promise<any[]> {
    return await prisma.card.findMany();
  }

  async persist(data: any): Promise<any> {
    return await prisma.card.create(data);
  }

  async update(id: number, data: any): Promise<any> {
    return await prisma.card.update({ data, where: { id } })
  }
}
