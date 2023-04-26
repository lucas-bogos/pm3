import { Request, Response } from "express";
import { CreateCard } from "../../application/card/create-card";
import { CardRepositoryMysql } from "../../infrastructure/repositories/mysql/card-repository-mysql";
import { GetCardById } from "../../application/card/get-card-by-id";
import { GetCardByStatus } from "../../application/card/get-card-by-status";

export class CardController {
  public static async create(request: Request, response: Response) {
    const { title, description, priority, status, responsible } = request.body;

    const repository = new CardRepositoryMysql();
    const card = new CreateCard(repository);

    const cardHandle = await card.execute(
      title, 
      description, 
      priority, 
      status, 
      responsible
    );

    return response.status(cardHandle.status).json({ ...cardHandle });
  }

  public static getByStatus(request: Request, response: Response) {
    /**
     * TODO obter card por status | id
     *
     * * /cards?orderBy=<INITIAL | GOING | DONE>
     */
    const { orderBy } = request.query;

    const repository = new CardRepositoryMysql();
    const getCard = new GetCardByStatus(repository);

    getCard.execute(orderBy as string);
  }

  public static update() {
    
  }
}
