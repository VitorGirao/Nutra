import React from 'react';
import CardHeader from './CardHeader';
import CardImage from './CardImage';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import './PostCard.css';

function PostCard({ post, isSalvo, canManagePost = false, canDeletePost = false, canSavePost = false, onLerMais, onSalvar, onOpcoes, onExcluir }) {
  const autor = post.autor || {};

  return (
    <article className="post-card-container">
      <CardHeader 
        foto={autor.foto_do_nutricionista} 
        nome={autor.nome || "Carregando..."} 
        sub={autor.especialidade || "Nutricionista"} 
        onOpcoes={() => onOpcoes && onOpcoes(post.id)} 
      />
      
      <CardImage 
        src={post.imagem_posta || post.imagem_post} 
        alt={post.titulo} 
      />
      
      <CardBody 
        titulo={post.titulo} 
        subtitulo={post.subtitulo} 
        resumo={post.resumo_do_post} 
      />
      
      <CardFooter 
        isSalvo={isSalvo}
        canManagePost={canManagePost}
        canDeletePost={canDeletePost}
        canSavePost={canSavePost}
        onSalvar={() => onSalvar && onSalvar(post.id)} 
        onLerMais={() => onLerMais && onLerMais(post)} 
        onExcluir={() => onExcluir && onExcluir(post.id)}
      />
    </article>
  );
}

export default PostCard;
