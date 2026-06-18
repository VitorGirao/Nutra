import { useNavigate, useLocation } from "react-router-dom";
import PostAberto from "../PostsAberto/PostAberto"; // ajuste o caminho/nome se necessário

export default function PostAbertoPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const post = location.state?.post ?? null;
  const toast = location.state?.toast ?? null;

  function handleVoltar() {
    navigate("/feed"); // ajusta pra rota que fizer sentido como "voltar"
  }

  return <PostAberto post={post} toastInicial={toast} aoVoltar={handleVoltar} />;
}