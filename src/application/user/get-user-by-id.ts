import { BaseRepository } from "../../domain/base-repository";
import { User } from "../../domain/entities/user";
import { HttpStatusCode } from "../../infrastructure/shared/http-status-code";

export class GetUserById {
  private _repository: BaseRepository<User>;

  constructor(repository: BaseRepository<User>) {
    this._repository = repository;
  }

  async execute(id: string | number) {
    const user = await this._repository.getOne(id);

    if(!user) {
      return {
        ok: false,
        message: "Não foi possível trazer o usuário",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR
      };  
    }

    return { 
      ok: true, 
      message: "Usuário encontrado",
      status: HttpStatusCode.OK
    };
  }
}
