import { useNavigate } from "react-router-dom";
import CriarPost from "../CriarPost/CriarPost";

export default function CriarPostPage() {
  const navigate = useNavigate();

  function handlePublicar({ post, toast }) {
    // Navega direto pra página do post publicado, levando o post e o toast.
    // O próprio PostAberto cuida de exibir o toast por 4s (toastInicial).
    navigate("/ver-post", { state: { post, toast } });
  }

  return <CriarPost aoPublicar={handlePublicar} />;
}