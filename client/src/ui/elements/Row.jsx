function Row({ children, justify, align, gap }) {
  const base = { display: "flex" };

  const hor =
    justify === "start" ? "start" : justify === "end" ? "end" : "space-between";
  const vert =
    align === "top" ? "flex-start" : align === "bottom" ? "flex-end" : "center";

  const g = `${gap}rem`;

  return (
    <div style={{ ...base, justifyContent: hor, alignItems: vert, gap: g }}>
      {children}
    </div>
  );
}

export default Row;
