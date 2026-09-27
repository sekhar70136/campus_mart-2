import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams(); const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data)).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const handleBuy = async () => {
    if (!user) return navigate('/login');
    try { await api.post('/orders', { productId: product.id }); navigate('/order-confirmation'); } 
    catch (err) { alert(err.response?.data?.message || 'Purchase failed'); }
  };

  const handleChat = () => { if (!user) return navigate('/login'); navigate(`/chat/${product.sellerId}`); };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 pb-24 pt-4 animate-fade-in">
      <div className="w-full h-72 bg-gray-100 rounded-2xl overflow-hidden mb-5 shadow-sm">
        <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt={product.title} className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-3xl font-extrabold text-primary-dark">₹{product.price}</p>
        <p className="text-sm text-gray-500 mb-3">+ 5% platform fee</p>
        <p className="text-base mb-1.5"><span className="font-semibold">Seller:</span> {product.seller?.name} ({product.seller?.campus})</p>
        <p className="text-base mb-1.5"><span className="font-semibold">Mobile:</span> {product.contactMobile || 'Not provided'}</p>
        <p className="text-base mb-1.5"><span className="font-semibold">Condition:</span> {product.condition}</p>
        <p className="text-gray-700 leading-relaxed my-4">{product.description}</p>
        
        <div className="flex gap-3 mt-6">
          <button onClick={handleChat} className="flex-1 bg-transparent border-2 border-primary text-gray-800 p-3.5 rounded-xl font-semibold hover:bg-primary transition">💬 Chat with Seller</button>
          <button onClick={handleBuy} className="flex-1 bg-primary text-gray-800 p-3.5 rounded-xl font-semibold hover:bg-primary-dark transition">⚡ Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;