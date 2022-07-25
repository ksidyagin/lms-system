import express from 'express';
import cors from 'cors';
import './loadENV.js';
import request from 'supertest';

// импортируем роуты
import authRouter from './routes/authRoutes.js';
import coursesRouter from './routes/coursesRoutes.js';
import feedbackRouter from './routes/feedbacksRoutes.js';

const app = express();                              // инициализация express

app.use(cors());                                    // подключаем cors

app.use(express.json());                            // для общения через JSON

// роуты
app.use('/auth', authRouter);                       // подключаем роут auth
app.use('/courses', coursesRouter);                 // подключаем роут courses
app.use('/feedback', feedbackRouter);               // подключаем роут feedback

//тесты не работают
describe('Test Feedback', () => {
    it('GET /feedback/ - with debug feedback', () => {
        return request(app)
        .get('/feedback/15')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.body[0].description).toBe("DEBUG FEEDBACK")
        });
    });
    it('GET /feedback/ - without feedbacks', () => {
        return request(app)
        .get('/feedback/-1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual([]);
        });
    })
});
