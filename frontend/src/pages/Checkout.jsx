import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axios';

const Checkout = () => {
  const location = useLocation(); const navigate = useNavigate();
  const { product } = location.state || {}; const [loading, setLoading] = useState(false);
  if (!product) return <div className="text-center py-20">No product selected</div>;

  const platformFee = product.price * 0.05; const total = parseFloat(product.price) + platformFee;

  const handlePayment = async () => {
    setLoading(true);
    try { await api.post('/orders', { productId: product.id }); navigate('/order-confirmation'); } 
    catch (err) { alert('Payment failed'); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-lg mx-auto px-4 pb-24 pt-4 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white p-5 rounded-2xl shadow-sm my-4">
        <div className="flex justify-between mb-2 text-sm"><span>{product.title}</span><span>₹{product.price}</span></div>
        <div className="flex justify-between mb-2 text-sm text-gray-500"><span>Platform Fee (5%)</span><span>₹{platformFee.toFixed(2)}</span></div>
        <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm mb-4">
        <h3 className="font-semibold mb-3">Payment Method</h3>
        <div className="flex items-center gap-2 py-3 border-b border-gray-100"><input type="radio" name="payment" defaultChecked className="accent-primary" /> UPI</div>
        <div className="flex items-center gap-2 py-3 border-b border-gray-100"><input type="radio" name="payment" className="accent-primary" /> Credit/Debit Card</div>
        <div className="flex items-center gap-2 py-3"><input type="radio" name="payment" className="accent-primary" /> Wallet</div>
      </div>
      <button className="w-full bg-primary text-gray-800 p-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition disabled:opacity-50" onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
      </button>
    </div>
  );
};

export default Checkout;