import { PacienteRepository } from "../repositories/PacienteRepository.js";

function toPaciente(data = {}) {
  return {
    id: data.id || "",
    nome: data.nome || "",
    email: data.email || "",
    numero: data.numero || "",
    genero: data.genero || "",
    cep: data.cep || "",
    "id posts salvos": data["id posts salvos"] || []
  };
}

export class PacienteService {
  async listPacientes() {
    const pacientes = await PacienteRepository.findAll();
    return pacientes.map((paciente) => toPaciente(paciente));
  }

  async getById(id) {
    const paciente = await PacienteRepository.findById(id);
    return paciente ? toPaciente(paciente) : null;
  }

  async cadastrarPaciente(dadosFormulario) {
    const emailExistente = await PacienteRepository.findByEmail(dadosFormulario.email);
    if (emailExistente) {
      throw new Error("Este e-mail já está cadastrado no sistema.");
    }

    const dadosParaSalvar = {
      nome: dadosFormulario.nome,
      email: dadosFormulario.email,
      senha: dadosFormulario.senha,
      cep: dadosFormulario.cep || "",
      genero: dadosFormulario.genero,
      numero: dadosFormulario.telefone || "",
      "id posts salvos": []
    };

    const novoPaciente = await PacienteRepository.create(dadosParaSalvar);
    return toPaciente(novoPaciente);
  }

  async atualizarPerfil(pacienteId, dadosFormulario) {
    const paciente = await PacienteRepository.findById(pacienteId);
    if (!paciente) {
      throw new Error("Paciente não encontrado.");
    }

    const dadosParaAtualizar = {
      nome: dadosFormulario.nome,
      email: dadosFormulario.email,
      cep: dadosFormulario.cep || "",
      genero: dadosFormulario.genero || "",
      numero: dadosFormulario.telefone || "",
      foto_do_nutricionista: dadosFormulario.foto_do_nutricionista || dadosFormulario.photoUrl || paciente.foto_do_nutricionista || "",
    };

    await PacienteRepository.update(pacienteId, dadosParaAtualizar);
    return toPaciente({ id: pacienteId, ...paciente, ...dadosParaAtualizar });
  }

  async alternarFavorito(pacienteId, postId) {
    const paciente = await PacienteRepository.findById(pacienteId);
    if (!paciente) {
      throw new Error("Paciente não encontrado.");
    }

    const salvos = paciente["id posts salvos"] || [];

    if (salvos.includes(postId)) {
      await PacienteRepository.removeFavorito(pacienteId, postId);
      return { status: "removido", postId };
    } else {
      await PacienteRepository.addFavorito(pacienteId, postId);
      return { status: "salvo", postId };
    }
  }
}