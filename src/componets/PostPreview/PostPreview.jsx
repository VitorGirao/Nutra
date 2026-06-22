// Componente de visualização do post.
// Usado na pré-visualização da criação e na tela PostAberto.
// Props:
//   - dados: { titulo, subtitulo, corpo, imagemUrl, autor, dataPublicacao }
//   - modoCompleto: boolean — se true, exibe autor e data (padrão: false)
export default function PostPreview({ dados, modoCompleto = false }) {
  const formatDatePtBr = (timestamp) => {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date(timestamp));
  }

  return (
    <article style={{ fontFamily: "inherit" }}>
      {/* Imagem de capa com título sobreposto */}
      {dados.imagemUrl ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "340px",
            marginBottom: "32px",
          }}
        >
          <img
            src={dados.imagemUrl}
            alt="Capa do post"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Gradiente para legibilidade do texto */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.65) 40%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: "28px",
              color: "#fff",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                marginBottom: "8px",
              }}
            >
              {dados.titulo || "Sem título"}
            </h1>
            {modoCompleto && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "0.85rem",
                }}
              >
                <span>👤 {dados.autor || "Autor"}</span>
                <span>{dados.dataPublicacao ? formatDatePtBr(dados.dataPublicacao) : "Data não informada"}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ padding: "0 0 24px" }}>
          <h1
            style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "8px" }}
          >
            {dados.titulo || "Sem título"}
          </h1>
          {modoCompleto && (
            <p style={{ color: "#888", fontSize: "0.85rem" }}>
              👤 {dados.autor || "Autor"} ·{" "}
              {dados.dataPublicacao ? formatDatePtBr(dados.dataPublicacao) : "Data não informada"}
            </p>
          )}
        </div>
      )}

      {/* Subtítulo */}
      {dados.subtitulo && (
        <p
          style={{
            fontSize: "1.05rem",
            color: "#444",
            marginBottom: "24px",
            padding: "0 24px",
            lineHeight: "1.6",
          }}
        >
          {dados.subtitulo}
        </p>
      )}

      {/* Separador */}
      {dados.subtitulo && (
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e0e0e0",
            margin: "0 24px 32px",
          }}
        />
      )}

      {dados.resumo_do_post && (
        <div
          style={{
            margin: "0 24px 24px",
            padding: "16px 18px",
            borderRadius: "12px",
            background: "#f5f7f7",
            color: "#2f2f2f",
            fontSize: "0.98rem",
            lineHeight: "1.7",
          }}
        >
          {dados.resumo_do_post}
        </div>
      )}

      {/* Corpo do post */}
      <div
        style={{
          fontSize: "1rem",
          lineHeight: "1.85",
          color: "#333",
          whiteSpace: "pre-wrap",
          padding: "0 24px",
          textAlign: "justify",
        }}
      >
        {dados.corpo || "Nenhum conteúdo ainda."}
      </div>
    </article>
  );
}
