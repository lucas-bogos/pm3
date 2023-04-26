import { Card } from "./card";
import { User } from "./user";

export class Project {
  private readonly _name: string;
  private _cards: Card[];
  private readonly _teamWork: User[];

  private constructor(name: string, cards: Card[], teamWork: User[]) {
    this._name = name;
    this._cards = cards;
    this._teamWork = teamWork;

    Object.freeze(this);
  }

  public static create(name: string, cards: Card[], teamWork: User[]): Project {
    if(!name) {
      throw new Error("O nome é obrigatório para criar um projeto");
    }

    if(Project.hasEmptyCards(cards)) {
      throw new Error("Projeto não pode ser criado sem cartões");
    }

    if(Project.hasSomeCollaborator(teamWork) && teamWork?.length < 3) {
      throw new Error("Deve ter pelo menos 3 pessoas no time");
    }

    return new Project(name, cards, teamWork);
  }

  public get name() {
    return this._name;
  }

  public get listCards() {
    return this._cards;
  }

  public get showTeamWork() {
    return this._teamWork;
  }

  private static hasSomeCollaborator(value: User[]): boolean {
    return (value?.length ?? 0) > 0;
  }

  private static hasEmptyCards(value: Card[]): boolean {
    return !value || value.length === 0;
  }
}
