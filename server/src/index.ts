import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import DBconnection from './utils/DBconnect';
import authRoute from './routes/auth.route';
import projectRoute from './routes/project.route';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app: Express = express();
dotenv.config();

const port = process.env.SERVER_PORT || 5000;
const accessOrigin = process.env.ORIGIN || 'http://localhost:5173';


const corsOptions = {
    origin: accessOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// Routes
app.use("/", projectRoute);
app.use("/", authRoute);

app.use(
    '/weather',
    createProxyMiddleware({
        target: accessOrigin,
        changeOrigin: true,
        pathRewrite: {
            '^/weather': '', // This rewrites /weather to /
        },
    })
);



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
