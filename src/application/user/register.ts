import { BaseRepository } from "../../domain/base-repository";
import { User } from "../../domain/entities/user";
import { Role } from "../../domain/value-objects";
import { HttpStatusCode } from "../../infrastructure/shared/http-status-code";
import { BcryptEncoder } from "../bcrypt-encoder";

export class Register {
  private _repository: BaseRepository<User>;

  constructor(repository: BaseRepository<User>) {
    this._repository = repository;
  }

  async execute(name: string, email: string, password: string, responsability: string, role: string) {
    const encoder = new BcryptEncoder();
    const passwordHash = await encoder.encode(password);

    const userData = User.create(name, email, passwordHash, responsability, Role[role]);

    const result = await this._repository.persist(userData);

    if(!result) {
      return {
        ok: false,
        message: "Não foi possível criar o usuário",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR
      };
    }

    return {
      ok: true,
      message: "Usuário criado",
      status: HttpStatusCode.CREATED,
      data: {
        user: {
          name: userData.name,
          email: userData.email.value,
          responsability: userData.responsability,
          password: passwordHash
        }
      }
    };
  }
}
