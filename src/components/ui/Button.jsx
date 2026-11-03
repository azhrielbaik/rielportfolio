export function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const variantClass = variant === "ghost" ? "btn--ghost" : "";
  const sizeClass = size === "sm" ? "btn--sm" : "";
  const cls = `btn ${variantClass} ${sizeClass} ${className}`.trim();

  return (
    <Tag className={cls} {...props}>
      {children}
    </Tag>
  );
}

