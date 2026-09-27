import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24 pt-4">
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>
      {favorites.length === 0 ? <p className="text-gray-500">No favorite products yet.</p> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
};

export default Favorites;