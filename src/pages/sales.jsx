import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/sales`)
      .then(response => response.json())
      .then(data => setSales(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Compras Registradas</h2>
      <ul>
        {sales.length === 0 ? (
          <p>No se han realizado compras aún.</p>
        ) : (
          sales.map(sale => (
            <li key={sale.id} style={{ marginBottom: "20px" }}>
              <p><strong>Producto:</strong> {sale.product.title}</p> {/* Accede al título del producto */}
              <p><strong>Precio:</strong> ${sale.product.price}</p> {/* Accede al precio del producto */}
              <p><strong>Fecha de compra:</strong> {new Date(sale.saleDate).toLocaleDateString()}</p> {/* Formatea la fecha */}
            </li>
          ))
        )}
      </ul>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button style={{ marginTop: "20px" }}>Volver al Buscador</button>
      </Link>
    </div>
  );
}

export default Sales;
