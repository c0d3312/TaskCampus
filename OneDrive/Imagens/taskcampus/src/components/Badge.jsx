const colorMap = { pendiente: "#f59e0b", completada: "#16a34a" };
const Badge = ({ texto }) => {
  return (
    <span style={{
      backgroundColor: colorMap[texto] || "#6b7280", color: "#fff",
      padding: "2px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600
    }}>
      {texto}
    </span>
  );
};
export default Badge;