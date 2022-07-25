import { Router } from "express";
import { createUser, updateAccessToken, userAuthentication, addUserPermission } from "../controllers/authController.js";
import { jwtCheckRefreshToken } from "../middleware/jwtMiddleware.js";
import { logger } from "../middleware/logMiddleware.js";

const authRouter = Router();

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Зарегистрировать пользователя
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - first_name
 *              - second_name
 *              - third_name
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                description: Email пользователя.
 *              first_name:
 *                type: string
 *                description: Имя пользователя. 
 *              second_name:
 *                type: string
 *                description: Фамилия пользователя. 
 *              third_name:
 *                type: string
 *                description: Отчество пользователя. 
 *              password:
 *                type: string
 *                description: Пароль пользователя. 
 *            example:
 *              email: ivanov@mail.ru
 *              first_name: Иван
 *              second_name: Иванов
 *              third_name: Иванович
 *              password: 12345678
 *    responses:
 *      201:
 *        description: Пользователь успешно добавлен.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - access_token
 *                - refresh_token
 *              properties:
 *                access_token:
 *                  type: string
 *                  description: Access-токен. Используется для запросов, требующих идентификации пользователя и его прав.
 *                refresh_token:
 *                  type: string
 *                  description: Refresh-токен. Используется для запроса обновления токенов.
 *              example:
 *                access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjU4MzEwMzE5LCJleHAiOjE2NTgzMTEyMTl9.PfaWxcTkxS2Nb-PS4JxqlfEEEmth9jr8BtisVueo2Uo
 *                refresh_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjU4MzEwMzE5LCJleHAiOjE2NjA5MDIzMTl9.4I9DfB3kfSgP-slM-MEgSmqHYu6QyIRyc3Ebxn9Bhcc
 *      400:
 *        description: Неправильные параметры в теле запроса.
 *      409:
 *        description: Email уже занят.
 *      500:
 *        description: Необработанная ошибка.
 */
authRouter.post('/register', createUser, logger);                               // регистрация

/**
 * @swagger
 * /auth/login:
 *  get:
 *    summary: Вход в аккаунт пользователя
 *    tags: [Auth]
 *    parameters:
 *      - in: query
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: Email пользователя.
 *        default: ivanov@mail.ru
 *      - in: query
 *        name: password
 *        schema:
 *          type: string
 *        required: true
 *        description: Пароль пользователя.
 *        default: 12345678
 *    responses:
 *      200:
 *        description: Пользователь аутентифицирован.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - access_token
 *                - refresh_token
 *              properties:
 *                access_token:
 *                  type: string
 *                  description: Access-токен. Используется для запросов, требующих идентификации пользователя и его прав.
 *                refresh_token:
 *                  type: string
 *                  description: Refresh-токен. Используется для запроса обновления токенов.
 *              example:
 *                access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjU4MzEwMzE5LCJleHAiOjE2NTgzMTEyMTl9.PfaWxcTkxS2Nb-PS4JxqlfEEEmth9jr8BtisVueo2Uo
 *                refresh_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjU4MzEwMzE5LCJleHAiOjE2NjA5MDIzMTl9.4I9DfB3kfSgP-slM-MEgSmqHYu6QyIRyc3Ebxn9Bhcc
 *      401:
 *        description: Неверный пароль.
 *      404:
 *        description: Пользователь с таким email не найден.
 *      500:
 *        description: Необработанная ошибка.
 */
authRouter.get('/login', userAuthentication, logger);                           // аутентификация

/**
 * @swagger
 * /auth/refresh:
 *  put:
 *    summary: Обновить токены. Внимание! По техническим причинам в данной документации пока что нет способа передать Refresh token. Поэтому пока пишу здесь, что токен нужно передавать в header под названием Authorization.
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: Refresh токен валиден.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - access_token
 *              properties:
 *                access_token:
 *                  type: string
 *                  description: Access-токен. Используется для запросов, требующих идентификации пользователя и его прав.
 *              example:
 *                access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjU4MzEwMzE5LCJleHAiOjE2NTgzMTEyMTl9.PfaWxcTkxS2Nb-PS4JxqlfEEEmth9jr8BtisVueo2Uo
 *      401:
 *        description: Refresh токен недействителен.
 *      500:
 *        description: Необработанная ошибка.
 */

authRouter.put('/refresh', jwtCheckRefreshToken, updateAccessToken, logger);    // обновление Access Token

/**
 * @swagger
 * /auth/addPermission:
 *  post:
 *    summary: Выдать право пользователю на курс
 *    tags: [DEBUG]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - course_id
 *              - user_id
 *              - permission_id
 *            properties:
 *              course_id:
 *                type: integer
 *                description: ID нужного курса.
 *              user_id:
 *                type: integer
 *                description: ID пользователя.
 *              permission_id:
 *                type: integer
 *                description: ID нужного права. //TODO пните бэк, чтобы он написал запрос для получения списка прав.
 *            example:
 *              course_id: 1
 *              user_id: 1
 *              permission_id: 1
 *    responses:
 *      201:
 *        description: Право успешно выдано.
 *      400:
 *        description: Неправильные параметры в теле запроса.
 *      500:
 *        description: Необработанная ошибка.
 */
authRouter.post('/addPermission/', addUserPermission, logger);                  // добавление прав пользователю

export default authRouter;