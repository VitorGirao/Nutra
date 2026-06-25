import { Router } from "express";
import { UserService } from "../services/UserService.js";

const router = Router();
const service = new UserService();

router.post("/login", async (req, res, next) => {
  try {
    const usuarioLogado = await service.login(req.body);
    return res.status(200).json(usuarioLogado);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(401).json({ message: error.message || "Erro ao realizar login." });
  }
});

router.post("/recuperar-senha", async (req, res, next) => {
  try {
    const resultado = await service.recuperarSenha(req.body);
    return res.status(200).json(resultado);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message || "Não foi possível atualizar a senha." });
  }
});

export default router;
