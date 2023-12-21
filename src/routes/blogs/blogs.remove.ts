import express from "express";
import { serverErrorResponse, successResponse } from "../../utils/helpers/response";
import Blog from "../../utils/database/models/blog.model";
import logger from "../../utils/helpers/logger";


const blogsREMOVE = express.Router();

blogsREMOVE.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Blog?.remove(id);
        logger("data", data);
        return successResponse(res, "blog deleted successfully", []);
    } catch (err) {
        return serverErrorResponse(res)
    }
})

export default blogsREMOVE;