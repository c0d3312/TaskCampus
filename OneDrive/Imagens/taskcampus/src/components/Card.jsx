const Card = ({ titulo, children }) => (
  <div className="card">
    {titulo && <h2 className="section-title">{titulo}</h2>}
    {children}
  </div>
);
export default Card;