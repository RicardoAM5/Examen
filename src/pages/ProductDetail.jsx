import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/items/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  const handlePurchase = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/addSale?productId=${product.id}`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(success => {
      if (success) {
        setPurchaseSuccess(true);
      } else {
        alert("Error al realizar la compra");
      }
    });
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>Precio: ${product.price}</strong></p>
      <p>Marca: {product.brand}</p>
      <p>Stock: {product.stock}</p>
      <p>Categoría: {product.category}</p>
      <div>
        {product.images.map((img, index) => (
          <img key={index} src={img} alt={`${product.title} ${index}`} style={{ marginRight: "10px" }} />
        ))}
      </div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button style={{ marginTop: "20px" }}>Volver al Buscador</button>
      </Link>
      {!purchaseSuccess ? (
        <button onClick={handlePurchase}>Comprar</button>
      ) : (
        <div>
          <h3>¡Compra realizada con éxito!</h3>
          <button onClick={() => navigate('/')}>Regresar al buscador</button>
        </div>
      )}


    </div>
  );
}

export default ProductDetail;
