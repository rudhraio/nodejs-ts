import express from "express";
import { createResponse, serverErrorResponse } from "../../utils/helpers/response";
import { body } from "express-validator";
import validator from "../../utils/middlewares/validator";
import Blog from "../../utils/database/models/blog.model";


const blogsPOST = express.Router();

const validData = [
    body('title').notEmpty().withMessage('title field cannot be empty.'),
    body('description').notEmpty().withMessage('description field cannot be empty.'),
    body('image').optional().isString().withMessage('invalid image url sent'),
    body('author').optional().isString().withMessage('invalid author name sent')
];

blogsPOST.post("/", validator(validData), async (req, res) => {
    try {
        await Blog?.create(req.body);
        return createResponse(res, "blog created successfully", req.body);
    } catch (err) {
        return serverErrorResponse(res)

    }
})

export default blogsPOST;