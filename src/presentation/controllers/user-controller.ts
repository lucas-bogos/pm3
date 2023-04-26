import { Request, Response } from "express";
import { Login } from "../../application/user/login";
import { Register } from "../../application/user/register";
import { Role } from "../../domain/value-objects";
import { ListUsers } from "../../application/user/list-users";
import { GetUserById } from "../../application/user/get-user-by-id";
import { UserRepositoryMysql } from "../../infrastructure/repositories/mysql/user-repository-mysql";

export class UserController {
  public static async login(request: Request, response: Response) {
    const { email, password,  } = request.body;

    const repository = new UserRepositoryMysql();
    const login = new Login(repository);

    const handleLogin = await login.execute(email, password);

    return response.status(handleLogin.status).json({ ...handleLogin });
  }

  public static async register(request: Request, response: Response) {
    const { name, email, password, responsability } = request.body;

    const repository = new UserRepositoryMysql();
    const register = new Register(repository);

    const handleRegister = await register.execute(name, email, password, responsability, Role.READ);

    return response.status(handleRegister.status).json({ ...handleRegister });
  }

  public static async invitationToWork(request: Request, response: Response) {
    /**
     * TODO: chamar use case de convidar para trabalho
     */
  }

  public static async get(request: Request, response: Response) {
    const { id } = request.params;

    const repository = new UserRepositoryMysql();
    const getUser = new GetUserById(repository);

    const handleGetUser = await getUser.execute(id);

    return response.status(handleGetUser.status).json({ ...handleGetUser });
  }

  public static async getAll(request: Request, response: Response) {
    const repository = new UserRepositoryMysql();
    const listUsers = new ListUsers(repository);

    const handleListUsers = await listUsers.execute();

    return response.status(handleListUsers.status).json({ ...handleListUsers });
  }
}
