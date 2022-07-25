import { Router } from "express";
import FeedbackController from "../controllers/feedbackController.js";
import { logger } from "../middleware/logMiddleware.js";

const feedbackRouter = Router();
const feedbackController = new FeedbackController();

/**
 * @swagger
 * /feedback/{course_id}:
 *  post:
 *    summary: Добавить отзыв к курсу
 *    tags: [Feedback]
 *    parameters:
 *      - in: path
 *        name: course_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID курса.
 *        default: 47
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - author_id
 *              - description
 *              - mark
 *            properties:
 *              author_id:
 *                type: integer
 *                description: ID автора отзыва.
 *              description:
 *                type: string
 *                description: Текст отзыва.
 *              mark:
 *                type: integer
 *                enum:
 *                  - 1
 *                  - 2
 *                  - 3
 *                  - 4
 *                  - 5
 *                description: Оценка.
 *            example:
 *              author_id: 1
 *              description: Под пиво сойдёт.
 *              mark: 4
 *    responses:
 *      201:
 *        description: Отзыв к курсу успешно добавлен.
 *      500:
 *        description: Необработанная ошибка.
 */
feedbackRouter.post('/:course_id', feedbackController.createFeedBackbyUser, logger);    // новый отзыв

/**
 * @swagger
 * /feedback/{course_id}:
 *  get:
 *    summary: Получить массив отзывов к курсу
 *    tags: [Feedback]
 *    parameters:
 *      - in: path
 *        name: course_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID курса.
 *        default: 47
 *    responses:
 *      200:
 *        description: Возвращает отзывы курса (даже если их нет).
 *        content:
 *          application/json:
 *            schema: {$ref: '#/components/schemas/Feedback'}
 *      400:
 *        description: Некорректный ID курса.
 *      500:
 *        description: Необработанная ошибка.
 */
feedbackRouter.get('/:course_id', feedbackController.getFeedBacksofCourse, logger);     // посмотреть отзывы курса

export default feedbackRouter;
