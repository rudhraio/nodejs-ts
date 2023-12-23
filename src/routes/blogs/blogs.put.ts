import express from "express";
import { serverErrorResponse, successResponse } from "../../utils/helpers/response";
import Blog from "../../utils/database/models/blog.model";
import { body } from "express-validator";
import validator from "../../utils/middlewares/validator";

const blogsPUT = express.Router();

const validData = [
    body('title').notEmpty().withMessage('title field cannot be empty.'),
    body('description').notEmpty().withMessage('description field cannot be empty.'),
    body('image').optional().isString().withMessage('invalid image url sent')
];

blogsPUT.put("/:id", validator(validData), async (req, res) => {

    try {
        const { id } = req.params;
        await Blog?.update(id, req.body);
        return successResponse(res, `blog ${id} updated successfully`, []);
    } catch (err) {
        return serverErrorResponse(res)

    }
})

export default blogsPUT;