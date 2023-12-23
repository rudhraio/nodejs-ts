import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';


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

// Set 'views' directory for any views 
app.set('views', path.join(__dirname, 'views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'src/public')));

// Route for the landing page
app.get('/', (req, res) => {
    res.render('index'); // Renders the 'index.ejs' file in the 'views' directory
});

// To include additional routes
app.use("/api", requestLogger, routes);

// Catch-all undefined routes
app.all('*', requestLogger, (req: Request, res: Response) => {
    return notFoundResponse(res, "No matching URL found");
});

export default app;