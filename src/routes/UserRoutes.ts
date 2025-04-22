import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddlewares";

const middleware = new AuthMiddleware()


const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users/', middleware.authenticateToken, UserController.getAll);

export default router;