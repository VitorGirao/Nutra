export default function Button({
  children,
  onClick,
  variante = "primary",
  type = "button",
  disabled = false,
}) {
  const estilos = {
    base: {
      padding: "10px 22px",
      borderRadius: "999px",
      fontWeight: "600",
      fontSize: "0.95rem",
      cursor: disabled ? "not-allowed" : "pointer",
      border: "none",
      transition: "opacity 0.2s",
      opacity: disabled ? 0.6 : 1,
    },
    primary: {
      backgroundColor: "#10b894",
      color: "#fff",
    },
    outline: {
      backgroundColor: "transparent",
      color: "#10b894",
      border: "2px solid #10b894",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...estilos.base, ...estilos[variante] }}
    >
      {children}
    </button>
  );
}
