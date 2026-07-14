export default function GradientBlob({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={style}
      className={`pointer-events-none absolute rounded-full blur-3xl animate-pulse-glow ${className}`}
    />
  );
}
