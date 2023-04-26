import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token) {
    return response.status(401).json({
      ok: true,
      message: "Sua sessão está expirada",
      validToken: false
    });
  }

  try {
    const secret = process.env.JWT_SECRET;

    const isTokenValid = jwt.verify(token, secret as string);

    if(!isTokenValid) {
      return response.status(401).json({
        ok: true,
        message: "Token de autenticação é inválido",
        validToken: false
      });
    }

    next();
    
  } catch (err) {
    return response.status(400).json({
      ok: false,
      message: 'Não foi possível fazer a autenticação'
    });
  }
}
