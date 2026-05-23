import "./Buttons.css";

const Button = ({
  label,
  onClick,
  variant = "primary",
  size = "medium",
  icon,
  iconOnly = false,
}) => {

  return (
    <button
      className={`
        btn-base
        ${variant}
        ${size}
        ${iconOnly ? "icon-only" : ""}
      `}
      onClick={onClick}
    >

      {!iconOnly && label}

      {icon && (
        <span className="btn-icon">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;