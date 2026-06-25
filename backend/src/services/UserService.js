import { UserRepository } from "../repositories/UserRepository.js";

function normalizeLoginPayload(payload = {}) {
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const senha = typeof payload.senha === "string" ? payload.senha : "";

  return { email, senha };
}

function buildLoginError(message, status = 401) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function mapUser(user) {
  if (!user) {
    return null;
  }

  if (user.tipo_usuario === "Paciente") {
    return {
      id: user.id || "",
      tipo_usuario: "Paciente",
      nome: user.nome || "",
      email: user.email || "",
      cep: user.cep || "",
      genero: user.genero || "",
      numero: user.numero || "",
      senha: user.senha || "",
      "id posts salvos": user["id posts salvos"] || [],
    };
  }

  return {
    id: user.id || "",
    tipo_usuario: "Nutricionista",
    nome: user.nome || "",
    email: user.email || "",
    cep: user.cep || "",
    genero: user.genero || "",
    crn: user.crn || "",
    especialidade: user.especialidade || "",
    foto_do_nutricionista: user.foto_do_nutricionista || "",
    meu_resumo: user.meu_resumo || "",
    numero: user.numero || "",
    senha: user.senha || "",
    "id posts salvos": user["id posts salvos"] || [],
  };
}

export class UserService {
  validateLoginInput(payload) {
    const { email, senha } = normalizeLoginPayload(payload);

    if (!email || !senha) {
      throw buildLoginError("E-mail e senha são obrigatórios.", 400);
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      throw buildLoginError("Informe um e-mail válido.", 400);
    }

    return { email, senha };
  }

  async login(payload) {
    const { email, senha } = this.validateLoginInput(payload);
    const user = await UserRepository.findByEmail(email);

    if (!user || user.senha !== senha) {
      throw buildLoginError("E-mail ou senha incorretos.");
    }

    return mapUser(user);
  }

  async recuperarSenha(payload = {}) {
    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    const novaSenha = typeof payload.novaSenha === "string" ? payload.novaSenha : "";
    const confirmarSenha = typeof payload.confirmarSenha === "string" ? payload.confirmarSenha : "";

    if (!email || !novaSenha || !confirmarSenha) {
      throw buildLoginError("E-mail, nova senha e confirmação são obrigatórios.", 400);
    }

    if (novaSenha !== confirmarSenha) {
      throw buildLoginError("As senhas não coincidem.", 400);
    }

    if (novaSenha.length < 6) {
      throw buildLoginError("A nova senha deve ter pelo menos 6 caracteres.", 400);
    }

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw buildLoginError("Nenhuma conta encontrada com este e-mail.", 404);
    }

    const isPaciente = user.tipo_usuario === "Paciente";
    const repo = isPaciente ? (await import("../repositories/PacienteRepository.js")).PacienteRepository : (await import("../repositories/NutricionistaRepository.js")).NutricionistaRepository;

    await repo.update(user.id, { senha: novaSenha });

    return {
      message: "Senha atualizada com sucesso.",
      email,
    };
  }
}
