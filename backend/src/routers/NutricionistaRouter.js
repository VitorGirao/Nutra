import { Router } from "express";
import { NutricionistaService } from "../services/NutricionistaService.js";

const router = Router();
const service = new NutricionistaService();

router.get("/nutricionistas", async (_req, res, next) => {
  try {
    const nutricionistas = await service.listNutricionistas();
    res.status(200).json(nutricionistas);
  } catch (error) {
    next(error);
  }
});

router.get("/nutricionistas/featured", async (req, res, next) => {
  try {
    const parsedLimit = Number.parseInt(req.query.limit, 10);
    const limit = Number.isNaN(parsedLimit) ? 3 : parsedLimit;

    const featured = await service.listFeatured(limit);
    res.status(200).json(featured);
  } catch (error) {
    next(error);
  }
});

router.get("/nutricionistas/:id", async (req, res, next) => {
  try {
    const nutricionista = await service.getById(req.params.id);

    if (!nutricionista) {
      return res.status(404).json({
        code: "NUTRICIONISTA_NOT_FOUND",
        message: "Nutricionista not found.",
      });
    }

    res.status(200).json(nutricionista);
  } catch (error) {
    next(error);
  }
});

router.post("/nutricionistas", async (req, res, next) => {
  try {
    const dadosFormulario = req.body;
    const novoNutricionista = await service.cadastrarNutricionista(dadosFormulario);
    res.status(201).json(novoNutricionista);
  } catch (error) {
    next(error);
  }
});

router.post("/nutricionistas/:id/favoritar", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ message: "O ID do post é obrigatório." });
    }

    const resultado = await service.alternarFavorito(id, postId);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
});

export default router;
