import { BaseRepository } from "../../../domain/base-repository";
import { Card } from "../../../domain/entities/card";
import { ProjectRepositoryInMemory } from "./project-repository-in-memory";

export class CardRepositoryInMemory implements BaseRepository<Card> {
  async getOne(id: string | number): Promise<Card> {
    return new Promise((resolve, reject) => {
      resolve(ProjectRepositoryInMemory.project.listCards.find((card, index) => id == index) as Card);
    });
  }

  async getAll(): Promise<Card[]> {
    return new Promise((resolve, reject) => {
      resolve(ProjectRepositoryInMemory.project.listCards);
    });
  }

  async persist(data: Card): Promise<Card> {
    return new Promise((resolve, reject) => {
      
    });
  }
}
