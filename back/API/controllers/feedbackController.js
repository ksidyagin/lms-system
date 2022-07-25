import db from "../shared/db.js";

export default class FeedbackController {
    async createFeedBackbyUser(req, res, next) {
        try {
            const { course_id } = req.params;
            const { author_id,description,mark } = req.body;
            
            // проверка оценки от 0 до 5
            if (parseInt(mark) < 0 || parseInt(mark) > 5) {
                res.status(400).end();
                next();
                return;
            }

            const date = new Date();
            let datetime = date.toDateString() + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ":" + date.getUTCSeconds();
            await db.query(`INSERT INTO feedbacks (course_id,author_id,description,mark,date) VALUES (
                '${course_id}',
                '${author_id}',
                '${description}',
                '${mark}',
                '${datetime}');`
            );
            res.status(201).end();
        } catch (err) {
                // если необработанная ошибка
                console.log(err);
                res.status(500).end();
        }
        next();
    }


    async getFeedBacksofCourse(req, res, next) {
        try {
            let { course_id } = req.params;
            if (course_id === undefined || parseInt(course_id) === NaN) {
                res.status(400).end();
                next();
                return;
            }
            const feedBackCourses = await db.query(`SELECT users.id AS author_id, users.avatar_url, description, mark, date FROM feedbacks 
            JOIN users ON feedbacks.author_id = users.id WHERE course_id='${course_id}';`);

            res.status(200).json(feedBackCourses.rows);
        } catch(err) {
            // если необработанная ошибка
            console.log(err);
            res.status(500).end();
        }
        next();
    } 
}