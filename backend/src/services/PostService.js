import { PostRepository } from "../repositories/PostRepository.js";
import { NutricionistaRepository } from "../repositories/NutricionistaRepository.js";

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

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function buildPostError(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export class PostService {
  async listPostsWithAuthor() {
    const [posts, nutricionistas] = await Promise.all([
      PostRepository.findAll(),
      NutricionistaRepository.findAll(),
    ]);

    const nutriById = new Map(nutricionistas.map((nutri) => [nutri.id, nutri]));

    return posts.map((post) => {
      const autor = nutriById.get(post.id_nutricionista) || createFallbackNutricionista();
      return {
        id: post.id,
        titulo: post.titulo || "",
        subtitulo: post.subtitulo || "",
        resumo_do_post: post.resumo_do_post || "",
        conteudo: post.conteudo || post.corpo || "",
        corpo: post.conteudo || post.corpo || "",
        data_de_criacao: post.data_de_criacao || post.data_criacao || "",
        data_criacao: post.data_de_criacao || post.data_criacao || "",
        imagem_post: post.imagem_post || post.imagem_posta || "",
        imagem_posta: post.imagem_post || post.imagem_posta || "",
        id_nutricionista: post.id_nutricionista || "",
        autor,
      };
    });
  }

  async getPostById(id) {
    const post = await PostRepository.findById(id);
    if (!post) return null;

    let autor = createFallbackNutricionista();
    if (post.id_nutricionista) {
      const nutricionista = await NutricionistaRepository.findById(post.id_nutricionista);
      if (nutricionista) {
        autor = nutricionista;
      }
    }

    return {
      id: post.id,
      titulo: post.titulo || "",
      subtitulo: post.subtitulo || "",
      resumo_do_post: post.resumo_do_post || "",
      conteudo: post.conteudo || post.corpo || "",
      corpo: post.conteudo || post.corpo || "",
      data_de_criacao: post.data_de_criacao || post.data_criacao || "",
      data_criacao: post.data_de_criacao || post.data_criacao || "",
      imagem_post: post.imagem_post || post.imagem_posta || "",
      imagem_posta: post.imagem_post || post.imagem_posta || "",
      id_nutricionista: post.id_nutricionista || "",
      autor,
    };
  }

  async createPost(dadosFormulario = {}) {
    const titulo = normalizeText(dadosFormulario.titulo);
    const subtitulo = normalizeText(dadosFormulario.subtitulo);
    const resumo_do_post = normalizeText(dadosFormulario.resumo_do_post);
    const conteudo = normalizeText(dadosFormulario.conteudo);
    const imagem_post = normalizeText(dadosFormulario.imagem_post);
    const id_nutricionista = normalizeText(dadosFormulario.id_nutricionista);

    if (!titulo || !subtitulo || !resumo_do_post || !conteudo || !imagem_post || !id_nutricionista) {
      throw buildPostError("Todos os campos do post são obrigatórios.", 400);
    }

    const nutricionista = await NutricionistaRepository.findById(id_nutricionista);
    if (!nutricionista) {
      throw buildPostError("Nutricionista não encontrado.", 404);
    }

    const novoPost = await PostRepository.create({
      titulo,
      subtitulo,
      resumo_do_post,
      conteudo,
      imagem_post,
      data_de_criacao: new Date().toISOString(),
      id_nutricionista,
    });

    return {
      id: novoPost.id,
      titulo: novoPost.titulo,
      subtitulo: novoPost.subtitulo,
      resumo_do_post: novoPost.resumo_do_post,
      conteudo: novoPost.conteudo,
      corpo: novoPost.conteudo,
      imagem_post: novoPost.imagem_post,
      imagem_posta: novoPost.imagem_post,
      data_de_criacao: novoPost.data_de_criacao,
      data_criacao: novoPost.data_de_criacao,
      id_nutricionista: novoPost.id_nutricionista,
      autor: nutricionista,
    };
  }

  async deletePost(id) {
    const post = await PostRepository.findById(id);
    if (!post) {
      throw new Error("Postagem não encontrada.");
    }

    await PostRepository.delete(id);
    return { status: "removido", id };
  }
}
