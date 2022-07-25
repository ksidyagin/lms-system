import db from '../shared/db.js';

export default class AdminController {
    async addCategory(req, res, next) {
        try {
            const { new_category } = req.params;
            await db.query(`INSERT INTO categories (title) VALUES ('${new_category}');`);
            res.status(201).end();
        }
        catch (err) {
            // если такая категория уже есть
            if (err.code === "23505") {
                res.status(400).end();
            }
            
            // если необработанная ошибка
            console.log(err);
            res.status(500).end();
        }
        finally {
            next();
        }
    }
}