import bcrypt from "bcrypt";
import db from "../shared/db.js";
import { generateTokens } from "../shared/jwt.js";

export async function createUser(req, res, next) {
    try {
        const { email, first_name, second_name, third_name, password } = req.body;

        let newId = await db.query(`SELECT last_value FROM users_id_seq;`);
        newId = parseInt(newId.rows[0].last_value) + 1;

        // генерируем токены
        const tokens = generateTokens(newId);

        // добавляем пользователя в БД
        await db.query(`INSERT INTO users (email, first_name, second_name, third_name, password, refresh_token) VALUES 
            ('${email}', '${first_name}', '${second_name}', '${third_name}', '${bcrypt.hashSync(password, bcrypt.genSaltSync())}',
            '${tokens.refresh_token}');`);

        // если пользователь добавлен успешно, то возвращаем токены
        res.status(201).json(tokens);
    } catch (err) {
        switch (err.code) {
            case "23505": {
                // если email уже занят
                res.status(409).end();
                next();
                return;
            }
            case "22P02": {
                // если проблема с запросом (например, длина неподходящая)
                res.status(400).end();
                next();
                return;
            }
        }

        // если необработанная ошибка
        console.log(err);
        res.status(500).end();
        next();
    }
}

export async function userAuthentication(req, res, next) {
    try {
        const { email, password } = req.query;

        // ищем пользователя и получаем его пароль
        const user = await db.query(
            `SELECT id, password FROM users WHERE email='${email}';`
        );

        // если пользователь найден
        if (user.rowCount === 1) {
            // проверяем правильность пароля
            if (bcrypt.compareSync(password, user.rows[0].password)) {
                // генерируем новые токены
                const tokens = generateTokens(user.rows[0].id);

                // обновляем refresh_token в БД
                db.query(
                    `UPDATE users SET refresh_token='${tokens.refresh_token}' WHERE email='${email}';`
                );

                // если успешно обновлили, то возвращаем токены
                res.status(200).json(tokens);
                next();
            } else {
                // если пароль неправильный
                res.status(401).end();
                next();
            }
        } else {
            // если пользователь с таким email не найден
            res.status(404).end();
            next();
        }
    } catch (err) {
        // если необработанная ошибка
        console.log(err);
        res.status(500).end();
        next();
    }
}

export async function updateAccessToken(req, res, next) {
    let token = req.headers.authorization;
    
    const tokens = generateTokens(req.userId);

    try {
        const refresh_token_in_DB = await db.query(`SELECT refresh_token FROM users WHERE id='${req.userId}'`);

        if (refresh_token_in_DB.rows[0].refresh_token === token) {
            res.status(200).json({"access_token": tokens.access_token});
        } else {
            res.status(401).end();
        }
    }
    catch(err) {
        // если необработанная ошибка
        console.log(err);
        res.status(500).end();
    }
    next();
}


export async function addUserPermission(req, res, next) {
    try {
        const { user_id, course_id, permission_id } = req.body;
        if (parseInt(course_id) === NaN || parseInt(user_id) === NaN || parseInt(permission_id) === NaN) {
            res.status(400).end();
            next();
            return;
        }

        // TODO: делать ли проверку есть ли такое право в БД? Имхо нет, ибо это тестовый запрос.

        await db.query(`INSERT INTO user_permissions (user_id, course_id, permission_id) VALUES (${user_id}, ${course_id}, ${permission_id});`);

        res.status(200).end();
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).end();
        next();
        return;
    }
}


// /*
//     Генерация токена подтверждения электронной почты

//     in:
//         получает на вход id пользователя
//     out:
//         возвращает в response искомый токен
// */
// export async function emailVerify(req, res, next) {
//     /*#swagger.tags = ['Auth']
//     #swagger.description = 'Создать токен для подтверждения учётной записи'
//     #swagger.parameters['authorization'] = {
//             in: 'header',
//             description: 'Access token пользователя',
//             required: true,
//             schema: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYWRtaHlhbmRleC5ydSIsImlhdCI6MTY1MjM2Nzg1MywiZXhwIjoxNjU0OTU5ODUzfQ.8Z9Ogc_Yb5NG8P2Zk7CvlMxcXfzjAG-m3U-r3xmCH-Q'
//     }
//     */
//     /*#swagger.responses[200] = {
//         description: 'Refresh token валиден и привязан к пользователю. Возвращает новый Access Token',
//         schema: {
//             $email_verify_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYWRtaHlhbmRleC5ydSIsImlhdCI6MTY1MjM2Nzg1MywiZXhwIjoxNjUyMzY4NzUzfQ.kwiPgUWVE9Wy22F7Tvkx42Ja7s16H7Da6SO5fa6NdVw",
//         }
//     }
//     #swagger.responses[401] = {
//         description: 'Refresh token недействителен'
//     }
//      #swagger.responses[500] = {
//         description: 'Необработанная ошибка'
//     }*/
//     const token = generateEmailVerifyToken(req.userId);

//     const email_verify_token_in_DB = await db.query(`INSERT INTO email_verify (token, expiration_time) VALUES ('${token}', '${token.expirationTime}');`);

//     res.status(200).json({"email_verify_token": token});
//     next();
// }

// /*
//     Проверка токена подтверждения электронной почты

//     in:
//         получает на вход токен
//     out:
//         status 200:
//             с токеном всё в порядке
//         status 401:
//             токен зашифрован не тем ключом
//                 ИЛИ
//             истёк срок действия токена
//                 ИЛИ
//             не совпадают сроки из БД и из токена
// */
// export async function checkEmailVerify(req, res, next) {
//     const token = req.token;

//     const email_verify_token_in_DB = await db.query(`SELECT expiration_time FROM email_verify WHERE token='${token}';`);

//     const today = new Date().toISOString().replace(/\.\w*/, "").replace("T", " ");

//     if (new Date(today) > new Date(token.expirationTime))
//         res.status(401).end() // Срок действия токена истёк

//     if (email_verify_token_in_DB.rows[0].expiration_time === token.expirationTime) {
//         res.status(200).json({"email_verify_token": token});
//     } else {
//         res.status(401).end(); // Сроки в БД и токене не совпадают
//     }

//     next();
// }