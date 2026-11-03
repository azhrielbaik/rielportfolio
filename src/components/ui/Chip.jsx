export function Chip({
  color = "yellow",
  tilt = "0deg",
  className = "",
  children,
  ...props
}) {
  const colorClass = `chip--${color}`;
  const style = tilt !== "0deg" ? { transform: `rotate(${tilt})` } : undefined;

  return (
    <span
      className={`chip ${colorClass} ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
}

