import { BaseRepository } from "../../../domain/base-repository";
import { User } from "../../../domain/entities/user";

export class UserRepositoryInMemory implements BaseRepository<User> {
  public users: User[] = [];

  async getOne(id: string | number): Promise<User> {
    if(!id) {
      throw new Error("Argumento ID faltando");
    }

    const index = this.users.findIndex((_, index) => index === +id);

    if(index === -1) {
      throw new Error(`Usuário com ID ${id} não encontrado`);
    }

    return new Promise((resolve) => ( resolve(this.users[index]) ))
  }

  async getAll(): Promise<User[]> {
    return new Promise((resolve) => ( resolve(this.users) ));
  }

  async persist(data: User): Promise<User> {
    this.users = [ ...this.users, data ];

    return new Promise((resolve) => ( resolve(data) ));
  }
}
