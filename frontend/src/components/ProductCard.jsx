import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [favorite, setFavorite] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]').some((item) => item.id === product.id));

  const toggleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorite
      ? favorites.filter((item) => item.id !== product.id)
      : [...favorites, product];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorite(!favorite);
  };

  return (
    <Link to={`/product/${product.id}`} className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col animate-fade-in">
      <button type="button" onClick={toggleFavorite} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'} className="absolute right-2 top-2 z-10 w-9 h-9 rounded-full bg-white/90 text-xl shadow-sm">
        {favorite ? '♥' : '♡'}
      </button>
      <div className="h-36 bg-gray-100 flex items-center justify-center">
        <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <h3 className="text-base font-semibold mb-1 line-clamp-1">{product.title}</h3>
        <p className="font-bold text-primary-dark text-lg">₹{product.price}</p>
        <p className="text-xs text-gray-500 mt-1">{product.seller?.name} • {product.condition}</p>
      </div>
    </Link>
  );
};

export default ProductCard;