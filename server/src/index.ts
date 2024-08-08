import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import DBconnection from './utils/DBconnect';
import authRoute from './routes/auth.route';
import projectRoute from './routes/project.route';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Express = express();
dotenv.config();

const port = process.env.SERVER_PORT || 5000;
const accessOrigin = process.env.ORIGIN || 'http://localhost:5173';

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: accessOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Routes
app.use("/", projectRoute);
app.use("/", authRoute);

app.get("/", (req: Request, res: Response) => {
    res.send("TypeScript with Express");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`CORS Origin: ${accessOrigin}`);
    DBconnection();
});
