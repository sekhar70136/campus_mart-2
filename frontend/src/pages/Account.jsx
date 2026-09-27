import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Account = () => {
  const { user, logout } = useContext(AuthContext);
  if (!user) return <div className="text-center py-20">Please login</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24 pt-4 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold mx-auto mb-3 shadow-md">
          {user.name[0]}
        </div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Link to="/myads" className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3 hover:bg-yellow-50 transition">📦 My Ads</Link>
        <Link to="/favorites" className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3 hover:bg-yellow-50 transition">♥ Favorites</Link>
        <Link to="/orders" className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3 hover:bg-yellow-50 transition">🛒 My Orders</Link>
        <Link to="/wallet" className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3 hover:bg-yellow-50 transition">💰 Wallet</Link>
        <Link to="/settings" className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3 hover:bg-yellow-50 transition">⚙️ Settings</Link>
        <Link to="/help" className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3 hover:bg-yellow-50 transition">❓ Help Center</Link>
        <button onClick={logout} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3 text-red-600 hover:bg-red-50 transition text-left font-semibold">🚪 Logout</button>
      </div>
    </div>
  );
};

export default Account;