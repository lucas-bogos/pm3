import { BaseRepository } from "../../../domain/base-repository";
import { Project } from "../../../domain/entities/project";
import { User } from "../../../domain/entities/user";

export class ProjectRepositoryInMemory implements BaseRepository<Project> {
  public static project: Project;

  getOne(id: string | number): Promise<Project> {
    return new Promise((resolve) => ( resolve(ProjectRepositoryInMemory.project) ));
  }

  getAll(): Promise<Project[]> {
    return new Promise((resolve) => (resolve([ ProjectRepositoryInMemory.project ])));
  }

  persist(data: Project): Promise<Project> {
    ProjectRepositoryInMemory.project = data;

    return new Promise((resolve) => ( resolve(ProjectRepositoryInMemory.project) ));
  }

  getTeamWork(): Promise<User[]> {
    return new Promise((resolve) => ( resolve(ProjectRepositoryInMemory.project.showTeamWork) ));
  }
}
