import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CriarPost from "../CriarPost/CriarPost";

export default function CriarPostPage() {
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  const tipoUsuario = usuarioLogado.tipo_usuario || usuarioLogado.tipoUsuario || "";
  const isNutricionista = tipoUsuario.toLowerCase() === "nutricionista";

  useEffect(() => {
    if (!isNutricionista) {
      navigate("/feed", { replace: true });
    }
  }, [isNutricionista, navigate]);

  function handlePublicar({ post, toast }) {
    // navigate(`/ver-post/${post.id}`, { state: { toast } });
    navigate(`/feed`);
  }

  if (!isNutricionista) {
    return null;
  }

  return <CriarPost aoPublicar={handlePublicar} />;
}
