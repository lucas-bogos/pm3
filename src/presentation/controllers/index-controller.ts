import { Request, Response } from "express";
import { HttpStatusCode } from "../../infrastructure/shared/http-status-code";

export function indexController(request: Request, response: Response) {
  return response.status(200).json({
    ok: true,
    message: "Servidor disponível",
    status: HttpStatusCode.OK
  });
}
