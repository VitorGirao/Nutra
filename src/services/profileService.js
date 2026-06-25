const converterUrlGithub = (url) => {
  if (!url) return "";
  return url
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");
};

export function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const dados = localStorage.getItem("usuarioLogado");
    return dados ? JSON.parse(dados) : null;
  } catch {
    return null;
  }
}

export function isNutritionistUser(user = {}) {
  return String(user?.tipo_usuario || user?.tipoUsuario || "").toLowerCase() === "nutricionista";
}

export function getProfilePictureUrl(user) {
  const foto = user?.foto_do_nutricionista || user?.foto || user?.foto_perfil || "";
  return foto ? converterUrlGithub(foto) : "";
}

export function buildProfileViewModel(user = getStoredUser()) {
  const perfil = user || {};
  const isNutri = isNutritionistUser(perfil);

  if (isNutri) {
    return {
      isNutricionista: true,
      nome: perfil.nome || "",
      email: perfil.email || "",
      telefone: perfil.numero || "",
      crn: perfil.crn || "",
      especialidade: perfil.especialidade || "",
      cep: perfil.cep || "",
      sobreMim: perfil.meu_resumo || perfil.sobreMim || "Ainda não adicionou uma biografia.",
      fotoUrl: getProfilePictureUrl(perfil),
    };
  }

  return {
    isNutricionista: false,
    nome: perfil.nome || "",
    email: perfil.email || "",
    telefone: perfil.numero || "",
    genero: perfil.genero || "",
    cep: perfil.cep || "",
    sobreMim: perfil.sobreMim || perfil.meu_resumo || "Ainda não adicionou uma biografia.",
    fotoUrl: getProfilePictureUrl(perfil),
  };
}

export function createProfileFormData(user = getStoredUser()) {
  const perfil = user || {};
  const isNutri = isNutritionistUser(perfil);

  return {
    nome: perfil.nome || "",
    sobrenome: perfil.sobrenome || "",
    email: perfil.email || "",
    crn: perfil.crn || "",
    especialidade: perfil.especialidade || "",
    cidade: perfil.cep || "",
    telefone: perfil.numero || "",
    genero: perfil.genero || "",
    sobreMim: perfil.meu_resumo || perfil.sobreMim || "",
    isNutricionista: isNutri,
    photoUrl: getProfilePictureUrl(perfil),
  };
}

export function logoutUser(navigate) {
  localStorage.removeItem("usuarioLogado");
  navigate("/login");
}
