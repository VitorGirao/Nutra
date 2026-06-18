import { useEffect, useState } from "react";
import SideBar from "../../componets/NavBar/SideBar";
import PostPreview from "../../componets/PostPreview/PostPreview";
import "./PostAberto.css";

const POST_EXEMPLO = {
  titulo: "Habitos de Alimentação Saudavel",
  subtitulo: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  corpo:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis ut tellus a faucibus. Aliquam in porttitor arcu. Nulla arcu sapien, consequat eu lorem eu, faucibus varius risus.",
  imagemUrl: "",
  autor: "Maria",
  dataPublicacao: "27 de Abril · 6min Atrás",
};

export default function PostAberto({ post, aoVoltar, toastInicial = null }) {
  const [toast, setToast] = useState(toastInicial);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const dadosExibir = post ?? POST_EXEMPLO;

  return (
    <div className="post-aberto-page">
      <SideBar/>

      <main className="post-aberto-conteudo">
        <PostPreview dados={dadosExibir} modoCompleto={true} />
      </main>

      {toast && (
        <div className={`post-aberto-toast ${toast.tipo}`}>
          {toast.tipo === "sucesso" ? "✅" : "❌"} {toast.texto}
        </div>
      )}
    </div>
  );
}
