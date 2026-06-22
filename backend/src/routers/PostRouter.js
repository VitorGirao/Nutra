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

router.post("/posts", async (req, res, next) => {
  try {
    const novoPost = await service.createPost(req.body);
    res.status(201).json(novoPost);
  } catch (error) {
    if (error.status === 400 || error.status === 404) {
      return res.status(error.status).json({
        code: error.status === 404 ? "NUTRICIONISTA_NOT_FOUND" : "POST_INVALID",
        message: error.message,
      });
    }

    next(error);
  }
});

router.delete("/posts/:id", async (req, res, next) => {
  try {
    const resultado = await service.deletePost(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    if (error.message === "Postagem não encontrada.") {
      return res.status(404).json({
        code: "POST_NOT_FOUND",
        message: error.message,
      });
    }

    next(error);
  }
});

export default router;
