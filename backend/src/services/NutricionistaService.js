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
}
