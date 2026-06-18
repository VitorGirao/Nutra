import { useRef } from "react";

export default function ImageUpload({ imagemUrl, aoSelecionarImagem }) {
  const inputRef = useRef(null);

  function handleChange(e) {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    const urlLocal = URL.createObjectURL(arquivo);
    aoSelecionarImagem({ arquivo, urlLocal });
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      style={{
        width: "100%", height: "260px", backgroundColor: "#d9d9d9",
        borderRadius: "8px", display: "flex", alignItems: "center",
        justifyContent: "center", cursor: "pointer", overflow: "hidden",
      }}
    >
      {imagemUrl ? (
        <img src={imagemUrl} alt="Imagem do post" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <span style={{ fontSize: "2.5rem", color: "#555", userSelect: "none" }}>+</span>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: "none" }} />
    </div>
  );
}