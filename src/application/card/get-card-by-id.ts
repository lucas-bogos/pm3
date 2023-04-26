import { BaseRepository } from "../../domain/base-repository";
import { Card } from "../../domain/entities/card";
import { Id } from "../../domain/value-objects";
import { HttpStatusCode } from "../../infrastructure/shared/http-status-code";

export class GetCardById {
  private _repository: BaseRepository<Card>;

  constructor(repository: BaseRepository<Card>) {
    this._repository = repository;
  }

  async execute(id: Id) {
    const result = await this._repository.getOne(id);

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
        card: result
      }
    };
  }
}
