import { BaseRepository } from "../../domain/base-repository";
import { Card } from "../../domain/entities/card";
import { HttpStatusCode } from "../../infrastructure/shared/http-status-code";

export class GetCardByStatus {
  private _repository: BaseRepository<Card>;

  constructor(repository: BaseRepository<Card>) {
    this._repository = repository;
  }

  async execute(status: string) {
    const result = await this._repository.getAll();

    const cards = result.filter(card => card?.status === status);

    if(!result) {
      return {
        ok: false,
        message: "Não foi possível obter o cartão",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR
      };
    }

    return {
      ok: true,
      message: "Cartão obtido",
      status: HttpStatusCode.OK,
      data: {
        cards
      }
    };
  }
}
