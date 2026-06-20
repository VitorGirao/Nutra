import { NutricionistaRepository } from "../repositories/NutricionistaRepository.js";

function toNutricionista(data = {}) {
  return {
    id: data.id || "",
    nome: data.nome || "",
    especialidade: data.especialidade || "",
    meu_resumo: data.meu_resumo || "",
    numero: data.numero || "",
    email: data.email || "",
    crn: data.crn || "",
    foto_do_nutricionista: data.foto_do_nutricionista || "",
    "id posts salvos": data["id posts salvos"] || [] 
  };
}
function createFallbackNutricionista() {
  return {
    id: "unknown",
    nome: "Nutricionista do Sistema",
    especialidade: "Nutricao",
    meu_resumo: "",
    numero: "",
    email: "",
    crn: "",
    foto_do_nutricionista: "",
  };
}

export class NutricionistaService {
  async listNutricionistas() {
    const nutricionistas = await NutricionistaRepository.findAll();
    return nutricionistas.map((nutricionista) => toNutricionista(nutricionista));
  }

  async listFeatured(limit = 3) {
    const maxLimit = 10;
    const normalizedLimit = Number.isFinite(limit)
      ? Math.max(1, Math.min(maxLimit, limit))
      : 3;

    const all = await NutricionistaRepository.findAll();
    const shuffled = [...all].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, normalizedLimit);
  }

  async getById(id) {
    const nutricionista = await NutricionistaRepository.findById(id);
    return nutricionista ? toNutricionista(nutricionista) : null;
  }

  async cadastrarNutricionista(dadosFormulario) {
    const emailExistente = await NutricionistaRepository.findByEmail(dadosFormulario.email);
    if (emailExistente) {
      throw new Error("Este e-mail já está cadastrado no sistema.");
    }

    const crnExistente = await NutricionistaRepository.findByCrn(dadosFormulario.crn);
    if (crnExistente) {
      throw new Error("Já existe um nutricionista cadastrado com este CRN.");
    }

    const dadosParaSalvar = {
      nome: dadosFormulario.nome,
      email: dadosFormulario.email,
      senha: dadosFormulario.senha,
      crn: dadosFormulario.crn,
      cep: dadosFormulario.cep || "",
      genero: dadosFormulario.genero,
      numero: dadosFormulario.telefone || "",
      especialidade: "Geral", 
      meu_resumo: "",
      foto_do_nutricionista: ""
    };

    const novoNutri = await NutricionistaRepository.create(dadosParaSalvar);
    return toNutricionista(novoNutri);
  }

  async autenticarNutricionista(email, senha) {
    const nutricionista = await NutricionistaRepository.findByEmail(email);
    if (!nutricionista) {
      throw new Error("E-mail ou senha incorretos.");
    }
    if (nutricionista.senha !== senha) {
      throw new Error("E-mail ou senha incorretos.");
    }
    return toNutricionista(nutricionista);
  }

async alternarFavorito(nutriId, postId) {
    const nutricionista = await NutricionistaRepository.findById(nutriId);
    if (!nutricionista) {
      throw new Error("Nutricionista não encontrado.");
    }

    const salvos = nutricionista["id posts salvos"] || [];

    if (salvos.includes(postId)) {
      await NutricionistaRepository.removeFavorito(nutriId, postId);
      return { status: "removido", postId };
    } else {
      await NutricionistaRepository.addFavorito(nutriId, postId);
      return { status: "salvo", postId };
    }
  }
}