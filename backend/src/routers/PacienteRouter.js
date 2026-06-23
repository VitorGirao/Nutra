import { Router } from "express";
import { PacienteService } from "../services/PacienteService.js";

const router = Router();
const service = new PacienteService();

router.get("/pacientes", async (_req, res, next) => {
  try {
    const pacientes = await service.listPacientes();
    res.status(200).json(pacientes);
  } catch (error) {
    next(error);
  }
});

router.get("/pacientes/:id", async (req, res, next) => {
  try {
    const paciente = await service.getById(req.params.id);

    if (!paciente) {
      return res.status(404).json({
        code: "PACIENTE_NOT_FOUND",
        message: "Paciente não encontrado.",
      });
    }

    res.status(200).json(paciente);
  } catch (error) {
    next(error);
  }
});

router.post("/pacientes", async (req, res, next) => {
  try {
    const dadosFormulario = req.body;
    const novoPaciente = await service.cadastrarPaciente(dadosFormulario);
    res.status(201).json(novoPaciente);
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
    next(error);
  }
});

export default router;