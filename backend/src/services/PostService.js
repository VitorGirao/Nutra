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
        imagem_posta: post.imagem_posta || post.imagem_post || "",
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
      conteudo: post.conteudo || post.corpo || post.resumo_do_post || "",
      imagem_posta: post.imagem_posta || post.imagem_post || "",
      id_nutricionista: post.id_nutricionista || "",
      data_criacao: post.data_criacao || "Recentemente",
      autor,
    };
  }
}