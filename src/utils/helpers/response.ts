import { Response } from 'express';
import logger from './logger';


function successResponse(
    res: Response,
    message: string = "ok",
    data: any = [],
    redirect?: string,
    from: string = "NA"
) {
    logger(`[response]: 200 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);
    let responsePayload: any = {
        status: 200,
        message: message,
        data: data
    }
    if (redirect) {
        responsePayload["redirect"] = redirect;
    }
    return res.status(200).json(responsePayload);
}

function createResponse(
    res: Response,
    message: string = "created successfully",
    data: any = [],
    redirect?: string,
    from: string = "NA"
) {
    logger(`[response]: 201 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);
    let responsePayload: any = {
        status: 201,
        message: message,
        data: data
    }
    if (redirect) {
        responsePayload["redirect"] = redirect;
    }
    return res.status(201).json(responsePayload)
}


function invalidResponse(
    res: Response,
    message: string = "Invalid data send",
    data: any = [],
    from: string = "NA"
) {
    logger(`[response]: 400 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);

    return res.status(400).json({
        status: 400,
        message: message,
        data: data
    })
}


function notFoundResponse(
    res: Response,
    message: string = "No data found",
    data: any = [],
    from: string = "NA"
) {
    logger(`[response]: 404 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);

    return res.status(404).json({
        status: 404,
        message: message,
        data: data
    })
}

function unauthorizedResponse(
    res: Response,
    message: string = "user unauthorized",
    data: any = [],
    from: string = "NA"
) {
    logger(`[response]: 403 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);

    return res.status(403).json({
        status: 403,
        message: message,
        data: data
    })
}

function serverErrorResponse(
    res: Response,
    message: string = "Internal server error",
    data: any = [],
    from: string = "NA"
) {
    logger(`[response]: 500 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);

    return res.status(500).json({
        status: 500,
        message: message,
        data: data
    })
}

export {
    invalidResponse,
    notFoundResponse,
    unauthorizedResponse,
    serverErrorResponse,
    successResponse,
    createResponse
}