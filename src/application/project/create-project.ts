import { BaseRepository } from "../../domain/base-repository";
import { Card } from "../../domain/entities/card";
import { Project } from "../../domain/entities/project";
import { User } from "../../domain/entities/user";
import { HttpStatusCode } from "../../infrastructure/shared/http-status-code";

export class CreateProject {
  private _repository: BaseRepository<Project>;

  constructor(repository: BaseRepository<Project>) {
    this._repository = repository;
  }

  async execute(name: string, cards: Card[], teamWork: User[]) {
    const project = Project.create(name, cards, teamWork);

    const result = await this._repository.persist(project);

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
        project: {
          name: project.name,
          cards: project.listCards,
          teamWork: project.showTeamWork
        }
      }
    };
  }
}
