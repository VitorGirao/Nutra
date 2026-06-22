import { Router } from "express";
import { PacienteService } from "../services/PacienteService.js";

const router = Router();
const service = new PacienteService();

router.get("/pacientes/:id", async (req, res, next) => {
  try {
    const paciente = await service.getById(req.params.id);

    if (!paciente) {
      return res.status(404).json({
        code: "PACIENTE_NOT_FOUND",
        message: "Paciente not found.",
      });
    }

    res.status(200).json(paciente);
  } catch (error) {
    next(error);
  }
});

router.post("/pacientes/:id/favoritar", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ message: "O ID do post é obrigatório." });
    }

    const resultado = await service.alternarFavorito(id, postId);
    res.status(200).json(resultado);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }

    next(error);
  }
});

router.post("/pacientes", async (req, res, next) => {
  try {
    const novoPaciente = await service.cadastrarPaciente(req.body);
    return res.status(201).json(novoPaciente);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message });
    }

    if (error.status === 409) {
      return res.status(409).json({ message: error.message });
    }

    next(error);
  }
});

export default router;
