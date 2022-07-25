import jwt from 'jsonwebtoken';
import { logger } from '../middleware/logMiddleware.js';

export function jwtCheckAccessToken(req, res, next) {
    try {
        const info = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
        req.userId = info.id;
        next();
    } catch (_) {
        res.status(401).end();
        logger(req, res);
    }
}

export function jwtCheckRefreshToken(req, res, next) {
    if (req.headers.authorization === undefined) {
        res.status(400).end();
        logger(req, res);
        return;
    }

    try {
        const info = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
        req.userId = info.id;
        next();
    } catch (_) {
        res.status(401).end();
        logger(req, res);
    }
}