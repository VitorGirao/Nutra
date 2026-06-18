export async function publicarPost(dadosPost) {
  console.log("📤 Dados que seriam enviados à API:", dadosPost);
  return { sucesso: true, texto: "Post publicado com sucesso! (simulado)" };
}
