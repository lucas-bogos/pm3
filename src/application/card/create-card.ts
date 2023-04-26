import { BaseRepository } from "../../domain/base-repository";
import { Card } from "../../domain/entities/card";
import { User } from "../../domain/entities/user";
import { Priority, Status } from "../../domain/value-objects";
import { HttpStatusCode } from "../../infrastructure/shared/http-status-code";

export class CreateCard {
  private _repository: BaseRepository<Card>;

  constructor(repository: BaseRepository<Card>) {
    this._repository = repository;
  }

  async execute(title: string, description: string, priority: string, status: string, responsible: User) {
    const card = Card.create(title, description, Priority[priority], Status[priority], responsible);

    const result = await this._repository.persist(card);

    if(!result) {
      return {
        ok: false,
        message: "Não foi possível criar o cartão",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR
      };
    }

    return {
      ok: true,
      message: "Cartão criado",
      status: HttpStatusCode.CREATED,
      data: {
        card: {
          title,
          description,
          priority,
          status,
          responsible: {
            name: responsible.name,
            email: responsible.email,
            responsability: responsible.responsability,
            role: responsible.role
          }
        }
      }
    };
  }
}
