import express from "express";
import { invalidResponse, serverErrorResponse, successResponse } from "../../utils/helpers/response";
import Blog from "../../utils/database/models/blog.model";
import validator from "../../utils/middlewares/validator";
import { param } from "express-validator";


const blogsGET = express.Router();

blogsGET.get("/", (_, res) => {
    try {
        const blogs = Blog.list();
        return successResponse(res, "blogs list", blogs);
    } catch (err) {
        return serverErrorResponse(res)
    }
});


blogsGET.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const blog = Blog.getById(id);
        return successResponse(res, "blog data", blog);
    } catch (err) {
        return serverErrorResponse(res)
    }
});

export default blogsGET;