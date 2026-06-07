import React from 'react';
import CardHeader from './CardHeader';
import CardImage from './CardImage';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import './PostCard.css';

function PostCard({ post, onLerMais, onSalvar, onOpcoes }) {
  return (
    <article className="post-card-container">
      <CardHeader 
        foto={post.autorFoto} 
        nome={post.autorNome} 
        sub={post.autorSub} 
        onOpcoes={onOpcoes} 
      />
      <CardImage 
        src={post.postImagem} 
        alt={post.titulo} 
      />
      <CardBody 
        titulo={post.titulo} 
        subtitulo={post.subtitulo} 
        resumo={post.resumo} 
      />
      <CardFooter 
        onSalvar={onSalvar} 
        onLerMais={onLerMais} 
      />
    </article>
  );
}

export default PostCard;