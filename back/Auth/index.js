import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import express from 'express';
import cors from 'cors';

// импортируем роуты
import authRouter from './routes/authRoutes.js';

const app = express();                              // инициализация express

const port = process.env.AUTH_PORT || 4800;         // установка порта

app.use(cors());                                    // подключаем cors

app.use(express.json());                            // для общения через JSON

// роуты
app.use('/auth', authRouter);                       // подключаем роут courses

// документация
const options = {
	components: {
		securitySchemes: {
			BearerAuth: {
				type: "http",
				scheme: "bearer"
			}
		}
	},
	definition: {
		openapi: "3.0.0",
		info: {
            version: "1.0.0",
            title: "LMS Auth",
            description: "Документация для LMS - Auth сервиса",
		},
		servers: [
			{
				url: `http://194.67.104.19:${port}`,
                description: "Production сервер"
			},
            {
				url: `http://localhost:${port}`,
                description: "Develop сервер"
			}
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () =>                              // начинаем слушать запросы
{
    console.log("Auth server started! Port: " + port);
});
