import { BaseRepository } from "../../domain/base-repository";
import { Project } from "../../domain/entities/project";
import { HttpStatusCode } from "../../infrastructure/shared/http-status-code";

export class GetProject {
  private _repository: BaseRepository<Project>;

  constructor(repository: BaseRepository<Project>) {
    this._repository = repository;
  }

  async execute() {
    const result = await this._repository.getAll();

    if(!result) {
      return {
        ok: false,
        message: "Não foi possível criar o projeto",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR
      };
    }

    return {
      ok: true,
      message: "Projeto criado",
      status: HttpStatusCode.CREATED,
      data: {
        project: result
      }
    };
  }
}
