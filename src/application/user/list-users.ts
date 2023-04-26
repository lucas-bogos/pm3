import { BaseRepository } from "../../domain/base-repository";
import { User } from "../../domain/entities/user";
import { HttpStatusCode } from "../../infrastructure/shared/http-status-code";

export class ListUsers {
  private _repository: BaseRepository<User>;

  constructor(repository: BaseRepository<User>) {
    this._repository = repository;
  }

  async execute() {
    const users = await this._repository.getAll();
    const noUsers = users.length === 0;

    if(!users) {
      return {
        ok: false,
        message: "Não foi possível trazer os usuários",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR
      };
    }

    if(noUsers) {
      return {
        ok: true,
        message: "Ainda não há usuários",
        status: HttpStatusCode.OK,
        data: {
          users
        }
      };
    }

    return {
      ok: true,
      message: "Usuários foram encontrados",
      status: HttpStatusCode.OK,
      data: {
        users
      }
    };
  }
}
