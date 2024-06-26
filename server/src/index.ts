import express, {Express, Request,  Response} from 'express'
import dotenv from 'dotenv'
import DBconnection from './utils/DBconnect';
import authRoute from './routes/auth.route'
import projectRoute from './routes/project.route'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app : Express = express();
dotenv.config();

const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use("/",authRoute)
app.use("/",projectRoute)


app.get("/", (req: Request, res:Response)=>{
    res.send("TypeScript wiht express");
})

app.listen(port || 5000, ()=>{
    console.log(`http://localhost:${port}`);
    DBconnection();
})