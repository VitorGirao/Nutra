export function Avatar({ src, alt }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        objectFit: 'cover'
      }} 
    />
  );
}