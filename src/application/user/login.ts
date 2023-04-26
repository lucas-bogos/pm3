import { BaseRepository } from "../../domain/base-repository";
import { User } from "../../domain/entities/user";
import jwt from 'jsonwebtoken';
import { BcryptEncoder } from "../bcrypt-encoder";
import { HttpStatusCode } from "../../infrastructure/shared/http-status-code";

export class Login {
  private _repository: BaseRepository<User>;

  constructor(repository: BaseRepository<User>) {
    this._repository = repository;
  }

  async execute(email: string, password: string) {
    const users = await this._repository.getAll();
    const user = users.find((user) => user.email.value === email);

    const encoder = new BcryptEncoder();
    const isValidPassword = await encoder.compare(password, user?.password as string);

    if(!user) {
      return { 
        ok: false, 
        message: "Usuário inexistente",
        status: HttpStatusCode.NO_CONTENT
      };
    }

    if(!isValidPassword) {
      return { 
        ok: false, 
        message: "Email ou senha estão incorretos",
        status: HttpStatusCode.UNAUTHORIZED
      };
    }

    const secret = process.env.JWT_SECRET as jwt.Secret;

    const payloadJwt = { name: user.name, email: user.email.value };

    const options: jwt.SignOptions = { algorithm: "HS256", expiresIn: "4h" };

    const token = jwt.sign({ ...payloadJwt }, secret, { ...options });

    return { 
      ok: true, 
      message: "Autenticação foi realizada", 
      status: HttpStatusCode.OK,
      data: {
        user: {
          name: user.name,
          email: user.email.value,
          responsability: user.responsability
        }, 
        token
      }
    };
  }
}
