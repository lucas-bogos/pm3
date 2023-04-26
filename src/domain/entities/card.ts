import { Priority, Role, Status } from "../value-objects";
import { User } from "./user";

export class Card {
  private _title: string;
  private _description: string;
  private _priority: Priority;
  private _status: Status;
  private _responsible?: User;

  private constructor(
    title: string, 
    description: string, 
    priority?: Priority, 
    status?: Status, 
    responsible?: User
  ) {
    this._title = title;
    this._description = description;
    this._priority = priority ?? Priority.LOW;
    this._status = status ?? Status.INITIAL;
    this._responsible = responsible;
  }

  public static create(
    title: string, 
    description: string, 
    priority?: Priority, 
    status?: Status, 
    responsible?: User
  ) {
    return new Card(title, description, priority, status, responsible);
  }

  public assignResponsible(who: User, to: User): Card {
    if(!this.hasPermissionWrite(who)) {
      throw new Error("Sem permissão para atribuir responsável pelo cartão");
    }

    this._responsible = to;
    
    return this;
  }

  public changePriority(who: User, newPriority: Priority): Card {
    if(!this.hasPermissionWrite(who)) {
      throw new Error("Sem permissão para mudar prioridade do cartão");
    }

    this._priority = newPriority;

    return this;
  }

  public changeStatus(newStatus: Status): Card {
    this._status = newStatus;

    return this;
  }

  private hasPermissionWrite(who: User): boolean {
    if(who.role === Role.READ) {
      return false;
    }

    return true;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get priority() {
    return this._priority;
  }

  get status() {
    return this._status;
  }

  get responsible() {
    return this._responsible;
  }
}
