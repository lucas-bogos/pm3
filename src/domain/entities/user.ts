import { Email, Role } from "../value-objects";

export class User {
  private readonly _name: string;
  private readonly _email: Email;
  private _password: string;
  private _responsability: string;
  private _role: Role;

  private constructor(name: string, email: Email, password: string, responsability: string, role?: Role) {
    this._name = name;
    this._email = email;
    this._password = password;
    this._responsability = responsability;
    this._role = role ?? Role.READ;

    Object.freeze(this);
  }

  public static create(name: string, email: string, password: string, responsability: string, role: Role) {
    const emailObject = Email.create(email);

    return new User(name, emailObject, password, responsability, role);
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get responsability() {
    return this._responsability;
  }

  get role() {
    return this._role;
  }
}
