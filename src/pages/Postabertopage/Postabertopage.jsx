import { useNavigate, useLocation } from "react-router-dom";
import PostAberto from "../PostsAberto/PostAberto";

export default function PostAbertoPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const toast = location.state?.toast ?? null;

  function handleVoltar() {
    navigate("/feed");
  }

  return <PostAberto toastInicial={toast} aoVoltar={handleVoltar} />;
}