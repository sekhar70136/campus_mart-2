import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fade-in">
      <div className="text-6xl mb-4">✅</div>
      <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
      <p className="text-gray-500 mb-6">Your order has been successfully placed. The seller will contact you soon.</p>
      <Link to="/" className="inline-block bg-primary text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition">Back to Home</Link>
    </div>
  );
};

export default OrderConfirmation;