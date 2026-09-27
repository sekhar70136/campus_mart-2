import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [error, setError] = useState(''); const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await login(email, password); navigate('/'); } catch (err) { setError(err.response?.data?.message || 'Login failed'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white p-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-primary-dark mb-6">Welcome Back</h2>
        {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg mb-4 text-center text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="College email (.edu.in)" value={email} onChange={(e) => setEmail(e.target.value)} required pattern=".+\.edu\.in$" className="w-full p-3.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary" />
          <button type="submit" className="w-full bg-primary text-gray-800 p-3.5 rounded-xl font-semibold text-lg hover:bg-primary-dark transition">Login</button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-primary-dark font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;