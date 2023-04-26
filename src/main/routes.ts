import { Request, Response, Router } from "express";
import { indexController } from "../presentation/controllers/index-controller";
import { UserController } from "../presentation/controllers/user-controller";

const router = Router();

router.get("/", indexController);

/**
 * User routes
 */
router.get("/users", UserController.getAll);

router.post("/login", UserController.login);

router.post("/register", UserController.register);

/**
 * POST /projects
 * 
 * {
 *   name,
 *   cards: []
 *   teamWork: [] 
 * }
 */
router.post("/projects", (request: Request, response: Response) => {
  return response.status(200).json({
    message: "Olá, essa é o endpoint /projects"
  });
});

export default router;
