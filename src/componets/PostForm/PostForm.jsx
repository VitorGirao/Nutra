export default function PostForm({ dados, aoAtualizar }) {
  function handleChange(campo, valor) {
    aoAtualizar({ ...dados, [campo]: valor });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <input
        type="text"
        placeholder="URL da imagem"
        value={dados.imagemUrl}
        onChange={(e) => handleChange("imagemUrl", e.target.value)}
        style={estiloInput({})}
      />

      <div
        style={{
          width: "100%",
          height: "260px",
          backgroundColor: "#d9d9d9",
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {dados.imagemUrl ? (
          <img
            src={dados.imagemUrl}
            alt="Imagem do post"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontSize: "1rem", color: "#555", userSelect: "none" }}>
            Pré-visualização da imagem
          </span>
        )}
      </div>

      <input
        type="text"
        placeholder="Título"
        value={dados.titulo}
        onChange={(e) => handleChange("titulo", e.target.value)}
        style={estiloInput({ grande: true })}
      />

      <input
        type="text"
        placeholder="Adicionar um subtítulo..."
        value={dados.subtitulo}
        onChange={(e) => handleChange("subtitulo", e.target.value)}
        style={estiloInput({})}
      />

      <input
        type="text"
        placeholder="Resumo do Post"
        value={dados.resumo_do_post}
        onChange={(e) => handleChange("resumo_do_post", e.target.value)}
        style={estiloInput({})}
      />

      <textarea
        placeholder="Comece a escrever..."
        value={dados.corpo}
        rows={10}
        onChange={(e) => handleChange("corpo", e.target.value)}
        style={{ ...estiloInput({}), resize: "vertical", lineHeight: "1.7" }}
      />
    </div>
  );
}

function estiloInput({ grande = false }) {
  return {
    border: "none",
    borderBottom: "1px solid #e0e0e0",
    padding: "10px 4px",
    fontSize: grande ? "1.8rem" : "1rem",
    fontWeight: grande ? "700" : "400",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    background: "transparent",
  };
}
