import { PacienteRepository } from "../repositories/PacienteRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";

function buildPacienteError(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(value) {
  return normalizeText(value).toLowerCase();
}

function mapPaciente(data = {}) {
  return {
    id: data.id || "",
    tipo_usuario: "Paciente",
    nome: data.nome || "",
    email: data.email || "",
    cep: data.cep || "",
    genero: data.genero || "",
    numero: data.numero || "",
    senha: data.senha || "",
    "id posts salvos": data["id posts salvos"] || [],
  };
}

export class PacienteService {
  async cadastrarPaciente(dadosFormulario = {}) {
    const nome = normalizeText(dadosFormulario.nome);
    const email = normalizeEmail(dadosFormulario.email);
    const senha = typeof dadosFormulario.senha === "string" ? dadosFormulario.senha : "";
    const cep = normalizeText(dadosFormulario.cep);
    const genero = normalizeText(dadosFormulario.genero);
    const numero = normalizeText(dadosFormulario.numero || dadosFormulario.telefone);

    if (!nome || !email || !senha || !cep || !genero) {
      throw buildPacienteError("Nome, e-mail, senha, CEP e gênero são obrigatórios.", 400);
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      throw buildPacienteError("Informe um e-mail válido.", 400);
    }

    const emailExistente = await UserRepository.findByEmail(email);
    if (emailExistente) {
      throw buildPacienteError("Este e-mail já está cadastrado no sistema.", 409);
    }

    const novoPaciente = await PacienteRepository.create({
      nome,
      email,
      senha,
      cep,
      genero,
      numero,
      "id posts salvos": [],
    });

    return mapPaciente(novoPaciente);
  }

  async getByEmail(email) {
    const paciente = await PacienteRepository.findByEmail(email);
    return paciente ? mapPaciente(paciente) : null;
  }

  async getById(id) {
    const paciente = await PacienteRepository.findById(id);
    return paciente ? mapPaciente(paciente) : null;
  }

  async alternarFavorito(pacienteId, postId) {
    const paciente = await PacienteRepository.findById(pacienteId);
    if (!paciente) {
      throw buildPacienteError("Paciente não encontrado.", 404);
    }

    const salvos = paciente["id posts salvos"] || [];

    if (salvos.includes(postId)) {
      await PacienteRepository.removeFavorito(pacienteId, postId);
      return { status: "removido", postId };
    }

    await PacienteRepository.addFavorito(pacienteId, postId);
    return { status: "salvo", postId };
  }
}
