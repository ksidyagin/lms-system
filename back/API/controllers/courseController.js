import db from "../shared/db.js";

export default class CourseController {
    async createCourse(req, res, next) {
        try {
            const course = await db.query(`INSERT INTO courses (author_id) VALUES ('${req.userId}') RETURNING id;`);
            res.status(201).json(course.rows[0]);
        }
        catch (err) {
            console.log(err);
            res.status(500).end();
        }
        finally {
            next();
        }
    }

    async getCourseEditInfo(req, res, next) {
        try {
            const { course_id } = req.params;
            // если передали что-то не то
            if (course_id === undefined || parseInt(course_id) === NaN) {
                res.status(400).end();
                next();
                return;
            }

            // получаем курс
            let course = await db.query(`SELECT * FROM courses WHERE id=${course_id} LIMIT 1;`);
            if (course.rowCount === 0) {
                res.status(404).end();
                next();
                return;
            }
            course = course.rows[0];

            // получаем секции
            const sections = await db.query(`SELECT id, local_id, title, description FROM sections WHERE course_id=${course_id};`);
            course.sections = sections.rows;

            // получаем модули
            let modules;
            for (let i = 0; i < sections.rowCount; i++) {
                modules = await db.query(`SELECT local_id, type_id, title, content FROM modules WHERE section_id=${course.sections[i].id};`);
                delete course.sections[i].id;
                course.sections[i].modules = modules.rows;
            }

            res.status(200).json(course);
        }
        catch (err) {
            console.log(err);
            res.status(500).end();
        }
        finally {
            next();
        }
    }

    async updateCourse(req, res, next) {
        const client = await db.connect();
        try {
            // TODO проверка, что пользователь вообще имеет право редактировать курс

            // достаём данные из body
            const { id, title, description, trailer_url, user_level, preview_description, main_topics, image_url, sections } = req.body;
            // если id не передали или передали плохой
            if (id === undefined || parseInt(id) === NaN) {
                res.status(400).end();
                next();
                return;
            }

            // проверка а есть ли такой курс вообще
            let courseID = await db.query(`SELECT id FROM courses WHERE id=${id} LIMIT 1;`);
            if (courseID.rowCount === 0) {
                res.status(404).end();
                next();
                return;
            }

            // обновляем курс в БД
            await client.query(`BEGIN`);
            courseID = await client.query(
                `UPDATE courses SET 
                title='${title}',
                description='${description}',
                author_id='${req.userId}',
                trailer_url='${trailer_url}',
                user_level='${user_level}',
                preview_description='${preview_description}',
                main_topics='{${main_topics}}',
                image_url='${image_url}'
                WHERE id=${id}`
            );

            // перебираем секции
            let dbRequest;
            let section_id;
            let counterSections = 0;
            let counterModules = 0;
            sections.forEach(async section => {
                counterModules = 0;
                // проверка на наличие уже существующей секции
                dbRequest = await db.query(`SELECT id FROM sections WHERE course_id=${id} AND local_id=${section.local_id} LIMIT 1;`);
                // если секция новая
                if (dbRequest.rowCount === 0) {
                    // делаем запрос на создание секции
                    dbRequest = await client.query(
                        `INSERT INTO sections (title, course_id, local_id, description) VALUES (
                        '${section.title}',
                        '${id}',
                        '${counterSections++}',
                        '${section.description}'
                        ) RETURNING id;`
                    );
                }
                // если секция уже существовала ранее
                else {
                    // обновляем уже существующую
                    dbRequest = await client.query(`UPDATE sections SET 
                        local_id='${section.local_id}',
                        title='${section.title}',
                        description='${section.description}'
                        WHERE course_id='${id}' AND local_id='${section.local_id}'
                        RETURNING id;`
                    );
                }

                section_id = dbRequest.rows[0].id;

                // перебираем модули
                section.modules.forEach(async module => {
                    // проверка на наличие уже существующего модуля
                    dbRequest = await db.query(`SELECT id FROM modules WHERE section_id=${section_id} AND local_id=${module.local_id} LIMIT 1;`);
                    // если модуль новый
                    if (dbRequest.rowCount === 0) {
                    // делаем запрос на создание модуля
                        await client.query(
                            `INSERT INTO modules (title, type_id, section_id, local_id, content) VALUES (
                            '${module.title}',
                            '${module.type_id}',
                            '${section_id}',
                            '${counterModules++}',
                            '${module.content}');`
                        );
                    }
                    // если модуль уже существовал ранее
                    else {
                        await client.query(
                            `UPDATE modules SET 
                            title='${module.title}',
                            type_id='${module.type_id}',
                            content='${module.content}' 
                            WHERE section_id='${section_id}' AND local_id='${module.local_id}';`
                        );
                    }
                });
            });
            await client.query(`COMMIT`);

            // возвращаем статус успеха
            res.status(200).end();
        } catch (err) {
            // обработка ошибок
            await client.query('ROLLBACK');

            // если необработанная ошибка
            console.log(err);
            res.status(500).end();
        } finally {
            client.release();
            next();
        }
    }

    async getCourseById(req, res, next) {
        try {
            // ищем курс
            const { course_id } = req.params;
            let result = await db.query(`SELECT courses.id,
                courses.title,
                courses.description,
                courses.preview_description,
                courses.author_id,
                users.first_name AS author_first_name,
                users.second_name AS author_second_name,
                users.third_name AS author_third_name,
                users.about AS author_description,
                courses.trailer_url,
                courses.user_level,
                courses.main_topics,
                courses.image_url
                FROM courses
                JOIN users ON courses.author_id = users.id WHERE courses.id = ${course_id} LIMIT 1;`);
            let course = result.rows[0];
            // если курс не найден
            if (course === undefined) {
                res.status(404).end();
                next();
                return;
            }

            //ЗАГЛУШКА
            course.time = 373;

            // получаем секции курса
            result = await db.query(`SELECT id, local_id, title, description FROM sections WHERE course_id = ${course_id};`);
            course.sections = result.rows;

            // получаем модули секций курса
            for (let i = 0; i < course.sections.length; i++) {
                const modules = await db.query(`SELECT local_id, title, type FROM modules 
                JOIN module_types ON modules.type_id = module_types.id WHERE modules.section_id = ${course.sections[i].id};`);
                course.sections[i].modules = modules.rows;
                delete course.sections[i].id;
            }

            res.status(200).json(course);
        } catch (err) {
            // если необработанная ошибка
            console.log(err);
            res.status(500).end();
        }

        next();
    }

    async getCourses(req, res, next) {
        try {
            // достаём данные из query
            let { count, offset } = req.query;
            count = parseInt(count);
            offset = parseInt(offset);

            // проверяем на то, что передали числа (и что вообще хоть что-то передали). Если нет, то
            if (count === NaN || offset === NaN) {
                // возвращаем статус Плохой запрос и выходим
                res.status(400).end();
                next();
                return;
            }

            // проверка на count = 0
            let limit = "";
            if (count !== 0) {
                limit = ` LIMIT ${count} OFFSET ${offset}`;
            }

            // получаем список курсов по заданным параметрам
            let courses = await db.query(`SELECT 
                courses.id,
                image_url,
                trailer_url,
                title,
                users.first_name AS author_first_name,
                users.second_name AS author_second_name,
                users.third_name AS author_third_name,
                preview_description 
                FROM courses JOIN users ON courses.author_id = users.id${limit};`
            );

            // получаем рейтинг
            const ratings = await db.query(`SELECT AVG(mark) AS rating 
            FROM feedbacks GROUP BY course_id ORDER BY course_id${limit};`);
            for (let i = 0; i < ratings.rowCount; i++) {
                courses.rows[i].rating = ratings.rows[i].rating.substr(0, 4);
            }

            // возвращаем результат со статусом ОК
            res.status(200).json(courses.rows);

        } catch (err) {
            // если необработанная ошибка
            console.log(err);
            res.status(500).end();
        }
        finally {
            next();
        }
    }

    async getCategories(req, res, next) {
        try {
            const categories = await db.query(`SELECT * FROM categories;`)
            res.status(200).json(categories.rows);
        }
        catch (err) {
            console.log(err);
            res.status(500).end();
        }
        finally {
            next();
        }
    }
}