import express from 'express';
import blogsRouter from './blogs/blogs.router';

const router = express.Router();

router.use("/blog", blogsRouter);

export default router;