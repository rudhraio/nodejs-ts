import express from "express";
import blogsGET from "./blogs.get";
import blogsPOST from "./blogs.post";
import blogsPUT from "./blogs.put";
import blogsREMOVE from "./blogs.remove";


const blogsRouter = express.Router();

blogsRouter.use("/list", blogsGET);
blogsRouter.use("/get", blogsGET);

blogsRouter.use("/create", blogsPOST);
blogsRouter.use("/update", blogsPUT);
blogsRouter.use("/remove", blogsREMOVE);


export default blogsRouter;