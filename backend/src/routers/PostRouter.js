import { Router } from "express";
import { PostService } from "../services/PostService.js";

const router = Router();
const service = new PostService();

router.get("/posts", async (_req, res, next) => {
  try {
    const posts = await service.listPostsWithAuthor();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

export default router;
