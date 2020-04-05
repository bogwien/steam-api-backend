import express from 'express';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import path from 'path';

import steam from './routes/steam';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/v1/steam', steam);

export default app;
