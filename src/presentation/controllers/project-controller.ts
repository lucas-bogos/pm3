import { Request, Response } from "express";
import { GetProject } from "../../application/project/get-project";
import { UserRepositoryMysql } from "../../infrastructure/repositories/mysql/user-repository-mysql";
import { CreateProject } from "../../application/project/create-project";
import { Card } from "../../domain/entities/card";
import { User } from "../../domain/entities/user";

export class ProjectController {
  public static async create(request: Request, response: Response) {
    const { name, cards, teamWork } = request.body;

    const repository = new UserRepositoryMysql();
    const project = new CreateProject(repository);

    const handleProject = await project.execute(name, cards as Card[], teamWork as User[]);

    return response.status(handleProject.status).json({ ...handleProject });
  }

  public static async get(request: Request, response: Response) {
    const repository = new UserRepositoryMysql();
    const project = new GetProject(repository);

    const handleProject = await project.execute();

    return response.status(handleProject.status).json({ ...handleProject });
  }
}
