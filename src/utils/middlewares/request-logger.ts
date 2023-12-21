import { Request, Response, NextFunction } from "express";
import logger from "../helpers/logger";

function requestLogger(req: Request, res: Response, next: NextFunction) {

    logger(`[Request] \n[IP]: ${req.ip} \n[method]: ${req.method} \n[headers]: ${JSON.stringify(req.headers)} \n[data]: ${JSON.stringify(req.body)} \n[url]: ${req.url} \n`, false)
    return next();
}

export default requestLogger