import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const colleges = ['Vishnu Institute of Technology', 'SRKR', 'MGVR', 'JNTUK', 'Aditya Engineering College', 'Malla Reddy University', 'Nooragadi University', 'SRM University', 'VR Siddhartha', 'PVP Siddhartha College'];

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '' });
  const [error, setError] = useState(''); const { register, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password, form.college);
      logout();
      navigate('/login');
    } catch (err) { setError(err.response?.data?.message || 'Signup failed'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white p-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-primary-dark mb-6">Create Account</h2>
        {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg mb-4 text-center text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full p-3.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary" />
          <input name="email" type="email" placeholder="College email (.edu.in)" onChange={handleChange} required pattern=".+\.edu\.in$" className="w-full p-3.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-3.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary" />
          <select name="college" value={form.college} onChange={handleChange} required className="w-full p-3.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Select your college</option>
            {colleges.map((college) => <option key={college} value={college}>{college}</option>)}
          </select>
          <button type="submit" className="w-full bg-primary text-gray-800 p-3.5 rounded-xl font-semibold text-lg hover:bg-primary-dark transition">Sign Up</button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-primary-dark font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;