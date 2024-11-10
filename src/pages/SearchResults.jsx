import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/items?q=${query}`)
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [query]);

  return (
    <div>
      <h2>Resultados para: {query}</h2>
      <p>{products.length} resultados encontrados</p>
      <div>
        {products.map(product => (
          <div key={product.id} className="card">
            <img src={product.thumbnail} alt={product.title} />
            <div className="card-details">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Categoría: {product.category}</p>
              <p>Rating: {product.rating}</p>
              <p className="price">${product.price}</p>
              <Link to={`/item/${product.id}`}>
                <button>Ver Detalle</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button style={{ marginTop: "20px" }}>Volver al Buscador</button>
      </Link>
    </div>
  );
}

export default SearchResults;
