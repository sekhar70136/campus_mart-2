import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const colleges = ['Vishnu Institute of Technology', 'SRKR', 'MGVR', 'JNTUK', 'Aditya Engineering College', 'Malla Reddy University', 'Nooragadi University', 'SRM University', 'VR Siddhartha', 'PVP Siddhartha College'];

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav className="flex justify-between items-center px-5 py-3 bg-white shadow-md sticky top-0 z-50">
      <div>
        <Link to="/" className="text-xl font-extrabold text-primary-dark">Campus Smart</Link>
      </div>
      <div className="flex items-center gap-3">
        <select defaultValue={user?.college || user?.campus || ''} className="px-3 py-1.5 rounded-full border border-gray-300 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-primary">
          {!user && <option value="">Select college</option>}
          {colleges.map((college) => <option key={college} value={college}>{college}</option>)}
        </select>
        {user ? (
          <Link to="/account" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-bold text-gray-800 hover:scale-105 transition">
            {user.name[0]}
          </Link>
        ) : (
          <Link to="/login" className="bg-primary text-gray-800 px-4 py-1.5 rounded-xl text-sm font-semibold hover:bg-primary-dark hover:-translate-y-0.5 transition shadow-sm">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;