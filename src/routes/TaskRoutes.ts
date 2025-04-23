import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { AuthMiddleware } from "../middlewares/AuthMiddlewares";

const middleware = new AuthMiddleware()


const router = Router();

router.post('/user', TaskController.create.bind);
router.get('/tasks', TaskController.findAll.bind);
router.get('/tasks/:id', TaskController.findMine.bind);
router.put('/tasks/:id',TaskController.update.bind);
router.delete('/tasks/:id', TaskController.delete.bind);

export default router;