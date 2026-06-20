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

router.post('/login', async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }
    const nutricionistaLogado = await service.autenticarNutricionista(email, senha);
    
    return res.status(200).json(nutricionistaLogado);
  } catch (erro) {
    return res.status(401).json({ message: erro.message || "Erro ao realizar login." });
  }
});

export default router;
