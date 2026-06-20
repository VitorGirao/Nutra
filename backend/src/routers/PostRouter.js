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

router.get("/posts/:id", async (req, res, next) => {
  try {
    const post = await service.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({
        code: "POST_NOT_FOUND",
        message: "Postagem não encontrada.",
      });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

export default router;