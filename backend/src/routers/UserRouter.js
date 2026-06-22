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

export default router;
