import { Router } from "express";
import AdminController from "../controllers/adminController.js";
import { logger } from "../middleware/logMiddleware.js";

const adminRouter = Router();
const adminController = new AdminController();

/**
 * @swagger
 * /admin/{new_category}:
 *   post:
 *    summary: Добавить новую категорию
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: new_category
 *        schema:
 *          type: string
 *        required: true
 *        description: Название новой категории.
 *    responses:
 *      201:
 *        description: Категория успешно добавлена.
 *      400:
 *        description: Такая категория уже существует.
 *      500:
 *        description: Необработанная ошибка.
 */
adminRouter.post('/:new_category', adminController.addCategory, logger);         // добавить категорию

export default adminRouter;