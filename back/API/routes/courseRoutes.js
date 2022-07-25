import { Router } from "express";
import CourseController from "../controllers/courseController.js";
import { jwtCheckAccessToken } from "../middleware/jwtMiddleware.js";
import { logger } from "../middleware/logMiddleware.js";

const coursesRouter = Router();
const courseController = new CourseController();

/**
 * @swagger
 * components:
 *   schemas:
 *     CourseEdit:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - trailer_url
 *         - user_level
 *         - main_topics
 *         - image_url
 *         - sections
 *       properties:
 *         id:
 *           type: integer
 *           description: ID курса.
 *         title:
 *           type: string
 *           description: Название курса.
 *         description:
 *           type: string
 *           description: Полное описание курса.
 *         trailer_url:
 *           type: string
 *           description: Ссылка на трейлер курса.
 *         user_level:
 *           type: string
 *           enum:
 *             - "1"
 *             - "2"
 *             - "3"
 *           description: Сложность курса.
 *         main_topics:
 *           type: string[]
 *           description: Основные моменты, которые будут изучены в курсе.
 *         image_url:
 *           type: string
 *           description: Ссылка на изображение курса.
 *         sections:
 *           type: object[]
 *           description: Массив секций.
 *           required:
 *             - local_id
 *             - title
 *             - description
 *             - modules
 *           properties:
 *             local_id:
 *               type: integer
 *               description: ID секции в данном курсе.
 *             title:
 *               type: string
 *               description: Название секции.
 *             description:
 *               type: string
 *               description: Описание секции.
 *             modules:
 *               type: object[]
 *               description: Массив модулей.
 *               required:
 *                 - local_id
 *                 - type_id
 *                 - title
 *                 - content
 *               properties:
 *                 local_id:
 *                   type: integer
 *                   description: ID модуля в данной секции.
 *                 type_id:
 *                   type: integer
 *                   description: ID типа модуля.
 *                 title:
 *                   type: string
 *                   description: Название модуля.
 *                 content:
 *                   type: string
 *                   description: Контент модуля.
 *       example:
 *         id: 24
 *         title: Уроки пивоварения.
 *         description: Инновационный курс пивоварения, разработанный специально для студентов НГТУ!
 *         author_id: 2
 *         trailer_url: https://www.youtube.com/watch?v=R81F4iWCq88
 *         user_level: "1"
 *         preview_description: Хочешь варить пиво? Тогда тебе к нам!
 *         main_topics: ["Пиво безалкогольное", "Квас безалкогольный"]
 *         image_url: https://img3.eadaily.com/r650x650/o/a53/97bc8920b846b239b11614d2992d1.jpeg
 *         sections: [{
 *           local_id: 0,
 *           title: "Секция 1. Варка сусла.",
 *           description: "Данный блок посвящён варке сусла.",
 *           modules: [{
 *             local_id: 0,
 *             type_id: 1,
 *             title: "Как подготовить сусло?",
 *             content: "<h1>Я не знаю</h1>"
 *           },
 *           {
 *             local_id: 1,
 *             type_id: 1,
 *             title: "Как хранить сусло?",
 *             content: "<h1>Я не знаю</h1>"
 *           }]
 *         }]
 *     Section:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - modules
 *       properties:
 *         title:
 *           type: string
 *           description: Название секции.
 *         description:
 *           type: string
 *           description: Описание секции.
 *         modules:
 *           type: Module[]
 *           description: Массив модулей.
 *       example:
 *         title: Секция 1. Варка сусла.
 *         description: Данный блок посвящён варке сусла.
 *         modules: [{title: "Как подготовить сусло?", type_id: 1, content: "<h1>Я не знаю</h1>"}, {title: "Как хранить сусло?", type_id: 1, content: "<h1>Я не знаю</h1>"}]
 *     Module:
 *       type: object
 *       required:
 *         - title
 *         - type_id
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: Название модуля.
 *         type_id:
 *           type: integer
 *           description: ID типа модуля. //TODO пните бэк, чтобы они написали запрос на получение списка доступных типов.
 *         content:
 *           type: string
 *           description: Текст контента. Вид зависит от типа контента.
 *       example:
 *         title: Как подготовить сусло?
 *         type_id: 1
 *         content: <h1>Я не знаю</h1>
 *     Category:
 *       type: object
 *       required:
 *         - id
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: ID категории.
 *         title:
 *           type: string
 *           description: Наименование категории.
 * 
*/

/**
 * @swagger
 * /course/create:
 *   post:
 *    summary: Создать курс-пустышку.
 *    tags: [Course]
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      201:
 *        description: Курс успешно добавлен.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: integer
 *                description: ID нового курса.
 *            example:
 *              id: 24
 *              
 *      401:
 *        description: Access token истёк.
 *      500:
 *        description: Необработанная ошибка.
 */
coursesRouter.post('/create', jwtCheckAccessToken, courseController.createCourse, logger);  // создать курс-пустышку

/**
 * @swagger
 * /course/getInfo/{course_id}:
 *   get:
 *    summary: Получить информацию о курсе для её дальнейшего редактирования.
 *    tags: [Course]
 *    parameters:
 *      - in: path
 *        name: course_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID курса.
 *        default: 47
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      200:
 *        description: Возвращает полную информацию о курсе.
 *        content:
 *          application/json:
 *            schema: {$ref: '#/components/schemas/CourseEdit'}
 *      404:
 *        description: Курса с таким ID не найдено.
 *      500:
 *        description: Необработанная ошибка.
 */
coursesRouter.get('/getInfo/:course_id', courseController.getCourseEditInfo, logger);                 // получить полную информацию о курсе

/**
 * @swagger
 * /course/update:
 *   put:
 *    summary: Обновить курс.
 *    tags: [Course]
 *    security:
 *      - BearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema: {$ref: '#/components/schemas/CourseEdit'}
 *    responses:
 *      200:
 *        description: Курс успешно обновлён.
 *      400:
 *        description: Неправильные параметры запроса.
 *      401:
 *        description: Access token истёк.
 *      404:
 *        description: Курс с таким ID не найден.
 *      500:
 *        description: Необработанная ошибка.
 */
 coursesRouter.put('/update', jwtCheckAccessToken, courseController.updateCourse, logger);                      // обновление курса

/**
 * @swagger
 * /course/page/{course_id}:
 *  get:
 *    summary: Получить страницу курса
 *    tags: [Course]
 *    parameters:
 *      - in: path
 *        name: course_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID курса.
 *    responses:
 *      200:
 *        description: Возвращает объект курса.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - id
 *                - title
 *                - description
 *                - author_id
 *                - trailer_url
 *                - user_level
 *                - main_topics
 *                - author_name
 *                - author_description
 *                - sections
 *              properties:
 *                id:
 *                  type: string
 *                  description: ID курса.
 *                title:
 *                  type: string
 *                  description: Название курса.
 *                description:
 *                  type: string
 *                  description: Полное описание курса.
 *                author_id:
 *                  type: integer
 *                  description: ID автора курса.
 *                trailer_url:
 *                  type: string
 *                  description: Ссылка на трейлер курса.
 *                user_level:
 *                  type: string
 *                  enum:
 *                    - "1"
 *                    - "2"
 *                    - "3"
 *                  description: Сложность курса.
 *                main_topics:
 *                  type: string[]
 *                  description: Основные моменты, которые будут изучены в курсе.
 *                author_name:
 *                  type: string
 *                  description: ФИО автора курса.
 *                author_description:
 *                  type: string
 *                  description: Описание автора курса.
 *                sections:
 *                  type: object[]
 *                  description: Массив секций.
 *                  required:
 *                    - local_id
 *                    - title
 *                    - description
 *                    - modules
 *                  properties:
 *                    local_id:
 *                      type: integer
 *                      description: ID секции в данном курсе.
 *                    title:
 *                      type: string
 *                      description: Название секции.
 *                    description:
 *                      type: string
 *                      description: Описание секции.
 *                    modules:
 *                      type: object[]
 *                      description: Массив модулей.
 *                      required:
 *                        - local_id
 *                        - title
 *                        - type
 *                      properties:
 *                        local_id:
 *                          type: integer
 *                          description: ID модуля в данной секции.
 *                        title:
 *                          type: string
 *                          description: Название модуля.
 *                        type:
 *                          type: string
 *                          description: Тип модуля.
 *              example:
 *                id: 24
 *                title: Уроки пивоварения.
 *                description: Инновационный курс пивоварения, разработанный специально для студентов НГТУ!
 *                trailer_url: https://www.youtube.com/watch?v=R81F4iWCq88
 *                user_level: 1
 *                main_topics: ["Пиво безалкогольное", "Квас безалкогольный"]
 *                author_name: "Иванов Иван Иванович"
 *                author_description: "Автор серии книг 'Как варить?'."
 *                sections: [{
 *                  local_id: 1,
 *                  title: "Секция 1. Варка сусла.",
 *                  description: "Данный блок посвящён варке сусла.",
 *                  modules: [{
 *                    local_id: 0,
 *                    title: "Как подготовить сусло?",
 *                    type: HTML_TEXT,
 *                  },
 *                  {
 *                    local_id: 1,
 *                    title: "Как хранить сусло?",
 *                    type: HTML_TEXT
 *                  }]
 *                }]
 *      404:
 *        description: Курс с таким ID не найден.
 *      500:
 *        description: Необработанная ошибка.
 */
coursesRouter.get('/page/:course_id', courseController.getCourseById, logger);               // получение курса

/**
 * @swagger
 * /course/preview:
 *   get:
 *    summary: Получить некоторое количество карточек курса.
 *    tags: [Course]
 *    parameters:
 *      - in: query
 *        name: count
 *        schema:
 *          type: integer
 *        required: true
 *        description: Количество получаемых карточек курса. 0 - получить все.
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *        required: true
 *        description: Смещение относительно всех курсов.
 *    responses:
 *      200:
 *        description: Возврат массива курсов.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - id
 *                - image_url
 *                - trailer_url
 *                - title
 *                - author_first_name
 *                - author_second_name
 *                - author_third_name
 *                - preview_description
 *                - rating
 *              properties:
 *                id:
 *                  type: integer
 *                  description: ID курса.
 *                image_url:
 *                  type: string
 *                  description: Ссылка на изображение для карточки.
 *                trailer_url:
 *                  type: string
 *                  description: Ссылка на трейлер курса.
 *                title:
 *                  type: string
 *                  description: Название курса.
 *                author_first_name:
 *                  type: string
 *                  description: Имя автора курса.
 *                author_second_name:
 *                  type: string
 *                  description: Фамилия автора курса.
 *                author_third_name:
 *                  type: string
 *                  description: Отчество автора курса.
 *                preview_description:
 *                  type: string
 *                  description: Короткое описание курса для карточки.
 *                rating:
 *                  type: string
 *                  description: Рейтинг курса.
 *              example: [{
 *                id: 53,
 *                image_url: "https://img3.eadaily.com/r650x650/o/a53/97bc8920b846b239b11614d2992d1.jpeg",
 *                trailer_url: "https://www.youtube.com/watch?v=R81F4iWCq88",
 *                title: "Уроки пивоварения.",
 *                author_first_name: "Иван",
 *                author_second_name: "Иванов",
 *                author_third_name: "Иванович",
 *                preview_description: "Хочешь варить пиво? Тогда тебе к нам!",
 *                rating: "4.00"
 *              }]
 *      400:
 *        description: Неправильные параметры запроса.
 *      500:
 *        description: Необработанная ошибка.
 */
coursesRouter.get('/preview', courseController.getCourses, logger);                          // получение нескольких карточек курсов

/**
 * @swagger
 * /course/categories:
 *   get:
 *    summary: Получить массив категорий.
 *    tags: [Course]
 *    responses:
 *      200:
 *        description: Возврат МАССИВА категорий и их id.
 *        content:
 *          application/json:
 *            schema: {$ref: '#/components/schemas/Category'}
 *      400:
 *        description: Неправильные параметры запроса.
 *      500:
 *        description: Необработанная ошибка.
 */
coursesRouter.get('/categories', courseController.getCategories, logger);                    // получение массива категорий

export default coursesRouter;
