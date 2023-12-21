import express, { Request, Response } from 'express';
import cors from 'cors';

import { notFoundResponse, successResponse } from './utils/helpers/response';
import requestLogger from './utils/middlewares/request-logger';
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true,
}));


// To check server status
app.get('/ping', requestLogger, (_: Request, res: Response) => {
    return successResponse(res, "ok");
});

// To include additional routes
app.use("/api", requestLogger, routes);

// Catch-all undefined routes
app.all('*', requestLogger, (req: Request, res: Response) => {
    return notFoundResponse(res, "No matching URL found");
});

export default app;