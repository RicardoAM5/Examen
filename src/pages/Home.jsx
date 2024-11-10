import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/items?search=${query}`);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Bazar Online</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar producto..."
      />
      <div style={{ margin: "20px 0" }}>
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/sales">
          <button style={{ backgroundColor: '#17a2b8' }}>Ver Compras Registradas</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
